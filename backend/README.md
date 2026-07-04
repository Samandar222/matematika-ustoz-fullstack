# Backend — Matematika Ustoz sayti

Node.js + Express asosidagi API. Blog postlari (rasm/video yuklash bilan),
statistika (o'quvchilar, sertifikatlar, DTM natijalari) va admin
autentifikatsiyasini boshqaradi. Ma'lumotlar `data/db.json` faylida
saqlanadi, fayllar `uploads/` papkasiga yuklanadi.

## O'rnatish

```bash
cd backend
npm install
cp .env.example .env
```

## Admin parolini sozlash

```bash
npm run create-admin -- MeningKuchliParolim2026
```

Skript chiqargan `ADMIN_PASSWORD_HASH=...` qatorini `.env` fayliga qo'ying.
`ADMIN_USERNAME` ni ham xohlagancha o'zgartiring.

## Ishga tushirish

```bash
npm run dev
```

Server: `http://localhost:4000`

## API yo'llari

| Metod | Yo'l | Kirish | Tavsif |
|---|---|---|---|
| POST | /api/auth/login | ochiq | Admin login, JWT token qaytaradi |
| GET | /api/posts | ochiq | Barcha blog postlari (?category=... bilan filtrlash mumkin) |
| GET | /api/posts/:id | ochiq | Bitta post |
| POST | /api/posts | admin | Yangi post (multipart/form-data: title, description, category, media) |
| DELETE | /api/posts/:id | admin | Postni o'chirish |
| GET | /api/stats | ochiq | Statistika (o'quvchilar soni, DTM foizi va h.k.) |
| PUT | /api/stats | admin | Statistikani yangilash |

Admin yo'llari uchun so'rov headeriga qo'shing:
`Authorization: Bearer <login orqali olingan token>`

## Fayl yuklash cheklovlari

- Ruxsat etilgan formatlar: jpg, png, webp, gif (rasm), mp4, webm, mov (video)
- Maksimal hajm: 100 MB
