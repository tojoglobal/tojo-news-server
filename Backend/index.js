import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { AdminRouters } from "./src/Routers/AdminRoute.js";
import bodyParser from "body-parser";
import { PublicApiRouters } from "./src/Routers/PublicApiRoute.js";
import { UserRouters } from "./src/Routers/UserRoute.js";
import adminlogin from "./src/Routers/AdminLogin.route.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());

const localhostPort1 = 5173;
const localhostPort2 = 5174;
const localhostPort3 = 3000;
const allowedOrigins = [
  `http://localhost:${localhostPort1}`,
  `http://localhost:${localhostPort2}`,
  `http://localhost:${localhostPort3}`,
];
app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Router set up
app.use("/api/admin", AdminRouters);
app.use(adminlogin);
app.use("/api/user", UserRouters);
app.use("/api", PublicApiRouters);

app.use(express.static("public"));

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    jwt.verify(token, "jwt_secret_key", (err, decoded) => {
      if (err) return res.json({ Status: false, Error: "Wrong Token" });
      req.id = decoded.id;
      req.role = decoded.role;
      next();
    });
  } else {
    return res.json({ Status: false, Error: "Not autheticated" });
  }
};

// Auth related APIs
app.post("/api/jwt", async (req, res) => {
  const user = req.body;
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });
  res
    .cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    })
    .send({ success: true, token });
});

app.get("/", (req, res) => {
  return res.send(" <h1>Welcome to the TOJO News Server</h1>");
});

app.get("/verify", verifyUser, (req, res) => {
  return res.json({ Status: true, role: req.role, id: req.id });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running where http://localhost:${PORT}`);
});
