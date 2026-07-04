// Telegram Bot orqali ustozga darhol xabar yuborish.
// Ishlashi uchun .env faylida TELEGRAM_BOT_TOKEN va TELEGRAM_CHAT_ID
// to'ldirilgan bo'lishi kerak. Agar bo'lmasa, jim tarzda o'tkazib yuboriladi
// (frontend hech qanday xato ko'rmaydi, lead baribir bazaga saqlanadi).

async function notifyTelegram(lead) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) return; // sozlanmagan - jim o'tkazib yuboramiz

  const text =
    `🆕 Yangi ariza!\n\n` +
    `👤 Ism: ${lead.name}\n` +
    `📞 Telefon: ${lead.phone}\n` +
    `🕒 Vaqt: ${new Date(lead.createdAt).toLocaleString("uz-UZ")}`;

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text }),
    });
    if (!res.ok) {
      const err = await res.text();
      console.error("Telegram xabari yuborilmadi:", err);
    }
  } catch (err) {
    console.error("Telegram bilan bog'lanishda xato:", err.message);
  }
}

module.exports = { notifyTelegram };
