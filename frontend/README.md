# Frontend — Matematika Ustoz sayti

React + Vite + Tailwind CSS + Framer Motion. Backend API bilan ishlaydi
(blog postlari, statistika, admin panel).

## O'rnatish

```bash
cd frontend
npm install
cp .env.example .env
```

`.env` faylida `VITE_API_URL` ni backend manziliga moslang (default: `http://localhost:4000`).

## Ishga tushirish

```bash
npm run dev
```

Sayt: `http://localhost:5173`
Admin panel: `http://localhost:5173/admin`

## Build (production uchun)

```bash
npm run build
```

Natija `dist/` papkasida hosil bo'ladi — buni istalgan statik hosting
(Vercel, Netlify, oddiy server) ga joylashtirishingiz mumkin.

## Struktura

```
src/
  components/   → sayt bo'limlari (Hero, Stats, Blog, Testimonials, FAQ, Contact...)
  admin/        → admin login va boshqaruv paneli
  api.js        → backend bilan aloqa
  App.jsx       → routing
```

## Eslatma

Bosh sahifadagi statistikalar va blog postlari **backenddan real vaqtda**
olinadi. Agar backend ishlamayotgan bo'lsa, statistikalar zaxira (fallback)
qiymatlar bilan ko'rsatiladi, blog bo'limi esa bo'sh chiqadi.
