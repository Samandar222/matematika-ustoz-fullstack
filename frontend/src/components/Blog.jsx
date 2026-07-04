import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlinePhoto, HiPlayCircle, HiOutlineCalendar, HiOutlineVideoCamera } from "react-icons/hi2";
import { api } from "../api";
import { SectionEyebrow } from "./Courses";

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState("Barchasi");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api
      .getPosts(filter)
      .then(setPosts)
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, [filter]);

  const categories = ["Barchasi", "Natijalar", "Sertifikat", "Video dars", "Qabul", "Maslahat"];

  return (
    <section id="blog" className="border-y border-line bg-surface/30">
      <div className="max-w-6xl mx-auto px-6 py-24">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
          <div>
            <SectionEyebrow label="YANGILIKLAR" />
            <h2 className="font-display text-3xl sm:text-4xl font-semibold">
              Natijalar, sertifikatlar va darslar
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`text-xs sm:text-sm px-4 py-2 rounded-full border transition-colors ${
                  filter === c
                    ? "border-gold text-gold bg-gold/10"
                    : "border-line text-white/50 hover:text-white/80"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-72 rounded-2xl border border-line bg-surface animate-pulse" />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <p className="text-white/50">Hozircha bu bo'limda post yo'q.</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            <AnimatePresence>
              {posts.map((p) => (
                <motion.article
                  key={p.id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  whileHover={{ y: -5 }}
                  className="rounded-2xl border border-line bg-surface overflow-hidden hover:border-gold/40 transition-colors"
                >
                  <div className="relative h-40 grid-texture bg-gradient-to-br from-surface2 to-surface flex items-center justify-center">
                    {p.mediaUrl ? (
                      p.type === "video" ? (
                        <video
                          src={`${api.baseUrl}${p.mediaUrl}`}
                          className="w-full h-full object-cover"
                          controls
                          playsInline
                          preload="metadata"
                        />
                      ) : (
                        <img src={`${api.baseUrl}${p.mediaUrl}`} className="w-full h-full object-cover" alt={p.title} />
                      )
                    ) : p.type === "video" ? (
                      <HiPlayCircle size={36} className="text-gold/70" />
                    ) : (
                      <HiOutlinePhoto size={30} className="text-white/30" />
                    )}
                    <span className="absolute top-2.5 left-2.5 text-[11px] bg-bg/70 rounded-full px-2.5 py-1 flex items-center gap-1">
                      {p.type === "video" ? <HiOutlineVideoCamera size={12} /> : <HiOutlinePhoto size={12} />}
                      {p.type === "video" ? "Video" : "Rasm"}
                    </span>
                    <span className="absolute top-2.5 right-2.5 text-[11px] bg-azure/15 text-azure rounded-full px-2.5 py-1">
                      {p.category}
                    </span>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-1.5 text-white/40 text-xs mb-2">
                      <HiOutlineCalendar size={12} />
                      {new Date(p.createdAt).toLocaleDateString("uz-UZ", { year: "numeric", month: "long" })}
                    </div>
                    <h3 className="font-display text-base leading-snug mb-2">{p.title}</h3>
                    <p className="text-white/55 text-sm leading-relaxed">{p.description}</p>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
}
