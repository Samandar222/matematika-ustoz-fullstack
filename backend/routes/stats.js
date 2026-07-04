const express = require("express");
const { readDB, writeDB } = require("../db");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

// GET /api/stats - hammaga ochiq
router.get("/", (req, res) => {
  const db = readDB();
  res.json(db.stats);
});

// PUT /api/stats - faqat admin, statistikani yangilash
router.put("/", requireAuth, (req, res) => {
  const db = readDB();
  db.stats = { ...db.stats, ...req.body };
  writeDB(db);
  res.json(db.stats);
});

module.exports = router;
