require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/auth");
const postsRoutes = require("./routes/posts");
const statsRoutes = require("./routes/stats");
const leadsRoutes = require("./routes/leads");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: process.env.CLIENT_ORIGIN || "http://localhost:5173" }));
app.use(express.json());

// yuklangan rasm/videolarni ochiq statik fayl sifatida berish
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/auth", authRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/leads", leadsRoutes);

app.get("/api/health", (req, res) => res.json({ ok: true }));

app.use((req, res) => res.status(404).json({ error: "Manzil topilmadi" }));

app.listen(PORT, () => {
  console.log(`✅ Backend http://localhost:${PORT} da ishga tushdi`);
});
