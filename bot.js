const { Telegraf, Markup } = require('telegraf');

// Masukkan token yang anda dapat dari BotFather
const bot = new Telegraf('SINI_MASUKKAN_TOKEN_BOT_ANDA');

const WEB_APP_URL = 'https://amalanku.vercel.app'; // URL Vercel anda

bot.start((ctx) => {
  ctx.reply(
    `Assalamu'alaikum ${ctx.from.first_name}! 👋\n\nSelamat datang ke amalanku. Platform Islam Digital anda.\n\nKlik butang di bawah untuk mula:`,
    Markup.inlineKeyboard([
      Markup.button.webApp('🚀 Lancarkan amalanku', WEB_APP_URL)
    ])
  );
});

bot.help((ctx) => ctx.reply('Sila tekan butang "Buka amalanku" di bahagian menu bawah.'));

// Menjalankan bot (Jika menggunakan server sendiri)
// bot.launch();

console.log('Bot sedang berjalan...');
