const express = require("express");
const multer = require("multer");
const path = require("path");
const { nanoid } = require("nanoid");
const { readDB, writeDB } = require("../db");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

// --- fayl yuklash sozlamalari ---
const ALLOWED_IMAGE = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const ALLOWED_VIDEO = ["video/mp4", "video/webm", "video/quicktime"];
const MAX_SIZE = 100 * 1024 * 1024; // 100 MB (video uchun)

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, "..", "uploads")),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${nanoid(10)}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: MAX_SIZE },
  fileFilter: (req, file, cb) => {
    if (ALLOWED_IMAGE.includes(file.mimetype) || ALLOWED_VIDEO.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Faqat rasm (jpg, png, webp, gif) yoki video (mp4, webm, mov) fayllar qabul qilinadi"));
    }
  },
});

// GET /api/posts - hammaga ochiq, eng yangisi birinchi
router.get("/", (req, res) => {
  const db = readDB();
  const { category } = req.query;
  let posts = [...db.posts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  if (category && category !== "Barchasi") {
    posts = posts.filter((p) => p.category === category);
  }
  res.json(posts);
});

// GET /api/posts/:id
router.get("/:id", (req, res) => {
  const db = readDB();
  const post = db.posts.find((p) => p.id === req.params.id);
  if (!post) return res.status(404).json({ error: "Post topilmadi" });
  res.json(post);
});

// POST /api/posts - faqat admin, multipart/form-data: title, description, category, media(fayl)
router.post("/", requireAuth, upload.single("media"), (req, res) => {
  const { title, description, category } = req.body;

  if (!title || !description || !category) {
    return res.status(400).json({ error: "title, description va category majburiy" });
  }

  const db = readDB();

  const mediaUrl = req.file ? `/uploads/${req.file.filename}` : null;
  const type = req.file
    ? (ALLOWED_VIDEO.includes(req.file.mimetype) ? "video" : "image")
    : "image";

  const newPost = {
    id: nanoid(8),
    category,
    type,
    title,
    description,
    mediaUrl,
    createdAt: new Date().toISOString(),
  };

  db.posts.push(newPost);
  writeDB(db);

  res.status(201).json(newPost);
});

// DELETE /api/posts/:id - faqat admin
router.delete("/:id", requireAuth, (req, res) => {
  const db = readDB();
  const exists = db.posts.some((p) => p.id === req.params.id);
  if (!exists) return res.status(404).json({ error: "Post topilmadi" });

  db.posts = db.posts.filter((p) => p.id !== req.params.id);
  writeDB(db);
  res.json({ success: true });
});

// multer xatolarini chiroyli qaytarish
router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError || err) {
    return res.status(400).json({ error: err.message });
  }
  next();
});

module.exports = router;
