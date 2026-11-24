// Arabic command aliases: lets every command be used in Arabic or English.
// Example: .تشغيل عمرو دياب  ==  .play عمرو دياب
// The first token of a dot-command is mapped to the English command; the rest is untouched.

const aliases = {
  // عام | General
  'منيو': 'menu', 'الاوامر': 'menu', 'القائمة': 'menu', 'مساعده': 'help',
  'بنج': 'ping', 'شغال': 'alive', 'نطق': 'tts', 'المالك': 'owner',
  'نكته': 'joke', 'اقتباس': 'quote', 'معلومه': 'fact', 'طقس': 'weather',
  'اخبار': 'news', 'كلمات': 'lyrics', 'الجروب': 'groupinfo', 'المشرفين': 'staff',
  'ترجمه': 'trt', 'تصوير': 'ss', 'باركود': 'qr', 'بريد': 'tempmail',
  // ادمن | Admin
  'حظر': 'ban', 'فك-الحظر': 'unban', 'ترقيه': 'promote', 'تنزيل': 'demote',
  'كتم': 'mute', 'الغاء-الكتم': 'unmute', 'امسح': 'delete', 'طرد': 'kick',
  'تحذيرات': 'warnings', 'تحذير': 'warn', 'مضاد-الروابط': 'antilink',
  'مضاد-السب': 'antibadword', 'منشن': 'tag', 'الكل': 'tagall',
  'رد-تلقائي': 'chatbot', 'رابط-جديد': 'resetlink', 'ترحيب': 'welcome',
  'وداع': 'goodbye', 'تذكير': 'reminder',
  // مالك | Owner
  'وضع': 'mode', 'ستوري-تلقائي': 'autostatus', 'مسح-الجلسه': 'clearsession',
  'مضاد-الحذف': 'antidelete', 'صوره-البوت': 'setpp',
  // ملصقات وصور | Stickers & images
  'ملصق': 'sticker', 'صوره': 'simage', 'بلور': 'blur', 'ايموجي': 'emojimix',
  // العاب | Games
  'اكس-او': 'tictactoe', 'خمن': 'guess', 'اسئله': 'trivia', 'اجابه': 'answer',
  'صراحه': 'truth', 'تحدي': 'dare',
  // ذكاء اصطناعي | AI
  'ذكاء': 'gpt', 'اسال': 'ask', 'تخيل': 'imagine',
  // بحث | Search
  'جوجل': 'google', 'تطبيق': 'apk', 'متجر': 'playstore',
  // ترفيه | Fun
  'مجامله': 'compliment', 'مغازله': 'flirt', 'شخصيه': 'character',
  'تصبح-على-خير': 'goodnight', 'توافق': 'ship',
  // تحميل | Downloader
  'تشغيل': 'play', 'شغل': 'play', 'اغنيه': 'play', 'انستا': 'instagram',
  'فيسبوك': 'facebook', 'تيكتوك': 'tiktok', 'فيديو': 'video', 'صوت': 'ytmp3',
  // جيت هب | GitHub
  'جيت': 'github', 'سورس': 'repo',
  // اقتران | Pairing
  'ربط': 'pair', 'اقتران': 'pair',
  'ميم': 'meme', 'اهانه': 'insult', 'منافق': 'simp', 'غبي': 'stupid',
  'الاكثر-تفاعلا': 'topmembers', 'عرض-مره': 'vv', 'نص-متحرك': 'attp',
  'استسلام': 'surrender', 'حركه': 'move', 'معرف': 'jid', 'بروكسي': 'proxy',
  'ملصق-تليجرام': 'tgsticker', 'شعر': 'shayari', 'توقع': '8ball',
  'تفاعل-تلقائي': 'autoreact', 'محروق': 'waste', 'مسح-المحادثه': 'clear',
  'موسيقي': 'music', 'حبل-المشنقه': 'hangman', 'خذ': 'take',
  'يوم-الورد': 'roseday', 'مسح-المؤقت': 'cleartmp', 'ريأكت': 'areact',
  // ذكاء اصطناعي إضافي | More AI
  'جروك': 'grok', 'جيميني': 'gemini', 'فلكس': 'flux', 'دالي': 'dalle',
  // خطوط TextMaker | TextMaker fonts
  'معدني': 'metallic', 'ثلج': 'snow', 'جليد': 'ice', 'مبهر': 'impressive',
  'مصفوفه': 'matrix', 'ضوء': 'light', 'نيون': 'neon', 'شيطان': 'devil',
  'ارجواني': 'purple', 'عاصفه': 'thunder', 'اوراق': 'leaves',
  'ارينا': 'arena', 'هاكر': 'hacker', 'رملي': 'sand', 'نار': 'fire',
  'خلل': 'glitch', 'بلاك-بينك': 'blackpink',
};

// Normalize Arabic letter variants so ا/أ/إ/آ and ة/ه and ى/ي all match.
function normalizeArabic(token) {
  return token
    .replace(/[أإآ]/g, 'ا')
    .replace(/ة/g, 'ه')
    .replace(/ى/g, 'ي');
}

const normalizedAliases = {};
for (const [ar, en] of Object.entries(aliases)) {
  normalizedAliases[normalizeArabic(ar)] = en;
}

// If the message is a dot-command with an Arabic first token, return it
// rewritten with the English command; otherwise return it unchanged.
function applyArabicAlias(userMessage) {
  if (!userMessage || !userMessage.startsWith('.')) return userMessage;
  const spaceIdx = userMessage.indexOf(' ');
  const first = spaceIdx === -1 ? userMessage.slice(1) : userMessage.slice(1, spaceIdx);
  const rest = spaceIdx === -1 ? '' : userMessage.slice(spaceIdx);
  const mapped = normalizedAliases[normalizeArabic(first)];
  if (!mapped) return userMessage;
  return '.' + mapped + rest;
}

module.exports = { applyArabicAlias, aliases };
