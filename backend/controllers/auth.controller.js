const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const users = require('../data/users');

const sanitize = ({ password, ...rest }) => rest;

const signToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES || '7d' });

exports.register = (req, res) => {
  const { name, email, password, language } = req.body || {};
  if (!name || !email || !password) return res.status(400).json({ message: 'Missing fields' });
  if (users.findByEmail(email)) return res.status(409).json({ message: 'Email already in use' });
  const user = users.add({
    id: 'u' + (users.list().length + 1),
    name,
    email,
    password: bcrypt.hashSync(password, 8),
    role: 'user',
    language: language || 'fr',
    level: 'beginner',
    createdAt: new Date().toISOString()
  });
  const token = signToken(user.id);
  res.status(201).json({ token, user: sanitize(user) });
};

exports.login = (req, res) => {
  const { email, password } = req.body || {};
  const user = users.findByEmail(email || '');
  if (!user || !bcrypt.compareSync(password || '', user.password)) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = signToken(user.id);
  res.json({ token, user: sanitize(user) });
};

exports.me = (req, res) => res.json({ user: sanitize(req.user) });

exports.updateProfile = (req, res) => {
  const { name, language, level } = req.body || {};
  const patch = {};
  if (name) patch.name = name;
  if (language) patch.language = language;
  if (level) patch.level = level;
  const updated = users.update(req.user.id, patch);
  res.json({ user: sanitize(updated) });
};

exports.logout = (_req, res) => res.json({ message: 'Logged out' });
