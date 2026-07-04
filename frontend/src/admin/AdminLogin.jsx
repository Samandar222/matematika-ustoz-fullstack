import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { token } = await api.login(username, password);
      localStorage.setItem("admin_token", token);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg px-6">
      <form onSubmit={handleSubmit} className="w-full max-w-sm glass rounded-2xl p-8">
        <h1 className="font-display text-2xl mb-1">Admin panel</h1>
        <p className="text-white/50 text-sm mb-6">Blog va statistikani boshqarish uchun kiring.</p>

        {error && <div className="text-red-400 text-sm mb-4">{error}</div>}

        <label className="block text-sm text-white/60 mb-1.5">Login</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full bg-surface border border-line rounded-lg px-4 py-2.5 mb-4 outline-none focus:border-gold/50"
        />

        <label className="block text-sm text-white/60 mb-1.5">Parol</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full bg-surface border border-line rounded-lg px-4 py-2.5 mb-6 outline-none focus:border-gold/50"
        />

        <button
          disabled={loading}
          className="w-full bg-gold text-bg font-semibold py-2.5 rounded-lg disabled:opacity-60"
        >
          {loading ? "Tekshirilmoqda..." : "Kirish"}
        </button>
      </form>
    </div>
  );
}
