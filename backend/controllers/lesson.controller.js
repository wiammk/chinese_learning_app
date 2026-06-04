const lessons = require('../data/lessons');

exports.list = (req, res) => {
  const { level, category, q } = req.query;
  res.json(lessons.filter({ level, category, q }));
};

exports.get = (req, res) => {
  const lesson = lessons.findById(req.params.id);
  if (!lesson) return res.status(404).json({ message: 'Lesson not found' });
  res.json(lesson);
};

exports.create = (req, res) => res.status(201).json(lessons.add(req.body || {}));
exports.update = (req, res) => {
  const updated = lessons.update(req.params.id, req.body || {});
  if (!updated) return res.status(404).json({ message: 'Lesson not found' });
  res.json(updated);
};
exports.remove = (req, res) => { lessons.remove(req.params.id); res.json({ message: 'Deleted' }); };
