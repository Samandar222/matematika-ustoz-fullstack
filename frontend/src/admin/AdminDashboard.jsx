import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiTrash, HiArrowRightOnRectangle } from "react-icons/hi2";
import { api } from "../api";

const CATEGORIES = ["Natijalar", "Sertifikat", "Video dars", "Qabul", "Maslahat"];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [leads, setLeads] = useState([]);
  const [stats, setStats] = useState(null);
  const [form, setForm] = useState({ title: "", description: "", category: CATEGORIES[0], media: null });
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("admin_token")) {
      navigate("/admin");
      return;
    }
    loadPosts();
    loadLeads();
    api.getStats().then(setStats).catch(() => {});
  }, []);

  function loadPosts() {
    api.getPosts().then(setPosts).catch(() => {});
  }

  function loadLeads() {
    api.getLeads().then(setLeads).catch(() => {});
  }

  async function handleDeleteLead(id) {
    await api.deleteLead(id);
    loadLeads();
  }

  function logout() {
    localStorage.removeItem("admin_token");
    navigate("/admin");
  }

  async function handleCreate(e) {
    e.preventDefault();
    setBusy(true);
    setMessage("");
    try {
      const fd = new FormData();
      fd.append("title", form.title);
      fd.append("description", form.description);
      fd.append("category", form.category);
      if (form.media) fd.append("media", form.media);

      await api.createPost(fd);
      setForm({ title: "", description: "", category: CATEGORIES[0], media: null });
      setMessage("✅ Post muvaffaqiyatli qo'shildi.");
      loadPosts();
    } catch (err) {
      setMessage(`❌ ${err.message}`);
    } finally {
      setBusy(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Ushbu postni o'chirishni tasdiqlaysizmi?")) return;
    await api.deletePost(id);
    loadPosts();
  }

  async function handleStatsSave(e) {
    e.preventDefault();
    const updated = await api.updateStats(stats);
    setStats(updated);
    setMessage("✅ Statistika yangilandi.");
  }

  return (
    <div className="min-h-screen bg-bg px-6 py-10 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-10">
        <h1 className="font-display text-2xl">Admin panel</h1>
        <button onClick={logout} className="flex items-center gap-2 text-white/60 hover:text-white text-sm">
          <HiArrowRightOnRectangle /> Chiqish
        </button>
      </div>

      {message && <div className="mb-6 text-sm">{message}</div>}

      {/* Kelib tushgan arizalar */}
      <div className="glass rounded-2xl p-6 mb-10">
        <h2 className="font-display text-lg mb-4">Yangi arizalar ({leads.length})</h2>
        <div className="flex flex-col divide-y divide-line">
          {leads.map((l) => (
            <div key={l.id} className="flex items-center justify-between py-3 gap-4">
              <div className="min-w-0">
                <div className="text-sm font-medium">{l.name} — {l.phone}</div>
                <div className="text-xs text-white/40">
                  {new Date(l.createdAt).toLocaleString("uz-UZ")}
                </div>
              </div>
              <button onClick={() => handleDeleteLead(l.id)} className="text-red-400 hover:text-red-300 shrink-0">
                <HiTrash size={18} />
              </button>
            </div>
          ))}
          {leads.length === 0 && <p className="text-white/40 text-sm py-4">Hozircha ariza yo'q.</p>}
        </div>
      </div>

      {/* Statistika tahrirlash */}
      {stats && (
        <form onSubmit={handleStatsSave} className="glass rounded-2xl p-6 mb-10">
          <h2 className="font-display text-lg mb-4">Statistika</h2>
          <div className="grid sm:grid-cols-4 gap-4 mb-4">
            <NumberField label="O'quvchilar" value={stats.students} onChange={(v) => setStats({ ...stats, students: v })} />
            <NumberField label="DTM foizi" value={stats.dtmPassRate} onChange={(v) => setStats({ ...stats, dtmPassRate: v })} />
            <NumberField label="Sertifikatlar" value={stats.certificates} onChange={(v) => setStats({ ...stats, certificates: v })} />
            <NumberField label="Tajriba (yil)" value={stats.yearsExperience} onChange={(v) => setStats({ ...stats, yearsExperience: v })} />
          </div>
          <button className="bg-gold text-bg font-semibold px-5 py-2 rounded-lg text-sm">Saqlash</button>
        </form>
      )}

      {/* Yangi post qo'shish */}
      <form onSubmit={handleCreate} className="glass rounded-2xl p-6 mb-10">
        <h2 className="font-display text-lg mb-4">Yangi blog posti</h2>

        <label className="block text-sm text-white/60 mb-1.5">Sarlavha</label>
        <input
          required
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full bg-surface border border-line rounded-lg px-4 py-2.5 mb-4 outline-none focus:border-gold/50"
        />

        <label className="block text-sm text-white/60 mb-1.5">Tavsif</label>
        <textarea
          required
          rows={3}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full bg-surface border border-line rounded-lg px-4 py-2.5 mb-4 outline-none focus:border-gold/50"
        />

        <label className="block text-sm text-white/60 mb-1.5">Kategoriya</label>
        <select
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="w-full bg-surface border border-line rounded-lg px-4 py-2.5 mb-4 outline-none focus:border-gold/50"
        >
          {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>

        <label className="block text-sm text-white/60 mb-1.5">Rasm yoki video</label>
        <input
          type="file"
          accept="image/*,video/*"
          onChange={(e) => setForm({ ...form, media: e.target.files[0] })}
          className="w-full text-sm mb-6"
        />

        <button disabled={busy} className="bg-gold text-bg font-semibold px-5 py-2.5 rounded-lg text-sm disabled:opacity-60">
          {busy ? "Yuklanmoqda..." : "Postni joylashtirish"}
        </button>
      </form>

      {/* Mavjud postlar ro'yxati */}
      <div className="glass rounded-2xl p-6">
        <h2 className="font-display text-lg mb-4">Mavjud postlar ({posts.length})</h2>
        <div className="flex flex-col divide-y divide-line">
          {posts.map((p) => (
            <div key={p.id} className="flex items-center justify-between py-3 gap-4">
              <div className="min-w-0">
                <div className="text-sm font-medium truncate">{p.title}</div>
                <div className="text-xs text-white/40">{p.category}</div>
              </div>
              <button onClick={() => handleDelete(p.id)} className="text-red-400 hover:text-red-300 shrink-0">
                <HiTrash size={18} />
              </button>
            </div>
          ))}
          {posts.length === 0 && <p className="text-white/40 text-sm py-4">Hozircha post yo'q.</p>}
        </div>
      </div>
    </div>
  );
}

function NumberField({ label, value, onChange }) {
  return (
    <div>
      <label className="block text-xs text-white/50 mb-1.5">{label}</label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full bg-surface border border-line rounded-lg px-3 py-2 text-sm outline-none focus:border-gold/50"
      />
    </div>
  );
}
