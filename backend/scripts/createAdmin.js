// Ishlatish: npm run create-admin -- <parol>
// Masalan: npm run create-admin -- MeningKuchliParolim2026
// Skript bcrypt hash yaratadi - shu hashni .env faylidagi
// ADMIN_PASSWORD_HASH ga qo'ying.

const bcrypt = require("bcryptjs");

const password = process.argv[2];

if (!password) {
  console.log("Xato: parolni kiriting.");
  console.log("Masalan: npm run create-admin -- MeningKuchliParolim2026");
  process.exit(1);
}

const hash = bcrypt.hashSync(password, 10);
console.log("\nQuyidagi qatorni .env fayliga qo'ying:\n");
console.log(`ADMIN_PASSWORD_HASH=${hash}\n`);
