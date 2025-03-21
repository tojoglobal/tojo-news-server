import db from "../../Utils/db.js";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import {
  UpdateViewCountQuery,
  getViewCountQuery,
  updateReadingTimeQuery,
} from "../models/PublicApiModel.js";

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
};
