import React from "react";
import { motion } from "framer-motion";
import { HiOutlineChartBar, HiOutlineAcademicCap, HiOutlineBookOpen, HiArrowRight } from "react-icons/hi2";

const COURSES = [
  {
    icon: HiOutlineChartBar,
    tag: "Eng ommabop",
    title: "DTM ga tayyorlov",
    desc: "Davlat test markazi formatidagi testlar, vaqt boshqaruvi va xatolar ustida tizimli ishlash.",
    level: "9-11 sinf",
  },
  {
    icon: HiOutlineAcademicCap,
    tag: "Yuqori natija",
    title: "Milliy sertifikat",
    desc: "Milliy sertifikat blanklari asosida chuqurlashtirilgan mavzular va nazorat testlari.",
    level: "Abituriyent",
  },
  {
    icon: HiOutlineBookOpen,
    tag: "Barqaror asos",
    title: "Majburiy fanlar",
    desc: "Maktab dasturi bo'yicha matematikani mustahkamlash va nazoratga tayyorgarlik.",
    level: "8-11 sinf",
  },
];

export default function Courses() {
  return (
    <section id="kurslar" className="max-w-6xl mx-auto px-6 py-24">
      <SectionEyebrow label="YO'NALISHLAR" />
      <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-12">
        Har bir maqsad uchun alohida dastur
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {COURSES.map((c, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            whileHover={{ y: -6 }}
            className="group relative rounded-2xl border border-line bg-surface p-7 transition-shadow hover:shadow-gold hover:border-gold/40"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center">
                <c.icon size={22} className="text-gold" />
              </div>
              <span className="text-xs text-azure border border-azure/30 rounded-full px-3 py-1">{c.tag}</span>
            </div>
            <h3 className="font-display text-xl mb-2">{c.title}</h3>
            <p className="text-white/60 text-sm leading-relaxed mb-5">{c.desc}</p>
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/40">{c.level}</span>
              <span className="flex items-center gap-1 text-gold underline-grow font-medium">
                Batafsil <HiArrowRight size={15} />
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function SectionEyebrow({ label }) {
  return <div className="font-mono text-xs tracking-widest text-azure mb-3">{label}</div>;
}
