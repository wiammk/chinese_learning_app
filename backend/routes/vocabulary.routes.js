const router = require('express').Router();
const ctrl = require('../controllers/vocabulary.controller');
const { requireAuth, requireAdmin } = require('../middleware/auth');

router.get('/', ctrl.list);
router.get('/categories', ctrl.categories);
router.get('/:id', ctrl.get);
router.post('/', requireAuth, requireAdmin, ctrl.create);
router.put('/:id', requireAuth, requireAdmin, ctrl.update);
router.delete('/:id', requireAuth, requireAdmin, ctrl.remove);

module.exports = router;
