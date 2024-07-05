import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { AdminRouters } from "./src/Routers/AdminRoute.js";
import bodyParser from "body-parser";

const app = express();

const localhostPort1 = 5173;
const localhostPort2 = 5174;
const allowedOrigins = [
  `http://localhost:${localhostPort1}`,
  `http://localhost:${localhostPort2}`, 
];
app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Router set up
app.use("/api/admin", AdminRouters);
// app.use("/user", UserRouters);


app.use(express.static('public'));
// app.use(express.static('public/dist'));

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    Jwt.verify(token, "jwt_secret_key", (err, decoded) => {
      if (err) return res.json({ Status: false, Error: "Wrong Token" });
      req.id = decoded.id;
      req.role = decoded.role;
      next();
    });
  } else {
    return res.json({ Status: false, Error: "Not autheticated" });
  }
};



app.get("/verify", verifyUser, (req, res) => {
  return res.json({ Status: true, role: req.role, id: req.id });
});

const port = 8080;
app.listen(port, () => {
  console.log(`Server is running where http://localhost:${port}`);
});