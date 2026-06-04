let quizzes = [
  {
    id: 'q1',
    lessonId: 'l1',
    title: { fr: 'Quiz: Salutations', en: 'Quiz: Greetings', ar: 'اختبار: التحيات' },
    type: 'multiple-choice',
    questions: [
      { id: 'q1-1', prompt: { fr: 'Que veut dire 你好 ?', en: 'What does 你好 mean?', ar: 'ماذا تعني 你好؟' }, options: ['Bonjour / Hello / مرحبا', 'Au revoir / Goodbye / وداعا', 'Merci / Thank you / شكرا', 'Désolé / Sorry / آسف'], answer: 0 },
      { id: 'q1-2', prompt: { fr: 'Comment dit-on "Merci" ?', en: 'How do you say "Thank you"?', ar: 'كيف نقول "شكرا"؟' }, options: ['你好', '谢谢', '再见', '对不起'], answer: 1 },
      { id: 'q1-3', prompt: { fr: 'Pinyin de 再见 ?', en: 'Pinyin of 再见 ?', ar: 'بينين 再见 ?' }, options: ['nǐ hǎo', 'xiè xiè', 'zài jiàn', 'duì bù qǐ'], answer: 2 }
    ]
  },
  {
    id: 'q2',
    lessonId: 'l2',
    title: { fr: 'Quiz: Famille', en: 'Quiz: Family', ar: 'اختبار: العائلة' },
    type: 'multiple-choice',
    questions: [
      { id: 'q2-1', prompt: { fr: '"Maman" en chinois ?', en: '"Mom" in Chinese?', ar: '"أمي" بالصينية؟' }, options: ['爸爸', '妈妈', '哥哥', '妹妹'], answer: 1 },
      { id: 'q2-2', prompt: { fr: 'Que veut dire 哥哥 ?', en: 'What does 哥哥 mean?', ar: 'ماذا تعني 哥哥؟' }, options: ['Petite soeur', 'Grand frère', 'Papa', 'Maman'], answer: 1 }
    ]
  },
  {
    id: 'q3',
    lessonId: 'l3',
    title: { fr: 'Quiz: Chiffres', en: 'Quiz: Numbers', ar: 'اختبار: الأرقام' },
    type: 'multiple-choice',
    questions: [
      { id: 'q3-1', prompt: { fr: '"Trois" en chinois ?', en: '"Three" in Chinese?', ar: '"ثلاثة" بالصينية؟' }, options: ['一', '二', '三', '四'], answer: 2 },
      { id: 'q3-2', prompt: { fr: 'Pinyin de 五 ?', en: 'Pinyin of 五 ?', ar: 'بينين 五 ?' }, options: ['sì', 'wǔ', 'sān', 'èr'], answer: 1 }
    ]
  }
];

let _id = quizzes.length;
const nextId = () => `q${++_id}`;

module.exports = {
  list: () => quizzes,
  findById: (id) => quizzes.find((q) => q.id === id),
  findByLesson: (lessonId) => quizzes.find((q) => q.lessonId === lessonId),
  add: (quiz) => { const created = { id: nextId(), ...quiz }; quizzes.push(created); return created; },
  update: (id, patch) => {
    const idx = quizzes.findIndex((q) => q.id === id);
    if (idx === -1) return null;
    quizzes[idx] = { ...quizzes[idx], ...patch };
    return quizzes[idx];
  },
  remove: (id) => { quizzes = quizzes.filter((q) => q.id !== id); }
};
