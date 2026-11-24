// Pairing code generated locally by the bot's own socket.
// The previous version sent numbers to a third-party server
// (knight-bot-paircode.onrender.com); that external dependency was removed.
const { sleep } = require('../lib/myfunc');
const { channelInfo } = require('../lib/messageConfig');

async function pairCommand(sock, chatId, message, q) {
    try {
        if (!q) {
            return await sock.sendMessage(chatId, {
                text: "من فضلك أرسل رقم واتساب صحيح | Please provide a valid WhatsApp number\nمثال | Example: .pair 2012XXXXXXXX",
                ...channelInfo
            });
        }

        const numbers = q.split(',')
            .map((v) => v.replace(/[^0-9]/g, ''))
            .filter((v) => v.length > 5 && v.length < 20);

        if (numbers.length === 0) {
            return await sock.sendMessage(chatId, {
                text: "رقم غير صالح ❌ استخدم الصيغة الصحيحة | Invalid number, use the correct format!",
                ...channelInfo
            });
        }

        for (const number of numbers) {
            const whatsappID = number + '@s.whatsapp.net';
            const result = await sock.onWhatsApp(whatsappID);

            if (!result[0]?.exists) {
                await sock.sendMessage(chatId, {
                    text: `هذا الرقم غير مسجل على واتساب ❗ | That number is not registered on WhatsApp`,
                    ...channelInfo
                });
                continue;
            }

            if (typeof sock.requestPairingCode !== 'function') {
                await sock.sendMessage(chatId, {
                    text: "توليد كود الاقتران غير متاح في هذه النسخة | Pairing code generation is not available in this build",
                    ...channelInfo
                });
                continue;
            }

            // requestPairingCode registers the CURRENT unregistered session: it
            // overwrites authState.creds.me and sends a companion_reg IQ. Calling it
            // from this already-linked bot would corrupt the live session, and a code
            // for another number cannot be minted from a registered socket. So on a
            // running bot .pair can only guide, never generate.
            if (sock.authState?.creds?.registered) {
                await sock.sendMessage(chatId, {
                    text: "لا يمكن توليد كود اقتران من بوت مربوط بالفعل 🔒\nلربط رقم جديد كبوت: أوقف البوت، خذ نسخة احتياطية من مجلد session أولًا، ثم امسحه وشغّل البوت من جديد وأدخل الرقم عند الطلب، وسيظهر كود الاقتران في الطرفية (الرقم الجديد سيحتاج موافقة ربط جديدة).\n\nA pairing code cannot be generated from an already-linked bot. To link a new number as the bot: stop it, back up the session folder first, then clear it, restart, enter the number when prompted, and the pairing code will print in the terminal (the new number will need a fresh link approval).",
                    ...channelInfo
                });
                continue;
            }

            try {
                let code = await sock.requestPairingCode(number);
                code = code?.match(/.{1,4}/g)?.join("-") || code;
                await sleep(1000);
                await sock.sendMessage(chatId, {
                    text: `كود الاقتران | Your pairing code: ${code}`,
                    ...channelInfo
                });
            } catch (apiError) {
                console.error('Pairing error:', apiError);
                await sock.sendMessage(chatId, {
                    text: "فشل توليد كود الاقتران، حاول مرة أخرى | Failed to generate pairing code. Please try again later.",
                    ...channelInfo
                });
            }
        }
    } catch (error) {
        console.error(error);
        await sock.sendMessage(chatId, {
            text: "حدث خطأ، حاول مرة أخرى | An error occurred. Please try again later.",
            ...channelInfo
        });
    }
}

module.exports = pairCommand;
