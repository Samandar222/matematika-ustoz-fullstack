import React, { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { HiUserGroup, HiTrophy, HiAcademicCap, HiChartBar } from "react-icons/hi2";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { api } from "../api";
import { useCountUp } from "../hooks/useCountUp";

const FALLBACK = {
  students: 1540,
  dtmPassRate: 98,
  certificates: 1180,
  yearsExperience: 12,
  yearly: [
    { yil: "2021", oquvchi: 340, sertifikat: 210, dtm: 190 },
    { yil: "2022", oquvchi: 520, sertifikat: 360, dtm: 300 },
    { yil: "2023", oquvchi: 780, sertifikat: 590, dtm: 470 },
    { yil: "2024", oquvchi: 1120, sertifikat: 860, dtm: 690 },
    { yil: "2025", oquvchi: 1540, sertifikat: 1180, dtm: 940 },
  ],
};

export default function Stats() {
  const [stats, setStats] = useState(FALLBACK);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  useEffect(() => {
    api.getStats().then(setStats).catch(() => setStats(FALLBACK));
  }, []);

  const students = useCountUp(stats.students, inView);
  const dtm = useCountUp(stats.dtmPassRate, inView);
  const certs = useCountUp(stats.certificates, inView);
  const years = useCountUp(stats.yearsExperience, inView);

  const cards = [
    { icon: HiUserGroup, val: students, suffix: "+", label: "faol o'quvchi" },
    { icon: HiChartBar, val: dtm, suffix: "%", label: "DTM dan o'tish ko'rsatkichi" },
    { icon: HiTrophy, val: certs, suffix: "+", label: "muvaffaqiyatli sertifikat" },
    { icon: HiAcademicCap, val: years, suffix: " yil", label: "o'qitish tajribasi" },
  ];

  return (
    <section id="natijalar" ref={ref} className="border-y border-line bg-surface/40">
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {cards.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="flex flex-col gap-2"
            >
              <c.icon className="text-gold" size={22} />
              <div className="font-mono text-3xl sm:text-4xl font-semibold">
                {c.val}
                {c.suffix}
              </div>
              <div className="text-white/60 text-sm">{c.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="glass rounded-2xl p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <h3 className="font-display text-xl">Yillar bo'yicha o'sish dinamikasi</h3>
            <div className="flex gap-5 text-xs text-white/60">
              <Legend color="#4F9CF9" label="O'quvchilar" />
              <Legend color="#D4AF37" label="Sertifikat" />
              <Legend color="#8592A8" label="DTM dan o'tgan" />
            </div>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={stats.yearly}>
              <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
              <XAxis dataKey="yil" stroke="#8592A8" fontSize={12} tickLine={false} axisLine={{ stroke: "rgba(255,255,255,0.1)" }} />
              <YAxis stroke="#8592A8" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ background: "#111A2C", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10 }} />
              <Bar dataKey="oquvchi" fill="#4F9CF9" radius={[4, 4, 0, 0]} />
              <Bar dataKey="sertifikat" fill="#D4AF37" radius={[4, 4, 0, 0]} />
              <Bar dataKey="dtm" fill="#8592A8" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}

function Legend({ color, label }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className="w-2.5 h-2.5 rounded-sm" style={{ background: color }} />
      {label}
    </span>
  );
}
