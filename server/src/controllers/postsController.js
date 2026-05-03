const PostService = require('../services/postsService');

const PostController = {

    getUserPosts: async (req, res) => {
        try {
            const userId = req.params.userId;
            const posts = await PostService.getUserPosts(userId);
            res.status(200).json(posts);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getAllPosts: async (req, res) => {
        try {
            const posts = await PostService.getAllPosts();
            res.status(200).json(posts);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    createPost: async (req, res) => {
        try {
            const userId = req.params.userId;
            const { title, body } = req.body;
            const newPost = await PostService.createPost(userId, title, body);
            res.status(201).json(newPost);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    updatePost: async (req, res) => {
        try {
            const userId = req.params.userId;
            const postId = req.params.id;
            const { title, body } = req.body;
            const result = await PostService.updatePost(userId, postId, { title, body });
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    deletePost: async (req, res) => {
        try {
            const userId = req.params.userId;
            const postId = req.params.id;
            const result = await PostService.deletePost(userId, postId);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
};

module.exports = PostController;