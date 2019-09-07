const router = require('koa-router')();
const index_controller = require('../controllers/index_controller');

router.get('/', index_controller.get);

module.exports = router;
