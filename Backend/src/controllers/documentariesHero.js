import express from "express";
import db from "../../Utils/db.js";
import multer from "multer";
const documentariesHeroRouter = express.Router();

// Setup Multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/Images/"); // Adjust as per your structure
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// GET the current hero section (always only one row)
documentariesHeroRouter.get("/", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM documentaries_hero ORDER BY id DESC LIMIT 1"
    );
    res.json(rows[0] || {});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

documentariesHeroRouter.put("/", upload.single("logo"), async (req, res) => {
  try {
    const { heading, description, logoFilename } = req.body;
    let logo = logoFilename; // default to old filename
    if (req.file) logo = req.file.filename;

    // check for row
    const [rows] = await db.query(
      "SELECT * FROM documentaries_hero ORDER BY id DESC LIMIT 1"
    );
    if (rows.length > 0) {
      await db.query(
        "UPDATE documentaries_hero SET heading=?, description=?, logo=? WHERE id=?",
        [heading, description, logo, rows[0].id]
      );
      return res.json({ success: true, logo });
    } else {
      await db.query(
        "INSERT INTO documentaries_hero (logo, heading, description) VALUES (?, ?, ?)",
        [logo, heading, description]
      );
      return res.json({ success: true, logo });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT (update) the hero section (add if not exists)
documentariesHeroRouter.put("/", upload.single("logo"), async (req, res) => {
  try {
    const { heading, description } = req.body;
    let logo;
    if (req.file) logo = req.file.filename;

    // Check if there is already a row
    const [rows] = await db.query(
      "SELECT * FROM documentaries_hero ORDER BY id DESC LIMIT 1"
    );
    if (rows.length > 0) {
      // update
      const updateFields = [];
      const updateValues = [];

      if (heading) {
        updateFields.push("heading=?");
        updateValues.push(heading);
      }
      if (description) {
        updateFields.push("description=?");
        updateValues.push(description);
      }
      if (logo) {
        updateFields.push("logo=?");
        updateValues.push(logo);
      }
      if (updateFields.length === 0) {
        return res.status(400).json({ error: "No fields to update" });
      }
      updateValues.push(rows[0].id);
      await db.query(
        `UPDATE documentaries_hero SET ${updateFields.join(", ")} WHERE id=?`,
        updateValues
      );
      return res.json({ success: true, message: "Updated" });
    } else {
      // insert
      if (!logo || !heading || !description) {
        return res.status(400).json({ error: "All fields are required" });
      }
      await db.query(
        "INSERT INTO documentaries_hero (logo, heading, description) VALUES (?, ?, ?)",
        [logo, heading, description]
      );
      return res.json({ success: true, message: "Created" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default documentariesHeroRouter;
