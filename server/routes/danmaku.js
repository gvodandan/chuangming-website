const router = require('koa-router')();
const danmaku_controller = require('../controllers/danmaku_controller');

router.prefix('/danmaku');

router.get('/', danmaku_controller.get);

router.post('/', danmaku_controller.add);

router.delete('/:id', danmaku_controller.delete);

module.exports = router;
