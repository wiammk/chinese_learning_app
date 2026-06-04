const router = require('express').Router();
const ctrl = require('../controllers/admin.controller');
const { requireAuth, requireAdmin } = require('../middleware/auth');

router.use(requireAuth, requireAdmin);
router.get('/users', ctrl.listUsers);
router.get('/stats', ctrl.stats);

module.exports = router;
