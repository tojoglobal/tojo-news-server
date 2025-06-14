import express from "express";
import db from "../../Utils/db.js";
import multer from "multer";

const documentariesFeaturedRouter = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "public/Images/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// GET all cards
documentariesFeaturedRouter.get("/", async (req, res) => {
  const [rows] = await db.query(
    "SELECT * FROM documentaries_featured ORDER BY id DESC"
  );
  res.json(rows);
});

// POST new card
documentariesFeaturedRouter.post(
  "/",
  upload.single("image"),
  async (req, res) => {
    const { link, show_in } = req.body;
    const image = req.file ? req.file.filename : "";
    if (!image || !link)
      return res.status(400).json({ error: "Image and link required" });
    await db.query(
      "INSERT INTO documentaries_featured (image, link, show_in) VALUES (?, ?, ?)",
      [image, link, show_in || "featured"]
    );
    res.json({ success: true });
  }
);

// PUT update card
documentariesFeaturedRouter.put(
  "/:id",
  upload.single("image"),
  async (req, res) => {
    const { link, imageFilename, show_in } = req.body;
    let image = imageFilename;
    if (req.file) image = req.file.filename;
    if (!link || !image)
      return res.status(400).json({ error: "Image and link required" });
    await db.query(
      "UPDATE documentaries_featured SET image=?, link=?, show_in=? WHERE id=?",
      [image, link, show_in || "featured", req.params.id]
    );
    res.json({ success: true });
  }
);

// DELETE card
documentariesFeaturedRouter.delete("/:id", async (req, res) => {
  await db.query("DELETE FROM documentaries_featured WHERE id=?", [
    req.params.id,
  ]);
  res.json({ success: true });
});

export default documentariesFeaturedRouter;
