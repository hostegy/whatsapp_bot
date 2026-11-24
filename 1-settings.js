try { require('dotenv').config(); } catch (e) { /* dotenv optional: env may come from the host */ }

// Original project: Knight Bot / wambugu71 (MIT). Credits preserved in README and index.js.
// MK Digital customization: every brand/owner/channel value is overridable via environment.
const settings = {
  packname: process.env.PACK_NAME || 'MK Digital',
  author: process.env.BOT_AUTHOR || 'المهندس محمد كمال',
  botName: process.env.BOT_NAME || 'MK Digital Bot',
  botOwner: process.env.BOT_OWNER_NAME || 'المهندس محمد كمال',
  // Owner WhatsApp number: digits only, country code, no + (e.g. 2012XXXXXXX). REQUIRED before using owner commands.
  ownerNumber: (process.env.OWNER_NUMBER || '201288363677').replace(/[^0-9]/g, ''),
  // Owner's own WhatsApp Channel. Set CHANNEL_JID directly (120363...@newsletter)
  // or CHANNEL_INVITE_CODE from the channel link https://whatsapp.com/channel/<code> (resolved at startup).
  channelJid: process.env.CHANNEL_JID || '',
  channelName: process.env.CHANNEL_NAME || 'المهندس محمد كمال للصيانة الحاسب الالي',
  channelInviteCode: process.env.CHANNEL_INVITE_CODE || '0029Vb8srPhDZ4Lj58x0mP2k',
  channelLink: process.env.CHANNEL_LINK || 'https://whatsapp.com/channel/0029Vb8srPhDZ4Lj58x0mP2k',
  // Follow the owner's own channel once the bot connects (user-requested).
  // Set AUTO_FOLLOW_CHANNEL=false to disable.
  autoFollowChannel: (process.env.AUTO_FOLLOW_CHANNEL || 'true') !== 'false',
  giphyApiKey: process.env.GIPHY_API_KEY || '',
  // Optional: only needed for the Telegram-sticker import command.
  telegramBotToken: process.env.TELEGRAM_BOT_TOKEN || '',
  commandMode: "public",
  description: "MK Digital WhatsApp bot for group management and utilities.",
  version: "3.0.0",
};

module.exports = settings;
