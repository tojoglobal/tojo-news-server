import express from "express";
import {
  registerUser,
  updateViewCount,
  getViewCount,
  updateReadingTime,
  loveCount,
  getLoveCount,
  getLatestNews,
  getMostReadBlogs,
  getMostPopulerViews,
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
//blog love count
PublicApiRouter.post("/updateLoves", loveCount);
PublicApiRouter.get("/getLove", getLoveCount);
//latest-news
PublicApiRouter.get("/getLatestNews", getLatestNews);
//Most-Read-news
PublicApiRouter.get("/getMostRead", getMostReadBlogs);
//Most-Read-news
PublicApiRouter.get("/getMostPopulerViews", getMostPopulerViews);

export { PublicApiRouter as PublicApiRouters };
