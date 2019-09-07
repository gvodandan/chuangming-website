const router = require('koa-router')();
const news_controller = require('../controllers/news_controller');
const upload = require('../controllers/multers/news_multer.js');

router.prefix('/news');

router.post('/upload', upload.single('image'), news_controller.upload);

router.get('/', news_controller.get);

router.post('/', news_controller.add);

router.delete('/:id', news_controller.delete);

module.exports = router;