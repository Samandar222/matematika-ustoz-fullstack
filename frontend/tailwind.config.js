/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#05070D",
        surface: "#0B1220",
        surface2: "#111A2C",
        gold: "#D4AF37",
        goldSoft: "#E9CD6C",
        azure: "#4F9CF9",
        line: "rgba(255,255,255,0.08)",
        dim: "rgba(255,255,255,0.75)",
      },
      fontFamily: {
        display: ["'Playfair Display'", "serif"],
        body: ["Inter", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      boxShadow: {
        gold: "0 0 40px -10px rgba(212,175,55,0.35)",
        azure: "0 0 40px -10px rgba(79,156,249,0.35)",
      },
      backgroundImage: {
        aurora:
          "radial-gradient(60% 50% at 20% 0%, rgba(79,156,249,0.18) 0%, transparent 60%), radial-gradient(50% 40% at 85% 10%, rgba(212,175,55,0.16) 0%, transparent 60%)",
      },
      keyframes: {
        floaty: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-16px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
      },
      animation: {
        floaty: "floaty 6s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
      },
    },
  },
  plugins: [],
};
