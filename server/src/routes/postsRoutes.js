const express = require('express');
const router = express.Router();
const PostController = require('../controllers/postsController');
const { checkPostOwnership } = require('../middlewares/ownershipMiddleware');

router.get('/', PostController.getAllPosts);
router.post('/', PostController.createPost);
router.patch('/:id', PostController.updatePost);
router.delete('/:id', PostController.deletePost);

module.exports = router;