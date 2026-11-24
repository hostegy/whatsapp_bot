const settings = require('../settings');

async function helpCommand(sock, chatId, message) {
    const helpMessage = `
*🤖 ${settings.botName}*
${settings.botOwner}

*الأوامر بالعربي والإنجليزي | Arabic & English commands*

🌐 *عام | General*
➤ .منيو | .menu
➤ .بنج | .ping
➤ .شغال | .alive
➤ .نطق | .tts
➤ .المالك | .owner
➤ .نكتة | .joke
➤ .اقتباس | .quote
➤ .معلومة | .fact
➤ .طقس | .weather
➤ .اخبار | .news
➤ .كلمات | .lyrics
➤ .الجروب | .groupinfo
➤ .المشرفين | .staff
➤ .ترجمة | .trt
➤ .تصوير | .ss
➤ .باركود | .qr
➤ .بريد | .tempmail

👮‍♂️ *إدارة الجروب | Admin*
➤ .حظر | .ban
➤ .فك-الحظر | .unban
➤ .ترقية | .promote
➤ .تنزيل | .demote
➤ .كتم | .mute
➤ .الغاء-الكتم | .unmute
➤ .امسح | .delete
➤ .طرد | .kick
➤ .تحذير | .warn
➤ .تحذيرات | .warnings
➤ .مضاد-الروابط | .antilink
➤ .مضاد-السب | .antibadword
➤ .منشن | .tag
➤ .الكل | .tagall
➤ .رد-تلقائي | .chatbot
➤ .رابط-جديد | .resetlink
➤ .ترحيب | .welcome
➤ .وداع | .goodbye
➤ .تذكير | .reminder

🔒 *المالك | Owner*
➤ .وضع | .mode
➤ .ستوري-تلقائي | .autostatus
➤ .مسح-الجلسة | .clearsession
➤ .مضاد-الحذف | .antidelete
➤ .صورة-البوت | .setpp
➤ .مسح-المؤقت | .cleartmp
➤ .تفاعل-تلقائي | .autoreact

🎨 *ملصقات وصور | Stickers & Images*
➤ .ملصق | .sticker
➤ .صورة | .simage
➤ .بلور | .blur
➤ .ايموجي | .emojimix
➤ .خذ | .take
➤ .ملصق-تليجرام | .tgsticker

🎮 *ألعاب | Games*
➤ .اكس-او | .tictactoe
➤ .خمن | .guess
➤ .اسئلة | .trivia
➤ .اجابة | .answer
➤ .صراحة | .truth
➤ .تحدي | .dare
➤ .حبل-المشنقة | .hangman

🤖 *ذكاء اصطناعي | AI*
➤ .ذكاء | .gpt
➤ .اسأل | .ask
➤ .تخيل | .imagine
➤ .جروك | .grok
➤ .جيميني | .gemini
➤ .فلكس | .flux

🔍 *بحث | Search*
➤ .جوجل | .google
➤ .تطبيق | .apk
➤ .متجر | .playstore

🎯 *ترفيه | Fun*
➤ .مجاملة | .compliment
➤ .مغازلة | .flirt
➤ .شخصية | .character
➤ .توافق | .ship
➤ .تصبح-على-خير | .goodnight
➤ .اهانة | .insult
➤ .يوم-الورد | .roseday
➤ .محروق | .wasted
➤ .منافق | .simp
➤ .غبي | .stupid
➤ .ميم | .meme
➤ .توقع | .8ball
➤ .نص-متحرك | .attp

📥 *تحميل | Downloader*
➤ .تشغيل | .play
➤ .صوت | .ytmp3
➤ .فيديو | .video
➤ .انستا | .instagram
➤ .فيسبوك | .facebook
➤ .تيكتوك | .tiktok

✍️ *خطوط | Text Styles*
➤ .نيون | .neon
➤ .نار | .fire
➤ .ثلج | .snow
➤ .معدني | .metallic
➤ .خلل | .glitch
➤ .هاكر | .hacker

🔗 *ربط ومعلومات | Pairing & Info*
➤ .ربط | .pair
➤ .جيت | .github
➤ .سورس | .repo
➤ .convert

${settings.channelLink ? '📢 ' + settings.channelLink : ''}`.trim();

    try {
        await sock.sendMessage(chatId, { text: helpMessage });
    } catch (error) {
        console.error('Error in help command:', error);
        await sock.sendMessage(chatId, { text: helpMessage });
    }
}

module.exports = helpCommand;
