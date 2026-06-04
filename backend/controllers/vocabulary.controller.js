const vocabulary = require('../data/vocabulary');

exports.list = (req, res) => {
  const { category, q } = req.query;
  res.json(vocabulary.filter({ category, q }));
};

exports.categories = (_req, res) => res.json(vocabulary.categories());

exports.get = (req, res) => {
  const word = vocabulary.findById(req.params.id);
  if (!word) return res.status(404).json({ message: 'Word not found' });
  res.json(word);
};

exports.create = (req, res) => res.status(201).json(vocabulary.add(req.body || {}));
exports.update = (req, res) => {
  const updated = vocabulary.update(req.params.id, req.body || {});
  if (!updated) return res.status(404).json({ message: 'Word not found' });
  res.json(updated);
};
exports.remove = (req, res) => { vocabulary.remove(req.params.id); res.json({ message: 'Deleted' }); };
