const router = require('koa-router')();
const userController = require('../controllers/users_controller');
const upload = require('../controllers/multers/users_multer.js');

router.prefix('/users');

router.post('/upload', upload.single('file'), userController.upload);

router.get('/', userController.getMembers);

router.post('/', userController.check);

router.put('/', userController.rewrite);

module.exports = router;