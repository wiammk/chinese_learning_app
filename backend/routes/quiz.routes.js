const router = require('express').Router();
const ctrl = require('../controllers/quiz.controller');
const { requireAuth, requireAdmin } = require('../middleware/auth');

router.get('/', ctrl.list);
router.get('/by-lesson/:lessonId', ctrl.getByLesson);
router.get('/:id', ctrl.get);
router.post('/:id/submit', requireAuth, ctrl.submit);
router.post('/', requireAuth, requireAdmin, ctrl.create);
router.put('/:id', requireAuth, requireAdmin, ctrl.update);
router.delete('/:id', requireAuth, requireAdmin, ctrl.remove);

module.exports = router;
