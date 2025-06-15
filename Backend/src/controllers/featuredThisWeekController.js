import express from "express";
import db from "../../Utils/db.js";

const featuredThisWeekRouter = express.Router();

// GET all featured news
featuredThisWeekRouter.get("/", async (req, res) => {
  const [rows] = await db.query("SELECT * FROM featured_news ORDER BY id DESC");
  res.json(rows);
});

// POST new featured news
featuredThisWeekRouter.post("/", async (req, res) => {
  const { title, youtube_url } = req.body;
  if (!title || !youtube_url)
    return res.status(400).json({ error: "Title and YouTube URL required" });
  await db.query(
    "INSERT INTO featured_news (title, youtube_url) VALUES (?, ?)",
    [title, youtube_url]
  );
  res.json({ success: true });
});

// PUT update featured news
featuredThisWeekRouter.put("/:id", async (req, res) => {
  const { title, youtube_url } = req.body;
  if (!title || !youtube_url)
    return res.status(400).json({ error: "Title and YouTube URL required" });
  await db.query("UPDATE featured_news SET title=?, youtube_url=? WHERE id=?", [
    title,
    youtube_url,
    req.params.id,
  ]);
  res.json({ success: true });
});

// DELETE featured news
featuredThisWeekRouter.delete("/:id", async (req, res) => {
  await db.query("DELETE FROM featured_news WHERE id=?", [req.params.id]);
  res.json({ success: true });
});

export default featuredThisWeekRouter;
