import React from "react";
import { PiSigmaBold } from "react-icons/pi";

export default function Footer() {
  return (
    <footer className="relative border-t border-line bg-bg overflow-hidden">
      <div className="absolute inset-0 opacity-40" style={{
        backgroundImage: "radial-gradient(1px 1px at 20% 30%, white, transparent), radial-gradient(1px 1px at 60% 70%, white, transparent), radial-gradient(1px 1px at 85% 20%, white, transparent), radial-gradient(1px 1px at 40% 85%, white, transparent), radial-gradient(1px 1px at 75% 55%, white, transparent)",
        backgroundSize: "300px 300px",
      }} />
      <div className="relative max-w-6xl mx-auto px-6 py-14 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2.5">
          <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-gold to-goldSoft flex items-center justify-center text-bg">
            <PiSigmaBold size={16} />
          </span>
          <span className="font-display">Usmonov Sobir | Matematika</span>
        </div>
        <p className="text-white/40 text-sm text-center">
          © {new Date().getFullYear()} Barcha huquqlar himoyalangan.
        </p>
        <a href="/admin" className="text-white/30 text-xs hover:text-white/60">
          Admin panel
        </a>
      </div>
    </footer>
  );
}
