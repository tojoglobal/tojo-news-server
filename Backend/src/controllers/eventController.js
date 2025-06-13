import db from "../../Utils/db.js";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import fs from "fs";

// Create Event
export const createEvent = async (req, res) => {
  try {
    const imageFile = req.file ? req.file.filename : null;
    const values = [
      uuidv4(),
      req.body.title,
      req.body.description,
      req.body.location,
      req.body.date,
      imageFile,
    ];
    const [result] = await db.query(
      "INSERT INTO events (uuid, title, description, location, date, image_url) VALUES (?, ?, ?, ?, ?, ?)",
      values
    );
    return res.json({ Status: true, Result: result });
  } catch (error) {
    return res.json({ Status: false, Error: error.message });
  }
};

// All Events
export const getAllEvents = async (req, res) => {
  try {
    const [result] = await db.query("SELECT * FROM events ORDER BY date DESC");
    return res.json({ Status: true, Result: result });
  } catch (error) {
    return res.json({ Status: false, Error: error.message });
  }
};

// Get Event by ID (uuid)
export const getEventById = async (req, res) => {
  try {
    const id = req.params.id;
    const [result] = await db.query("SELECT * FROM events WHERE uuid = ?", [
      id,
    ]);
    if (result.length === 0)
      return res.status(404).json({ Status: false, Error: "Not found" });
    return res.json({ Status: true, Result: result });
  } catch (error) {
    return res.json({ Status: false, Error: error.message });
  }
};

// Update Event
export const editEvent = async (req, res) => {
  try {
    const id = req.params.id;
    const [current] = await db.query("SELECT * FROM events WHERE uuid = ?", [
      id,
    ]);
    if (current.length === 0)
      return res.status(404).json({ Status: false, Error: "Not found" });

    let newImage = current[0].image_url;
    if (req.file) {
      // Optionally delete old file
      if (newImage) {
        const oldPath = path.join("public/Images", newImage);
        if (fs.existsSync(oldPath)) await fs.promises.unlink(oldPath);
      }
      newImage = req.file.filename;
    }

    const values = [
      req.body.title,
      req.body.description,
      req.body.location,
      req.body.date,
      newImage,
      id,
    ];
    const [result] = await db.query(
      "UPDATE events SET title=?, description=?, location=?, date=?, image_url=? WHERE uuid=?",
      values
    );
    return res.json({ Status: true, Result: result });
  } catch (error) {
    return res.json({ Status: false, Error: error.message });
  }
};

// Delete Event
export const deleteEvent = async (req, res) => {
  try {
    const id = req.params.id;
    const [rows] = await db.query(
      "SELECT image_url FROM events WHERE uuid = ?",
      [id]
    );
    if (rows.length === 0)
      return res.status(404).json({ Status: false, Error: "Not found" });

    const filename = rows[0].image_url;
    if (filename) {
      const filepath = path.join("public/Images", filename);
      if (fs.existsSync(filepath)) await fs.promises.unlink(filepath);
    }
    await db.query("DELETE FROM events WHERE uuid = ?", [id]);
    return res.json({ Status: true, message: "Event deleted" });
  } catch (error) {
    return res.json({ Status: false, Error: error.message });
  }
};
