import express from "express";
import multer from "multer";
import {
  registerUser,
  updateViewCount,
} from "../controllers/PublicApiContrillers.js";

// PublicApiRouter route
const PublicApiRouter = express.Router();
// register router
PublicApiRouter.post("/register", registerUser);
// blog view count
PublicApiRouter.post("/updateViews", updateViewCount);

export { PublicApiRouter as PublicApiRouters };
