import React, { useState, useEffect } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { PiSigmaBold } from "react-icons/pi";
import { motion } from "framer-motion";

const LINKS = [
  { label: "Kurslar", href: "#kurslar" },
  { label: "Natijalar", href: "#natijalar" },
  { label: "Blog", href: "#blog" },
  { label: "Fikrlar", href: "#fikrlar" },
  { label: "FAQ", href: "#faq" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-bg/80 backdrop-blur-xl border-b border-line" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5">
          <span className="w-9 h-9 rounded-lg bg-gradient-to-br from-gold to-goldSoft flex items-center justify-center text-bg">
            <PiSigmaBold size={18} />
          </span>
          <span className="font-display text-lg tracking-wide">
            Usmonov Sobir <span className="text-white/50 font-body text-sm">| Matematika</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8 text-sm text-white/70">
          {LINKS.map((l) => (
            <a key={l.label} href={l.href} className="underline-grow hover:text-white transition-colors">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="hidden sm:inline-flex items-center gap-2 bg-gold text-bg font-semibold text-sm px-5 py-2.5 rounded-full shadow-gold"
          >
            Kursga yozilish
          </motion.a>
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden w-10 h-10 rounded-lg border border-line flex items-center justify-center"
            aria-label="Menyu"
          >
            {open ? <HiX size={20} /> : <HiMenu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden px-6 pb-5 flex flex-col gap-4 border-t border-line">
          {LINKS.map((l) => (
            <a key={l.label} href={l.href} onClick={() => setOpen(false)} className="text-white/80 text-base">
              {l.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
