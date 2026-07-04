const express = require("express");
const { nanoid } = require("nanoid");
const { readDB, writeDB } = require("../db");
const { requireAuth } = require("../middleware/auth");
const { notifyTelegram } = require("../telegram");

const router = express.Router();

// POST /api/leads - hammaga ochiq (kontakt formasidan yuboriladi)
router.post("/", async (req, res) => {
  const { name, phone } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ error: "Ism va telefon raqami majburiy" });
  }

  const db = readDB();
  const lead = {
    id: nanoid(8),
    name,
    phone,
    createdAt: new Date().toISOString(),
  };

  db.leads.push(lead);
  writeDB(db);

  // Telegramga xabar yuborish (sozlangan bo'lsa) - bu javobni sekinlashtirmasligi uchun kutmaymiz
  notifyTelegram(lead);

  res.status(201).json({ success: true });
});

// GET /api/leads - faqat admin, eng yangisi birinchi
router.get("/", requireAuth, (req, res) => {
  const db = readDB();
  const leads = [...db.leads].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  res.json(leads);
});

// DELETE /api/leads/:id - faqat admin
router.delete("/:id", requireAuth, (req, res) => {
  const db = readDB();
  db.leads = db.leads.filter((l) => l.id !== req.params.id);
  writeDB(db);
  res.json({ success: true });
});

module.exports = router;
