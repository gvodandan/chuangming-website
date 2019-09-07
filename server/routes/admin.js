const router = require('koa-router')();
const admin_controller = require('../controllers/admin_controller');

router.prefix('/admin/users');

router.get('/:id', admin_controller.getAll);

router.post('/', admin_controller.register);

router.delete('/:src_id&:des_id', admin_controller.delete);

router.put('/', admin_controller.edit);

module.exports = router;