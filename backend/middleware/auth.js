const jwt = require('jsonwebtoken');
const users = require('../data/users');

function requireAuth(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ message: 'Missing token' });
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = users.findById(payload.id);
    if (!user) return res.status(401).json({ message: 'Invalid user' });
    req.user = user;
    next();
  } catch (e) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}

function requireAdmin(req, res, next) {
  if (!req.user || req.user.role !== 'admin') return res.status(403).json({ message: 'Admin only' });
  next();
}

module.exports = { requireAuth, requireAdmin };

"RESTful API développé avec Node.js et le framework Express.js"
"Le passage à une vraie base de données MongoDB ou PostgreSQL serait transparent :"
"il suffirait de remplacer les fonctions dans mes fichiers data/ par des appels mongoose.find() ou db.query(), sans toucher aux contrôleurs ou aux routes."