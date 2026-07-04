import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiStar } from "react-icons/hi2";
import { SectionEyebrow } from "./Courses";

const TESTIMONIALS = [
  { name: "Madina Yusupova", role: "DTM: 189.9 ball", text: "Ustozning tuzilgan reja va doimiy nazorati tufayli matematikadan qo'rqmaydigan bo'ldim." },
  { name: "Jasur Tolipov", role: "Milliy sertifikat: 94 ball", text: "Har bir mavzu misollar bilan tushuntirildi, testlar aynan DTM formatida edi." },
  { name: "Kamola Ergasheva", role: "TATU talabasi", text: "Kursdan keyin matematika eng yaxshi fanimga aylandi. Katta rahmat!" },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((v) => (v + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="fikrlar" className="max-w-6xl mx-auto px-6 py-24">
      <SectionEyebrow label="OQUVCHILAR FIKRI" />
      <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-10">Ular natijaga erishdi</h2>

      <div className="glass rounded-2xl p-8 sm:p-10 min-h-[200px] relative overflow-hidden">
        <div className="flex gap-1 mb-5">
          {[...Array(5)].map((_, i) => (
            <HiStar key={i} className="text-gold" size={16} />
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            <p className="font-display text-xl sm:text-2xl leading-snug max-w-2xl mb-6">
              "{TESTIMONIALS[active].text}"
            </p>
            <div className="font-semibold">{TESTIMONIALS[active].name}</div>
            <div className="font-mono text-sm text-gold">{TESTIMONIALS[active].role}</div>
          </motion.div>
        </AnimatePresence>

        <div className="absolute bottom-8 right-8 flex gap-2">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`w-2 h-2 rounded-full transition-colors ${active === i ? "bg-gold" : "bg-white/15"}`}
              aria-label={`Fikr ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
