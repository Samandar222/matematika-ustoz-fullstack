import React, { useState } from "react";
import { motion } from "framer-motion";
import { HiPaperAirplane, HiOutlinePhone, HiOutlineMapPin } from "react-icons/hi2";
import { FaTelegram, FaInstagram } from "react-icons/fa";
import { api } from "../api";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      await api.createLead(name, phone);
      setSent(true);
    } catch (err) {
      setError("Xatolik yuz berdi, birozdan so'ng qayta urinib ko'ring.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section id="contact" className="border-t border-line bg-aurora">
      <div className="max-w-4xl mx-auto px-6 py-24 text-center">
        <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-3">
          Bepul sinov darsiga yoziling
        </h2>
        <p className="text-white/60 mb-10">Ismingiz va telefon raqamingizni qoldiring, tez orada bog'lanamiz.</p>

        {sent ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass rounded-xl p-6 max-w-md mx-auto">
            Rahmat! Arizangiz qabul qilindi, tez orada siz bilan bog'lanamiz.
          </motion.div>
        ) : (
          <>
            <form onSubmit={handleSubmit} className="flex flex-wrap gap-3 justify-center max-w-xl mx-auto">
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ismingiz"
                className="flex-1 min-w-[180px] bg-surface border border-line rounded-xl px-4 py-3.5 text-sm outline-none focus:border-gold/50"
              />
              <input
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+998 __ ___ __ __"
                className="flex-1 min-w-[180px] bg-surface border border-line rounded-xl px-4 py-3.5 text-sm outline-none focus:border-gold/50"
              />
              <motion.button
                disabled={busy}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="bg-gold text-bg font-semibold px-6 py-3.5 rounded-xl flex items-center gap-2 shadow-gold disabled:opacity-60"
              >
                {busy ? "Yuborilmoqda..." : "Yuborish"} <HiPaperAirplane size={16} />
              </motion.button>
            </form>
            {error && <p className="text-red-400 text-sm mt-4">{error}</p>}
          </>
        )}

        <div className="flex items-center justify-center gap-6 mt-10 text-white/50 text-sm flex-wrap">
          <span className="flex items-center gap-2"><HiOutlinePhone /> +998 95 070 82 19</span>
          <span className="flex items-center gap-2"><HiOutlineMapPin /> Bakhmal tumani 2-son kasb hunar kolleji</span>
          <a href="https://t.me/Usmonov_Sobirbek" className="flex items-center gap-2 hover:text-white" target="_blank" rel="noopener noreferrer">
            <FaTelegram /> @Usmonov_Sobirbek
          </a>
          <a href="https://www.instagram.com/matematik_sobir/" className="flex items-center gap-2 hover:text-white" target="_blank" rel="noopener noreferrer">
            <FaInstagram /> matematik_sobir
          </a>
        </div>
      </div>
    </section>
  );
}
