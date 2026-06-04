// In-memory progress store: { userId: { completedLessons: [...], quizResults: [...], lastLessonId } }
const store = {
  u2: {
    completedLessons: ['l1'],
    quizResults: [{ quizId: 'q1', score: 67, total: 3, takenAt: '2026-05-10T10:00:00Z' }],
    lastLessonId: 'l2'
  },
  u3: {
    completedLessons: ['l1', 'l2', 'l3'],
    quizResults: [
      { quizId: 'q1', score: 100, total: 3, takenAt: '2026-04-12T09:00:00Z' },
      { quizId: 'q2', score: 100, total: 2, takenAt: '2026-04-18T09:00:00Z' },
      { quizId: 'q3', score: 50, total: 2, takenAt: '2026-05-01T11:30:00Z' }
    ],
    lastLessonId: 'l4'
  },
  u4: { completedLessons: [], quizResults: [], lastLessonId: null }
};

const ensure = (userId) => {
  if (!store[userId]) store[userId] = { completedLessons: [], quizResults: [], lastLessonId: null };
  return store[userId];
};

module.exports = {
  get: (userId) => ensure(userId),
  completeLesson: (userId, lessonId) => {
    const p = ensure(userId);
    if (!p.completedLessons.includes(lessonId)) p.completedLessons.push(lessonId);
    p.lastLessonId = lessonId;
    return p;
  },
  recordQuiz: (userId, result) => {
    const p = ensure(userId);
    p.quizResults.push({ ...result, takenAt: new Date().toISOString() });
    return p;
  },
  all: () => store
};
