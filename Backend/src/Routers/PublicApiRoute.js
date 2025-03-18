import express from "express";
import {
  registerUser,
  updateViewCount,
  getViewCount,
  updateReadingTime,
} from "../controllers/PublicApiContrillers.js";

// PublicApiRouter route
const PublicApiRouter = express.Router();
// register router
PublicApiRouter.post("/register", registerUser);
// blog view count
PublicApiRouter.post("/updateViews", updateViewCount);
PublicApiRouter.get("/:articalid/view", getViewCount);
// blog Reading Time
PublicApiRouter.post("/updatereadingtime", updateReadingTime);

export { PublicApiRouter as PublicApiRouters };
