const router = require('koa-router')();
const commentController = require('../controllers/comments_controller');

router.prefix('/comments');

router.get('/', commentController.get);

router.post('/', commentController.add);

router.put('/', commentController.reply);

router.delete('/:id', commentController.delete);

module.exports = router;