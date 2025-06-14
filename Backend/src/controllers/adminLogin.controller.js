import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../../Utils/db.js";

const registerAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ Error: "Email and password are required" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert admin data into the database
    await db.query(
      "INSERT INTO admin (email, password, type) VALUES (?, ?, ?)",
      [email, hashedPassword, "admin"]
    );

    return res.status(201).json({ message: "Admin registered successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ Error: "Registration failed" });
  }
};

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log(email, password);

    if (!email || !password) {
      return res.status(400).json({
        loginStatus: false,
        Error: "Email and password are required",
      });
    }

    // Select admin by email SELECT * from admin Where email = ? and password = ?
    const [result] = await db.query("SELECT * FROM admin WHERE email = ?", [
      email,
    ]);

    // Check if the admin exists
    if (result.length === 0) {
      return res
        .status(401)
        .json({ loginStatus: false, Error: "Wrong email or password" });
    }

    const admin = result[0];
    const isPasswordCorrect = await bcrypt.compare(password, admin.password);
    if (!isPasswordCorrect) {
      return res
        .status(401)
        .json({ loginStatus: false, Error: "Wrong email or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { role: "admin", email: admin.email, id: admin.id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    // Send token as an HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.json({ loginStatus: true, message: "Login Successful" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ loginStatus: false, Error: err.message });
  }
};

const hashAndStorePassword = async () => {
  const plainPassword = "1234";
  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  await db.query("UPDATE admin SET password = ? WHERE email = ?", [
    hashedPassword,
    "admin@gmail.com",
  ]);

  console.log("Password successfully hashed and updated!");
};

export { adminLogin, registerAdmin };
