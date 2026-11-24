const { channelInfo } = require('../lib/messageConfig');
const settings = require("../settings");
async function aliveCommand(sock, chatId, message) {
    try {
        const message1 = `*🤖 ${settings.botName} شغال | Active*\n\n` +
                       `*الإصدار | Version:* ${settings.version}\n` +
                       `*الحالة | Status:* شغال | Online\n\n` +
                       `*🌟 المميزات | Features:*\n` +
                       `• إدارة الجروبات | Group Management\n` +
                       `• حماية من الروابط | Antilink Protection\n` +
                       `• تحميل وترفيه | Downloaders & Fun\n\n` +
                       `اكتب *.منيو* أو *.menu* لقائمة الأوامر | for full command list` +
                       (settings.channelLink ? `\n\n📢 ${settings.channelLink}` : '');

        await sock.sendMessage(chatId, {
            text: message1,
            ...channelInfo
        }, { quoted: message });
    } catch (error) {
        console.error('Error in alive command:', error);
        await sock.sendMessage(chatId, { text: 'البوت شغال | Bot is alive and running!' }, { quoted: message });
    }
}

module.exports = aliveCommand;
