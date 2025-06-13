import express from "express";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import {
  createEvent,
  getAllEvents,
  getEventById,
  editEvent,
  deleteEvent,
} from "../controllers/eventController.js";

// Multer config for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/Images");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      `${uuidv4()}_${Date.now()}-${file.originalname.replace(/\s+/g, "-")}`
    );
  },
});

const upload = multer({ storage });

const eventRoute = express.Router();

eventRoute.post("/create", upload.single("file"), createEvent);
eventRoute.get("/", getAllEvents);
eventRoute.get("/:id", getEventById);
eventRoute.put("/edit/:id", upload.single("file"), editEvent);
eventRoute.delete("/delete/:id", deleteEvent);

export default eventRoute;
