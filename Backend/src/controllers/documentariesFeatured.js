import express from "express";
import db from "../../Utils/db.js";

const documentariesFeaturedRouter = express.Router();

// GET all cards
documentariesFeaturedRouter.get("/", async (req, res) => {
  const [rows] = await db.query(
    "SELECT * FROM documentaries_featured ORDER BY id DESC"
  );
  res.json(rows);
});

// POST new card
documentariesFeaturedRouter.post("/", async (req, res) => {
  const { show_in, youtube_url } = req.body;
  if (!youtube_url)
    return res.status(400).json({ error: "YouTube URL required" });
  await db.query(
    "INSERT INTO documentaries_featured (show_in, youtube_url) VALUES (?, ?)",
    [show_in || "featured", youtube_url]
  );
  res.json({ success: true });
});

// PUT update card
documentariesFeaturedRouter.put("/:id", async (req, res) => {
  const { show_in, youtube_url } = req.body;
  if (!youtube_url)
    return res.status(400).json({ error: "YouTube URL required" });
  await db.query(
    "UPDATE documentaries_featured SET show_in=?, youtube_url=? WHERE id=?",
    [show_in || "featured", youtube_url, req.params.id]
  );
  res.json({ success: true });
});

// DELETE card
documentariesFeaturedRouter.delete("/:id", async (req, res) => {
  await db.query("DELETE FROM documentaries_featured WHERE id=?", [
    req.params.id,
  ]);
  res.json({ success: true });
});

export default documentariesFeaturedRouter;
