import React from "react";
import { motion } from "framer-motion";
import { HiArrowRight, HiPlayCircle } from "react-icons/hi2";

const SYMBOLS = [
  { char: "∫", top: "12%", left: "78%", size: 140, delay: 0, color: "text-azure/20" },
  { char: "π", top: "58%", left: "88%", size: 70, delay: 0.8, color: "text-gold/25" },
  { char: "Σ", top: "22%", left: "6%", size: 90, delay: 1.4, color: "text-azure/15" },
  { char: "√x", top: "72%", left: "10%", size: 60, delay: 2, color: "text-gold/20" },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-aurora grid-texture">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg/40 to-bg pointer-events-none" />

      {SYMBOLS.map((s, i) => (
        <motion.span
          key={i}
          className={`absolute font-display ${s.color} pointer-events-none select-none hidden sm:block`}
          style={{ top: s.top, left: s.left, fontSize: s.size }}
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 7, delay: s.delay, repeat: Infinity, ease: "easeInOut" }}
        >
          {s.char}
        </motion.span>
      ))}

      <div className="relative max-w-6xl mx-auto px-6 pt-32 pb-20 w-full">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-2 text-xs sm:text-sm text-azure border border-azure/25 bg-azure/5 rounded-full px-4 py-1.5 mb-8"
        >
          DTM • Milliy sertifikat • Majburiy fanlar
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display font-semibold leading-[1.05] text-4xl sm:text-6xl lg:text-7xl max-w-3xl"
        >
          Matematikani mukammal <span className="text-gold">o'zlashtiring.</span>
          <br /> Kelajagingizni quring.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-7 text-white/70 text-lg max-w-xl leading-relaxed"
        >
          DTM, Milliy sertifikat va maktab dasturi bo'yicha zamonaviy metodika
          va isbotlangan natijalar bilan tayyorlaymiz.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 bg-gold text-bg font-semibold px-7 py-3.5 rounded-xl shadow-gold"
          >
            Bepul sinov darsi <HiArrowRight />
          </motion.a>
          <motion.a
            href="#fikrlar"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 glass text-white font-semibold px-7 py-3.5 rounded-xl"
          >
            <HiPlayCircle size={20} /> Muvaffaqiyat hikoyalari
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
