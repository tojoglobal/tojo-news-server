import express from "express";
import db from "../../Utils/db.js";
import multer from "multer";

const featuredThisWeekRouter = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "public/Images/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// GET all featured news
featuredThisWeekRouter.get("/", async (req, res) => {
  const [rows] = await db.query("SELECT * FROM featured_news ORDER BY id DESC");
  res.json(rows);
});

// POST new featured news
featuredThisWeekRouter.post("/", upload.single("image"), async (req, res) => {
  const { title, link } = req.body;
  console.log(req.body);
  const image = req.file ? req.file.filename : "";
  if (!image || !title || !link)
    return res.status(400).json({ error: "All fields required" });
  await db.query(
    "INSERT INTO featured_news (image, title, link) VALUES (?, ?, ?)",
    [image, title, link]
  );
  res.json({ success: true });
});

// PUT update featured news
featuredThisWeekRouter.put("/:id", upload.single("image"), async (req, res) => {
  const { title, link, imageFilename } = req.body;
  let image = imageFilename;
  if (req.file) image = req.file.filename;
  if (!title || !link || !image)
    return res.status(400).json({ error: "All fields required" });
  await db.query(
    "UPDATE featured_news SET image=?, title=?, link=? WHERE id=?",
    [image, title, link, req.params.id]
  );
  res.json({ success: true });
});

// DELETE featured news
featuredThisWeekRouter.delete("/:id", async (req, res) => {
  await db.query("DELETE FROM featured_news WHERE id=?", [req.params.id]);
  res.json({ success: true });
});

export default featuredThisWeekRouter;
