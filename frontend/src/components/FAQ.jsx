import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiChevronDown } from "react-icons/hi2";
import { SectionEyebrow } from "./Courses";

const FAQS = [
  { q: "Darslar qanday formatda o'tkaziladi?", a: "Darslar offline (kichik guruhlarda, 6-8 kishi). Har ikkalasida ham yozma materiallar va uy vazifalari beriladi." },
  { q: "Guruhga necha yoshdan qabul qilinadi?", a: "8-sinfdan 11-sinfgacha, shuningdek abituriyentlar uchun alohida guruhlar mavjud." },
  { q: "Sinov darsi pullikmi?", a: "Yo'q, birinchi sinov darsi mutlaqo bepul. Shundan so'ng qaysi dastur mos kelishini birgalikda aniqlaymiz." },
  { q: "Guruh yoki yakka tartibda dars bo'ladimi?", a: "Ikkalasi ham mavjud. Yakka tartibdagi darslar individual reja asosida tuziladi." },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="max-w-3xl mx-auto px-6 py-24">
      <SectionEyebrow label="SAVOL-JAVOB" />
      <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-10">Ko'p beriladigan savollar</h2>

      <div className="flex flex-col gap-3">
        {FAQS.map((item, i) => {
          const open = openIndex === i;
          return (
            <div key={i} className="border border-line rounded-xl overflow-hidden bg-surface">
              <button
                onClick={() => setOpenIndex(open ? -1 : i)}
                className="w-full flex items-center justify-between text-left px-5 py-4 font-medium"
              >
                {item.q}
                <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
                  <HiChevronDown className="text-gold" />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="px-5 overflow-hidden"
                  >
                    <p className="pb-5 text-white/60 text-sm leading-relaxed">{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
