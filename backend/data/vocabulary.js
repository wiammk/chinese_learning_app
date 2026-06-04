let vocabulary = [
  { id: 'v1', chinese: '你好', pinyin: 'nǐ hǎo', category: 'greetings', translation: { fr: 'Bonjour', en: 'Hello', ar: 'مرحبا' }, example: { chinese: '你好,朋友。', fr: 'Bonjour, mon ami.', en: 'Hello, friend.', ar: 'مرحبا يا صديقي.' } },
  { id: 'v2', chinese: '再见', pinyin: 'zài jiàn', category: 'greetings', translation: { fr: 'Au revoir', en: 'Goodbye', ar: 'مع السلامة' }, example: { chinese: '再见!', fr: 'Au revoir !', en: 'Goodbye!', ar: 'وداعا!' } },
  { id: 'v3', chinese: '谢谢', pinyin: 'xiè xiè', category: 'greetings', translation: { fr: 'Merci', en: 'Thank you', ar: 'شكرا' }, example: { chinese: '非常谢谢。', fr: 'Merci beaucoup.', en: 'Thank you very much.', ar: 'شكرا جزيلا.' } },
  { id: 'v4', chinese: '对不起', pinyin: 'duì bù qǐ', category: 'greetings', translation: { fr: 'Désolé', en: 'Sorry', ar: 'آسف' }, example: { chinese: '对不起,我迟到了。', fr: 'Désolé, je suis en retard.', en: 'Sorry, I am late.', ar: 'آسف، تأخرت.' } },
  { id: 'v5', chinese: '爸爸', pinyin: 'bà ba', category: 'family', translation: { fr: 'Papa', en: 'Dad', ar: 'أب' }, example: { chinese: '我爸爸是医生。', fr: 'Mon papa est médecin.', en: 'My dad is a doctor.', ar: 'أبي طبيب.' } },
  { id: 'v6', chinese: '妈妈', pinyin: 'mā ma', category: 'family', translation: { fr: 'Maman', en: 'Mom', ar: 'أم' }, example: { chinese: '妈妈做饭。', fr: 'Maman cuisine.', en: 'Mom cooks.', ar: 'أمي تطبخ.' } },
  { id: 'v7', chinese: '哥哥', pinyin: 'gē ge', category: 'family', translation: { fr: 'Grand frère', en: 'Older brother', ar: 'الأخ الأكبر' }, example: { chinese: '我哥哥。', fr: 'Mon grand frère.', en: 'My older brother.', ar: 'أخي الأكبر.' } },
  { id: 'v8', chinese: '米饭', pinyin: 'mǐ fàn', category: 'food', translation: { fr: 'Riz', en: 'Rice', ar: 'أرز' }, example: { chinese: '我吃米饭。', fr: 'Je mange du riz.', en: 'I eat rice.', ar: 'آكل الأرز.' } },
  { id: 'v9', chinese: '茶', pinyin: 'chá', category: 'food', translation: { fr: 'Thé', en: 'Tea', ar: 'شاي' }, example: { chinese: '中国茶。', fr: 'Thé chinois.', en: 'Chinese tea.', ar: 'شاي صيني.' } },
  { id: 'v10', chinese: '水', pinyin: 'shuǐ', category: 'food', translation: { fr: 'Eau', en: 'Water', ar: 'ماء' }, example: { chinese: '一杯水。', fr: 'Un verre d\'eau.', en: 'A glass of water.', ar: 'كوب ماء.' } },
  { id: 'v11', chinese: '飞机', pinyin: 'fēi jī', category: 'travel', translation: { fr: 'Avion', en: 'Airplane', ar: 'طائرة' }, example: { chinese: '坐飞机。', fr: 'Prendre l\'avion.', en: 'Take a plane.', ar: 'ركوب الطائرة.' } },
  { id: 'v12', chinese: '火车', pinyin: 'huǒ chē', category: 'travel', translation: { fr: 'Train', en: 'Train', ar: 'قطار' }, example: { chinese: '高速火车。', fr: 'Train rapide.', en: 'Fast train.', ar: 'قطار سريع.' } },
  { id: 'v13', chinese: '一', pinyin: 'yī', category: 'numbers', translation: { fr: 'Un', en: 'One', ar: 'واحد' }, example: { chinese: '一个。', fr: 'Un.', en: 'One.', ar: 'واحد.' } },
  { id: 'v14', chinese: '二', pinyin: 'èr', category: 'numbers', translation: { fr: 'Deux', en: 'Two', ar: 'اثنان' }, example: { chinese: '二个人。', fr: 'Deux personnes.', en: 'Two people.', ar: 'شخصان.' } },
  { id: 'v15', chinese: '三', pinyin: 'sān', category: 'numbers', translation: { fr: 'Trois', en: 'Three', ar: 'ثلاثة' }, example: { chinese: '三本书。', fr: 'Trois livres.', en: 'Three books.', ar: 'ثلاثة كتب.' } },
  { id: 'v16', chinese: '今天', pinyin: 'jīn tiān', category: 'time', translation: { fr: 'Aujourd\'hui', en: 'Today', ar: 'اليوم' }, example: { chinese: '今天星期一。', fr: 'Aujourd\'hui c\'est lundi.', en: 'Today is Monday.', ar: 'اليوم الإثنين.' } },
  { id: 'v17', chinese: '明天', pinyin: 'míng tiān', category: 'time', translation: { fr: 'Demain', en: 'Tomorrow', ar: 'غدا' }, example: { chinese: '明天见。', fr: 'A demain.', en: 'See you tomorrow.', ar: 'إلى الغد.' } },
  { id: 'v18', chinese: '昨天', pinyin: 'zuó tiān', category: 'time', translation: { fr: 'Hier', en: 'Yesterday', ar: 'أمس' }, example: { chinese: '昨天下雨。', fr: 'Hier il a plu.', en: 'It rained yesterday.', ar: 'أمطرت أمس.' } }
];

let _id = vocabulary.length;
const nextId = () => `v${++_id}`;

module.exports = {
  list: () => vocabulary,
  categories: () => [...new Set(vocabulary.map((v) => v.category))],
  findById: (id) => vocabulary.find((v) => v.id === id),
  filter: ({ category, q }) => vocabulary.filter((v) => {
    if (category && v.category !== category) return false;
    if (q) {
      const needle = q.toLowerCase();
      const hay = (v.chinese + v.pinyin + JSON.stringify(v.translation)).toLowerCase();
      if (!hay.includes(needle)) return false;
    }
    return true;
  }),
  add: (item) => {
    const created = { id: nextId(), ...item };
    vocabulary.push(created);
    return created;
  },
  update: (id, patch) => {
    const idx = vocabulary.findIndex((v) => v.id === id);
    if (idx === -1) return null;
    vocabulary[idx] = { ...vocabulary[idx], ...patch };
    return vocabulary[idx];
  },
  remove: (id) => { vocabulary = vocabulary.filter((v) => v.id !== id); }
};
