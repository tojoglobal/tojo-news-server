import express from "express";
import {
  registerUser,
  updateViewCount,
  getViewCount,
} from "../controllers/PublicApiContrillers.js";

// PublicApiRouter route
const PublicApiRouter = express.Router();
// register router
PublicApiRouter.post("/register", registerUser);
// blog view count
PublicApiRouter.post("/updateViews", updateViewCount);
PublicApiRouter.get("/:articalid/view", getViewCount);

export { PublicApiRouter as PublicApiRouters };
