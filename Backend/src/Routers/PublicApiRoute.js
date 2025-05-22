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
  getAuthors,
  newsLetterSubscribe,
  checkSubscription,
} from "../controllers/PublicApiControllers.js";

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
//get the author data
PublicApiRouter.get("/authors", getAuthors);
// newsletter
PublicApiRouter.get("/check-subscription", checkSubscription);
PublicApiRouter.post("/subscribe", newsLetterSubscribe);

export { PublicApiRouter as PublicApiRouters };
