const quizzes = require('../data/quizzes');
const progress = require('../data/progress');

exports.list = (_req, res) => res.json(quizzes.list());

exports.get = (req, res) => {
  const quiz = quizzes.findById(req.params.id);
  if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
  res.json(quiz);
};

exports.getByLesson = (req, res) => {
  const quiz = quizzes.findByLesson(req.params.lessonId);
  if (!quiz) return res.status(404).json({ message: 'No quiz for this lesson' });
  res.json(quiz);
};

exports.submit = (req, res) => {
  const quiz = quizzes.findById(req.params.id);
  if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
  const { answers } = req.body || {};
  if (!Array.isArray(answers)) return res.status(400).json({ message: 'answers must be an array' });
  let correct = 0;
  const details = quiz.questions.map((q, i) => {
    const ok = answers[i] === q.answer;
    if (ok) correct++;
    return { questionId: q.id, correctAnswer: q.answer, given: answers[i], correct: ok };
  });
  const total = quiz.questions.length;
  const score = Math.round((correct / total) * 100);
  progress.recordQuiz(req.user.id, { quizId: quiz.id, score, total });
  res.json({ score, correct, total, details });
};

exports.create = (req, res) => res.status(201).json(quizzes.add(req.body || {}));
exports.update = (req, res) => {
  const updated = quizzes.update(req.params.id, req.body || {});
  if (!updated) return res.status(404).json({ message: 'Quiz not found' });
  res.json(updated);
};
exports.remove = (req, res) => { quizzes.remove(req.params.id); res.json({ message: 'Deleted' }); };
