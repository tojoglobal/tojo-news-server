import db from "../../Utils/db.js";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { UpdateViewCountQuery } from "../models/PublicApiModel.js";

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
    const { articalid } = req.body;
    await db.query(UpdateViewCountQuery, [articleId]);
    res.status(200).json({ success: true, message: "View count updated" });
  } catch (error) {
    res.status(500).json({ success: false, error: "Database error" });
  }
};

const getViewCount = async (req, res) => {
  try {
    const { view } = req.body;
    console.log(articleId);
    // await db.query(getViewCountQuery, [articleId]);
    res.status(200).json({ success: true, message: "View count updated" });
  } catch (error) {}
};
export { registerUser, updateViewCount, getViewCount };
