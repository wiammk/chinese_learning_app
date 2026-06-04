// Mock users — passwords are bcrypt hashes of "password123"
const bcrypt = require('bcryptjs');
const hash = bcrypt.hashSync('password123', 8);

let users = [
  {
    id: 'u1',
    name: 'Admin User',
    email: 'admin@chinese.app',
    password: hash,
    role: 'admin',
    language: 'fr',
    level: 'advanced',
    createdAt: '2026-01-10T10:00:00Z'
  },
  {
    id: 'u2',
    name: 'Khalil Mellouk',
    email: 'khalil@chinese.app',
    password: hash,
    role: 'user',
    language: 'fr',
    level: 'beginner',
    createdAt: '2026-02-15T09:30:00Z'
  },
  {
    id: 'u3',
    name: 'Sara Ahmed',
    email: 'sara@chinese.app',
    password: hash,
    role: 'user',
    language: 'ar',
    level: 'intermediate',
    createdAt: '2026-03-21T14:15:00Z'
  },
  {
    id: 'u4',
    name: 'John Smith',
    email: 'john@chinese.app',
    password: hash,
    role: 'user',
    language: 'en',
    level: 'beginner',
    createdAt: '2026-04-02T11:00:00Z'
  }
];

module.exports = {
  list: () => users,
  findById: (id) => users.find((u) => u.id === id),
  findByEmail: (email) => users.find((u) => u.email.toLowerCase() === email.toLowerCase()),
  add: (user) => { users.push(user); return user; },
  update: (id, patch) => {
    const idx = users.findIndex((u) => u.id === id);
    if (idx === -1) return null;
    users[idx] = { ...users[idx], ...patch };
    return users[idx];
  },
  remove: (id) => { users = users.filter((u) => u.id !== id); }
};
