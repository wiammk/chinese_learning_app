const router = require('express').Router();
const users = require('../data/users');
const { requireAuth } = require('../middleware/auth');

const sanitize = ({ password, ...rest }) => rest;

router.get('/me', requireAuth, (req, res) => res.json(sanitize(req.user)));

module.exports = router;
