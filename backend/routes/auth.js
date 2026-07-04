const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

// POST /api/auth/login
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Login va parol kiritilishi shart" });
  }

  const validUsername = username === process.env.ADMIN_USERNAME;
  const hash = process.env.ADMIN_PASSWORD_HASH;

  if (!validUsername || !hash) {
    return res.status(401).json({ error: "Login yoki parol noto'g'ri" });
  }

  const validPassword = bcrypt.compareSync(password, hash);
  if (!validPassword) {
    return res.status(401).json({ error: "Login yoki parol noto'g'ri" });
  }

  const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: "12h" });
  res.json({ token });
});

module.exports = router;
