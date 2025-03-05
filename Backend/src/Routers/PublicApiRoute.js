import express from "express";
import multer from "multer";
import { registerUser } from "../controllers/PublicApiContrillers.js";

// PublicApiRouter route
const PublicApiRouter = express.Router();

PublicApiRouter.post("/register", registerUser);

export { PublicApiRouter as PublicApiRouters };
