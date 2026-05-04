const CommentsService = require('../services/commentsService');

const CommentController = {

    getComments: async (req, res) => {
        try {
            const postId = req.query.postId;
            const comments = await CommentsService.getPostsComments(postId);
            res.status(200).json(comments);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    createComment: async (req, res) => {
        try {
            const { postId, name, email, body } = req.body;
            const userId = req.body.userId ? Number(req.body.userId) : null;
            const newComment = await CommentsService.createComment(postId, userId, name, email, body);
            res.status(201).json(newComment);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    updateComment: async (req, res) => {
        try {
            const commentId = req.params.id;
            const { userId, body } = req.body;
            const result = await CommentsService.updateComment(userId, commentId, { body });
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    deleteComment: async (req, res) => {
        try {
            const commentId = req.params.id;
            const { userId } = req.body;
            const result = await CommentsService.deleteComment(userId, commentId);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
};

module.exports = CommentController;
