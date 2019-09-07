const router = require('koa-router')();
const projects_controller = require('../controllers/projects_controller');
const upload = require('../controllers/multers/projects_multer.js');

router.prefix('/projects');

router.post('/upload', upload.single('file'), projects_controller.upload);

router.get('/', projects_controller.get);

router.post('/', projects_controller.add);

router.delete('/:id', projects_controller.delete);

module.exports = router;