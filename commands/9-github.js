const moment = require('moment-timezone');
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
const settings = require('../settings');

async function githubCommand(sock, chatId, message) {
  try {
    const res = await fetch('https://api.github.com/repos/hostegy/whatsapp_bot');
    if (!res.ok) throw new Error('Error fetching repository data');
    const json = await res.json();

    let txt = `*乂  ${settings.botName}  乂*

`;
    txt += `✩  *الاسم | Name* : ${json.name}
`;
    txt += `✩  *المشاهدون | Watchers* : ${json.watchers_count}
`;
    txt += `✩  *الحجم | Size* : ${(json.size / 1024).toFixed(2)} MB
`;
    txt += `✩  *آخر تحديث | Updated* : ${moment(json.updated_at).format('DD/MM/YY - HH:mm:ss')}
`;
    txt += `✩  *الرابط | URL* : ${json.html_url}
`;
    txt += `✩  *Forks* : ${json.forks_count}
`;
    txt += `✩  *Stars* : ${json.stargazers_count}

`;
    txt += `💥 *${settings.botName}*`;
    if (settings.channelLink) txt += `
📢 ${settings.channelLink}`;

    const imgPath = path.join(__dirname, '../assets/bot_image.jpg');
    const imgBuffer = fs.readFileSync(imgPath);

    await sock.sendMessage(chatId, { image: imgBuffer, caption: txt }, { quoted: message });
  } catch (error) {
    await sock.sendMessage(chatId, { text: '❌ خطأ في جلب بيانات المستودع | Error fetching repository information.' }, { quoted: message });
  }
}

module.exports = githubCommand;
