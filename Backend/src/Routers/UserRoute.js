import express from "express";
import multer from "multer";
import { createNewsCategory } from "../controllers/UserControllers.js";

// PublicApiRouter route
const UserRouter = express.Router();

UserRouter.get("/newsCategory", createNewsCategory);

export { UserRouter as UserRouters };
