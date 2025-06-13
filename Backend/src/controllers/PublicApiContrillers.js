import db from "../../Utils/db.js";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import {
  UpdateViewCountQuery,
  getViewCountQuery,
  updateReadingTimeQuery,
} from "../models/PublicApiModel.js";
import axios from "axios";

// user register
const registerUser = async (req, res) => {
  const { uid, email, displayName, photoURL } = req.body;

  try {
    const connection = await db.getConnection();
    // Check if the user already exists
    const [existingUser] = await connection.execute(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (existingUser.length > 0) {
      connection.release();
      return res.status(200).json({ existingUser: existingUser[0] });
    }

    // Insert new user
    const [result] = await connection.execute(
      "INSERT INTO users (uid, email, displayName, photoURL) VALUES (?, ?, ?, ?)",
      [uid, email, displayName, photoURL]
    );

    connection.release();

    res.status(201).json({
      newUser: {
        id: result.insertId,
        uid,
        email,
        displayName,
        photoURL,
        createdAt: new Date(),
        isAdmin: false,
        premiumTaken: null,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateViewCount = async (req, res) => {
  try {
    const { articleId } = req.body;
    await db.query(UpdateViewCountQuery, [articleId]);
    res.status(200).json({ success: true, message: "View count updated" });
  } catch (error) {
    res.status(500).json({ success: false, error: "Database error" });
  }
};

const getViewCount = async (req, res) => {
  try {
    const { articalid } = req.params;
    // Query the database to fetch the view count
    const [rows] = await db.query(getViewCountQuery, [articalid]);

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Article not found" });
    }
    res.status(200).json({ success: true, viewCount: rows[0].view_count });
  } catch (error) {
    res.status(500).json({ success: false, error: "Database error" });
  }
};

const updateReadingTime = async (req, res) => {
  try {
    const { articleId, duration } = req.body;
    if (!articleId || !duration) {
      return res.status(400).json({ success: false, error: "Missing data" });
    }
    await db.query(updateReadingTimeQuery, [articleId, duration]);
    res
      .status(200)
      .json({ success: true, message: "Reading Time count updated" });
  } catch (error) {
    res.status(500).json({ success: false, error: "Database error" });
  }
};

// loveCount controller
const loveCount = async (req, res) => {
  try {
    const { articleId, userId } = req.body;
    const [existingLike] = await db.query(
      "SELECT id FROM likes WHERE article_id = ? AND user_id = ?",
      [articleId, userId]
    );
    if (existingLike.length > 0) {
      await db.query("DELETE FROM likes WHERE article_id = ? AND user_id = ?", [
        articleId,
        userId,
      ]);
      res.json({ success: true, liked: false });
    } else {
      // Like (Insert into database)
      await db.query("INSERT INTO likes (article_id, user_id) VALUES (?, ?)", [
        articleId,
        userId,
      ]);
      res.json({ success: true, liked: true });
    }
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: "Error updating like status" });
  }
};

const getLoveCount = async (req, res) => {
  try {
    const { articleId, userId } = req.query;
    // Get total likes count
    const [likeCountResult] = await db.query(
      "SELECT COUNT(*) AS totalLikes FROM likes WHERE article_id = ?",
      [articleId]
    );

    // Check if the user has liked
    const [userLikeResult] = await db.query(
      "SELECT 1 FROM likes WHERE article_id = ? AND user_id = ? LIMIT 1",
      [articleId, userId]
    );

    res.json({
      likes: likeCountResult[0].totalLikes,
      userHasLiked: userLikeResult.length > 0,
    });
  } catch (error) {
    res.status(500).json({ error: "Error fetching like data" });
  }
};

const getLatestNews = async (req, res) => {
  try {
    const getLatestNewsQuery = `SELECT * FROM blognews ORDER BY dateAndTime DESC LIMIT 4`;

    const [LatestBlogResult] = await db.query(getLatestNewsQuery);
    res.status(200).json({
      success: true,
      data: LatestBlogResult.length,
      result: LatestBlogResult,
    });
  } catch (error) {
    console.error("Error fetching latest news:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

const getMostReadBlogs = async (req, res) => {
  try {
    const getMostReadQuery = `
      SELECT b.*, COALESCE(SUM(br.reading_time), 0) AS total_reading_time
      FROM blognews b
      LEFT JOIN blog_reading_time br ON b.ID = br.blog_id
      GROUP BY b.ID
      ORDER BY total_reading_time DESC
      LIMIT 4;
    `;
    const [mostReadBlogs] = await db.query(getMostReadQuery);
    res.status(200).json({
      success: true,
      count: mostReadBlogs.length,
      result: mostReadBlogs,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getMostPopulerViews = async (req, res) => {
  try {
    const getMostPopularQuery = `
      SELECT b.*, COALESCE(SUM(v.view_count), 0) AS total_views
      FROM blognews b
      LEFT JOIN blog_views v ON b.ID = v.blog_id
      GROUP BY b.ID
      ORDER BY total_views DESC
      LIMIT 6;
    `;
    const [mostPopularBlogs] = await db.query(getMostPopularQuery);
    res.status(200).json({
      success: true,
      count: mostPopularBlogs.length,
      result: mostPopularBlogs,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
// get the Authors
const getAuthors = async (req, res) => {
  try {
    const getAuthorsQuery = "SELECT * FROM authors";
    const [authors] = await db.query(getAuthorsQuery);
    res.status(200).json({ success: true, authors });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const checkSubscription = async (req, res) => {
  try {
    const { email } = req.query;
    const [existingUserData] = await db.query(
      "SELECT * FROM subscribers WHERE email = ?",
      [email]
    );
    if (existingUserData.length > 0) {
      return res.status(200).json({
        subscribed: true,
        interests: existingUserData[0].interests,
        message: "Email already subscribed",
      });
    }
    res
      .status(200)
      .json({ subscribed: false, message: "Email is not subscribed yet" });
  } catch (error) {
    res.status(500).json({ subscribed: false, error: error.message });
  }
};

// newsletter subscribe
const newsLetterSubscribe = async (req, res) => {
  try {
    const { email, interests } = req.body;
    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email is required" });
    }
    // Check if user already exists
    // const [existingUser] = await db.query(
    //   "SELECT * FROM subscribers WHERE email = ?",
    //   [email]
    // );

    // if (existingUser.length > 0) {
    //   return res.status(409).json({
    //     success: false,
    //     message: "Email is already subscribed. Please use a different email.",
    //   });
    // }

    // Convert interests array to string properly
    const interestsStr =
      interests && Array.isArray(interests) ? interests.join(", ") : "";

    // Corrected SQL query with properly formatted interestsStr
    const sql =
      "INSERT INTO subscribers (email, interests, created_at) VALUES (?, ?, ?)";
    await db.query(sql, [email, interestsStr, new Date()]);

    // Validate MailChimp credentials
    if (
      !process.env.MAILCHIMP_API_KEY ||
      !process.env.MAILCHIMP_AUDIENCE_ID ||
      !process.env.MAILCHIMP_SERVER_PREFIX
    ) {
      return res.status(500).json({
        success: false,
        message: "MailChimp configuration is missing.",
      });
    }
    // Prepare data for MailChimp API
    const data = {
      email_address: email,
      status: "subscribed",
      merge_fields: { INTERESTS: interestsStr },
      // merge_fields: {
      //   INTERESTS: interests.join(", "),
      // },
    };

    // Send request to MailChimp
    try {
      const response = await axios.post(
        `https://${process.env.MAILCHIMP_SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_AUDIENCE_ID}/members`,
        data,
        {
          headers: {
            Authorization: `apikey ${process.env.MAILCHIMP_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      return res.status(200).json({
        success: true,
        message: "Subscription successful",
        response: response.data,
      });
    } catch (mailchimpError) {
      return res.status(400).json({
        success: false,
        message: "MailChimp subscription failed",
        error: mailchimpError.response?.data,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const getAllEventsPublic = async (req, res) => {
  try {
    const [result] = await db.query("SELECT * FROM events ORDER BY date DESC");
    res.status(200).json({ success: true, result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getEventByIdPublic = async (req, res) => {
  try {
    const id = req.params.id;
    const [result] = await db.query("SELECT * FROM events WHERE uuid = ?", [
      id,
    ]);
    if (result.length === 0)
      return res.status(404).json({ success: false, error: "Not found" });
    res.status(200).json({ success: true, event: result[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export {
  registerUser,
  updateViewCount,
  getViewCount,
  updateReadingTime,
  loveCount,
  getLoveCount,
  getLatestNews,
  getMostReadBlogs,
  getMostPopulerViews,
  getAuthors,
  newsLetterSubscribe,
  checkSubscription,
  getAllEventsPublic,
  getEventByIdPublic,
};
