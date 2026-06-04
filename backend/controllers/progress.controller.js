const progress = require('../data/progress');
const lessons = require('../data/lessons');

exports.get = (req, res) => {
  const p = progress.get(req.user.id);
  const allLessons = lessons.list();
  const completed = p.completedLessons.length;
  const totalLessons = allLessons.length;
  const avgScore = p.quizResults.length
    ? Math.round(p.quizResults.reduce((s, r) => s + r.score, 0) / p.quizResults.length)
    : 0;
  const nextLesson = allLessons.find((l) => !p.completedLessons.includes(l.id)) || null;
  res.json({
    completedLessons: p.completedLessons,
    quizResults: p.quizResults,
    lastLessonId: p.lastLessonId,
    stats: {
      completed,
      totalLessons,
      progressPercent: totalLessons ? Math.round((completed / totalLessons) * 100) : 0,
      avgScore,
      level: req.user.level,
      nextLesson
    }
  });
};

exports.completeLesson = (req, res) => {
  const p = progress.completeLesson(req.user.id, req.params.lessonId);
  res.json(p);
};
