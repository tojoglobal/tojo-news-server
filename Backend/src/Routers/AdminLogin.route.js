import express from "express";
import {
  adminLogin,
  registerAdmin,
} from "../controllers/adminLogin.controller.js";
const adminlogin = express.Router();
// admin login
adminlogin.post("/api/adminlogin", adminLogin);
adminlogin.post("/api/registerAdmin", registerAdmin);

export default adminlogin;
