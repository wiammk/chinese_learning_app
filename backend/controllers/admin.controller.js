const users = require('../data/users');
const lessons = require('../data/lessons');
const vocabulary = require('../data/vocabulary');
const quizzes = require('../data/quizzes');
const progress = require('../data/progress');

const sanitize = ({ password, ...rest }) => rest;

exports.listUsers = (_req, res) => res.json(users.list().map(sanitize));

exports.stats = (_req, res) => {
  const allProgress = progress.all();
  const totalQuizAttempts = Object.values(allProgress).reduce((s, p) => s + p.quizResults.length, 0);
  const avgScore = (() => {
    const all = Object.values(allProgress).flatMap((p) => p.quizResults.map((r) => r.score));
    if (!all.length) return 0;
    return Math.round(all.reduce((a, b) => a + b, 0) / all.length);
  })();
  res.json({
    totalUsers: users.list().length,
    totalLessons: lessons.list().length,
    totalVocabulary: vocabulary.list().length,
    totalQuizzes: quizzes.list().length,
    totalQuizAttempts,
    avgScore
  });
};
