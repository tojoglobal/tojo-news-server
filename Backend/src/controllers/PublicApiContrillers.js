import db from "../../Utils/db.js";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { createNewsCategoryQuery } from "../models/PublicApiModel.js";

// user register
const registerUser = async (req, res) => {
  const { uid, email, displayName, photoURL } = req.body;
  console.log(req.body);

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
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { registerUser };
