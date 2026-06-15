const express = require('express');
const router = express.Router();
const CommentController = require('../controllers/commentsController');
const { checkCommentOwnership } = require('../middlewares/ownershipMiddleware');

router.get('/', CommentController.getComments);
router.post('/', CommentController.createComment);
router.patch('/:id', CommentController.updateComment);
router.delete('/:id', CommentController.deleteComment);

module.exports = router;