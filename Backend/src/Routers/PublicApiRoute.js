import express from "express";
import multer from "multer";
import { createNewsCategory } from "../controllers/PublicApiContrillers.js";

// PublicApiRouter route
const PublicApiRouter = express.Router();

PublicApiRouter.get("/newsCategory", createNewsCategory);

export { PublicApiRouter as PublicApiRouters };
