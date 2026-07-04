# Matematika Ustoz — to'liq sayt (Frontend + Backend)

DTM, Milliy sertifikat va majburiy fanlar bo'yicha matematika ustozining
shaxsiy premium sayti. Blog bo'limi orqali ustoz o'quvchilar natijalari,
sertifikatlar va DTM statistikasini rasm/video va tavsif bilan joylashtirishi
mumkin.

## Loyiha tarkibi

```
backend/    → Express API: blog CRUD, fayl yuklash, statistika, admin auth
frontend/   → React + Vite + Tailwind + Framer Motion sayt
```

## Tezkor ishga tushirish

Ikkita terminal oching:

**1-terminal — backend:**
```bash
cd backend
npm install
cp .env.example .env
npm run create-admin -- MeningKuchliParolim2026
# chiqqan ADMIN_PASSWORD_HASH qatorini .env ga qo'ying
npm run dev
```

**2-terminal — frontend:**
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Saytni oching: `http://localhost:5173`
Admin panel: `http://localhost:5173/admin` (login: `.env` dagi `ADMIN_USERNAME`, parol: yuqorida o'zingiz bergan parol)

## Nima qilingan

- ✅ To'liq ishlaydigan backend (Node/Express) — real fayl yuklash (rasm/video), JSON-fayl asosidagi ma'lumotlar bazasi, JWT bilan himoyalangan admin API
- ✅ Blog bo'limi — kategoriya, rasm/video, tavsif bilan post qo'shish/o'chirish
- ✅ Statistika bo'limi — o'quvchilar soni, DTM foizi, sertifikatlar, yillik grafik (hammasi admin paneldan tahrirlanadi)
- ✅ Premium dizayn — Playfair Display + Inter shrift, oltin/ko'k rang tizimi, Framer Motion animatsiyalari, shisha effektlar (glassmorphism), scroll-reveal
- ✅ Admin panel — login, statistika tahrirlash, post qo'shish/o'chirish

## Keyingi bosqich uchun takliflar (xohlasangiz qo'shib boramiz)

Quyidagilar katta hajmli alohida ishlar bo'lgani uchun hozircha kiritilmadi,
lekin mavjud kod ustiga bosqichma-bosqich qo'sha olamiz:

- Kinematik "intro" animatsiya (formulalar yig'ilib logotipga aylanishi)
- To'liq "AI Study Planner" (buning uchun haqiqiy AI API kaliti va backend logikasi kerak)
- Dark/Light mode almashtirgich
- Sichqoncha effektlari (magnetic buttons, custom cursor)
- Bepul demo-test tizimi va natija tahlili

Qaysi birini avval qo'shishni xohlasangiz, ayting — shu qismni chuqur ishlab beraman.

## Production uchun eslatmalar

- `backend/data/db.json` — production uchun PostgreSQL/MongoDB kabi haqiqiy
  DBga o'tkazish tavsiya etiladi (katta trafik holatida)
- Fayllarni serverda emas, S3/Cloudinary kabi bulutli xotirada saqlash
  tavsiya etiladi (agar sayt katta hajmda video qabul qilsa)
- `.env` fayllarini hech qachon ochiq repo (GitHub) ga yuklamang
