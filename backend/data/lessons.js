let lessons = [
  {
    id: 'l1',
    level: 'beginner',
    order: 1,
    title: { fr: 'Les salutations', en: 'Greetings', ar: 'التحيات' },
    description: {
      fr: 'Apprenez les salutations chinoises de base',
      en: 'Learn basic Chinese greetings',
      ar: 'تعلم التحيات الصينية الأساسية'
    },
    category: 'greetings',
    words: [
      {
        chinese: '你好',
        pinyin: 'nǐ hǎo',
        translation: { fr: 'Bonjour', en: 'Hello', ar: 'مرحبا' },
        example: { chinese: '你好,我是李明。', pinyin: 'nǐ hǎo, wǒ shì lǐ míng.', fr: 'Bonjour, je suis Li Ming.', en: 'Hello, I am Li Ming.', ar: 'مرحبا، أنا لي مينغ.' },
        audio: 'https://upload.wikimedia.org/wikipedia/commons/2/29/Zh-n%C7%90h%C7%8Eo.ogg'
      },
      {
        chinese: '再见',
        pinyin: 'zài jiàn',
        translation: { fr: 'Au revoir', en: 'Goodbye', ar: 'مع السلامة' },
        example: { chinese: '再见,明天见。', pinyin: 'zài jiàn, míng tiān jiàn.', fr: 'Au revoir, à demain.', en: 'Goodbye, see you tomorrow.', ar: 'مع السلامة، إلى الغد.' },
        audio: ''
      },
      {
        chinese: '谢谢',
        pinyin: 'xiè xiè',
        translation: { fr: 'Merci', en: 'Thank you', ar: 'شكرا' },
        example: { chinese: '谢谢你的帮助。', pinyin: 'xiè xiè nǐ de bāng zhù.', fr: 'Merci pour ton aide.', en: 'Thank you for your help.', ar: 'شكرا لمساعدتك.' },
        audio: ''
      }
    ],
    createdAt: '2026-01-15T10:00:00Z'
  },
  {
    id: 'l2',
    level: 'beginner',
    order: 2,
    title: { fr: 'La famille', en: 'Family', ar: 'العائلة' },
    description: {
      fr: 'Les membres de la famille en chinois',
      en: 'Family members in Chinese',
      ar: 'أفراد العائلة بالصينية'
    },
    category: 'family',
    words: [
      { chinese: '爸爸', pinyin: 'bà ba', translation: { fr: 'Papa', en: 'Dad', ar: 'أبي' }, example: { chinese: '我爱爸爸。', pinyin: 'wǒ ài bà ba.', fr: 'J\'aime mon papa.', en: 'I love my dad.', ar: 'أحب أبي.' }, audio: '' },
      { chinese: '妈妈', pinyin: 'mā ma', translation: { fr: 'Maman', en: 'Mom', ar: 'أمي' }, example: { chinese: '妈妈很漂亮。', pinyin: 'mā ma hěn piào liang.', fr: 'Maman est belle.', en: 'Mom is beautiful.', ar: 'أمي جميلة.' }, audio: '' },
      { chinese: '哥哥', pinyin: 'gē ge', translation: { fr: 'Grand frère', en: 'Older brother', ar: 'الأخ الأكبر' }, example: { chinese: '我哥哥很高。', pinyin: 'wǒ gē ge hěn gāo.', fr: 'Mon grand frère est grand.', en: 'My older brother is tall.', ar: 'أخي الأكبر طويل.' }, audio: '' },
      { chinese: '妹妹', pinyin: 'mèi mei', translation: { fr: 'Petite soeur', en: 'Younger sister', ar: 'الأخت الصغرى' }, example: { chinese: '妹妹喜欢猫。', pinyin: 'mèi mei xǐ huan māo.', fr: 'Ma petite soeur aime les chats.', en: 'My little sister likes cats.', ar: 'أختي الصغرى تحب القطط.' }, audio: '' }
    ],
    createdAt: '2026-01-16T10:00:00Z'
  },
  {
    id: 'l3',
    level: 'beginner',
    order: 3,
    title: { fr: 'Les chiffres', en: 'Numbers', ar: 'الأرقام' },
    description: { fr: 'Les chiffres de 1 à 10', en: 'Numbers 1 to 10', ar: 'الأرقام من 1 إلى 10' },
    category: 'numbers',
    words: [
      { chinese: '一', pinyin: 'yī', translation: { fr: 'Un', en: 'One', ar: 'واحد' }, example: { chinese: '一个人。', pinyin: 'yī gè rén.', fr: 'Une personne.', en: 'One person.', ar: 'شخص واحد.' }, audio: '' },
      { chinese: '二', pinyin: 'èr', translation: { fr: 'Deux', en: 'Two', ar: 'اثنان' }, example: { chinese: '二本书。', pinyin: 'èr běn shū.', fr: 'Deux livres.', en: 'Two books.', ar: 'كتابان.' }, audio: '' },
      { chinese: '三', pinyin: 'sān', translation: { fr: 'Trois', en: 'Three', ar: 'ثلاثة' }, example: { chinese: '三只猫。', pinyin: 'sān zhī māo.', fr: 'Trois chats.', en: 'Three cats.', ar: 'ثلاث قطط.' }, audio: '' },
      { chinese: '四', pinyin: 'sì', translation: { fr: 'Quatre', en: 'Four', ar: 'أربعة' }, example: { chinese: '四季。', pinyin: 'sì jì.', fr: 'Les quatre saisons.', en: 'Four seasons.', ar: 'الفصول الأربعة.' }, audio: '' },
      { chinese: '五', pinyin: 'wǔ', translation: { fr: 'Cinq', en: 'Five', ar: 'خمسة' }, example: { chinese: '五个朋友。', pinyin: 'wǔ gè péng yǒu.', fr: 'Cinq amis.', en: 'Five friends.', ar: 'خمسة أصدقاء.' }, audio: '' }
    ],
    createdAt: '2026-01-17T10:00:00Z'
  },
  {
    id: 'l4',
    level: 'intermediate',
    order: 1,
    title: { fr: 'La nourriture', en: 'Food', ar: 'الطعام' },
    description: { fr: 'Vocabulaire culinaire', en: 'Food vocabulary', ar: 'مفردات الطعام' },
    category: 'food',
    words: [
      { chinese: '米饭', pinyin: 'mǐ fàn', translation: { fr: 'Riz', en: 'Rice', ar: 'أرز' }, example: { chinese: '我喜欢吃米饭。', pinyin: 'wǒ xǐ huan chī mǐ fàn.', fr: 'J\'aime manger du riz.', en: 'I like to eat rice.', ar: 'أحب أكل الأرز.' }, audio: '' },
      { chinese: '面条', pinyin: 'miàn tiáo', translation: { fr: 'Nouilles', en: 'Noodles', ar: 'معكرونة' }, example: { chinese: '中国面条很好吃。', pinyin: 'zhōng guó miàn tiáo hěn hǎo chī.', fr: 'Les nouilles chinoises sont délicieuses.', en: 'Chinese noodles are delicious.', ar: 'المعكرونة الصينية لذيذة.' }, audio: '' },
      { chinese: '茶', pinyin: 'chá', translation: { fr: 'Thé', en: 'Tea', ar: 'شاي' }, example: { chinese: '请喝茶。', pinyin: 'qǐng hē chá.', fr: 'Buvez du thé s\'il vous plaît.', en: 'Please have some tea.', ar: 'من فضلك اشرب الشاي.' }, audio: '' }
    ],
    createdAt: '2026-02-10T10:00:00Z'
  },
  {
    id: 'l5',
    level: 'intermediate',
    order: 2,
    title: { fr: 'Le voyage', en: 'Travel', ar: 'السفر' },
    description: { fr: 'Expressions de voyage', en: 'Travel expressions', ar: 'تعابير السفر' },
    category: 'travel',
    words: [
      { chinese: '飞机', pinyin: 'fēi jī', translation: { fr: 'Avion', en: 'Airplane', ar: 'طائرة' }, example: { chinese: '飞机很快。', pinyin: 'fēi jī hěn kuài.', fr: 'L\'avion est rapide.', en: 'The plane is fast.', ar: 'الطائرة سريعة.' }, audio: '' },
      { chinese: '火车', pinyin: 'huǒ chē', translation: { fr: 'Train', en: 'Train', ar: 'قطار' }, example: { chinese: '我坐火车去北京。', pinyin: 'wǒ zuò huǒ chē qù běi jīng.', fr: 'Je prends le train pour Pékin.', en: 'I take the train to Beijing.', ar: 'أخذ القطار إلى بكين.' }, audio: '' },
      { chinese: '酒店', pinyin: 'jiǔ diàn', translation: { fr: 'Hôtel', en: 'Hotel', ar: 'فندق' }, example: { chinese: '酒店在哪里?', pinyin: 'jiǔ diàn zài nǎ lǐ?', fr: 'Où est l\'hôtel ?', en: 'Where is the hotel?', ar: 'أين الفندق؟' }, audio: '' }
    ],
    createdAt: '2026-02-11T10:00:00Z'
  },
  {
    id: 'l6',
    level: 'advanced',
    order: 1,
    title: { fr: 'Le temps et la météo', en: 'Time & Weather', ar: 'الوقت والطقس' },
    description: { fr: 'Parler du temps qu\'il fait', en: 'Talk about the weather', ar: 'الحديث عن الطقس' },
    category: 'time',
    words: [
      { chinese: '今天', pinyin: 'jīn tiān', translation: { fr: 'Aujourd\'hui', en: 'Today', ar: 'اليوم' }, example: { chinese: '今天天气很好。', pinyin: 'jīn tiān tiān qì hěn hǎo.', fr: 'Il fait beau aujourd\'hui.', en: 'The weather is nice today.', ar: 'الطقس جميل اليوم.' }, audio: '' },
      { chinese: '明天', pinyin: 'míng tiān', translation: { fr: 'Demain', en: 'Tomorrow', ar: 'غدا' }, example: { chinese: '明天会下雨。', pinyin: 'míng tiān huì xià yǔ.', fr: 'Il pleuvra demain.', en: 'It will rain tomorrow.', ar: 'ستمطر غدا.' }, audio: '' },
      { chinese: '下雪', pinyin: 'xià xuě', translation: { fr: 'Neiger', en: 'To snow', ar: 'تثلج' }, example: { chinese: '冬天下雪。', pinyin: 'dōng tiān xià xuě.', fr: 'Il neige en hiver.', en: 'It snows in winter.', ar: 'تثلج في الشتاء.' }, audio: '' }
    ],
    createdAt: '2026-03-01T10:00:00Z'
  }
];

let _id = lessons.length;
const nextId = () => `l${++_id}`;

module.exports = {
  list: () => lessons,
  findById: (id) => lessons.find((l) => l.id === id),
  filter: ({ level, category, q }) => lessons.filter((l) => {
    if (level && l.level !== level) return false;
    if (category && l.category !== category) return false;
    if (q) {
      const needle = q.toLowerCase();
      const hay = JSON.stringify(l).toLowerCase();
      if (!hay.includes(needle)) return false;
    }
    return true;
  }),
  add: (lesson) => {
    const newLesson = { id: nextId(), createdAt: new Date().toISOString(), ...lesson };
    lessons.push(newLesson);
    return newLesson;
  },
  update: (id, patch) => {
    const idx = lessons.findIndex((l) => l.id === id);
    if (idx === -1) return null;
    lessons[idx] = { ...lessons[idx], ...patch };
    return lessons[idx];
  },
  remove: (id) => { lessons = lessons.filter((l) => l.id !== id); }
};
