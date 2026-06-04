const router = require('express').Router();
const ctrl = require('../controllers/progress.controller');
const { requireAuth } = require('../middleware/auth');

router.get('/', requireAuth, ctrl.get);
router.post('/complete/:lessonId', requireAuth, ctrl.completeLesson);

module.exports = router;
