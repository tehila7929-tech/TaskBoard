const Comments = require('../models/commentsModel');

const CommentsService = {
    getPostsComments: async (postId) => {
        if (!postId) throw new Error('post ID is required');
        return await Comments.getByPostId(postId);
    },

    createComments: async (postId, userId, name, email, body) => {
        if (!userId) throw new Error('User ID is required');
        if (!postId) throw new Error('post ID is required');
        if (!name || name.trim() === '') throw new Error('Name cannot be empty');
        if (!email || email.trim() === '') throw new Error('Email cannot be empty');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new Error('Invalid email format');
        }
        if (!body || body.trim() === '') throw new Error('Body cannot be empty');

        const insertId = await Comments.create(postId, userId, name, email, body);
        return { id: insertId, postId, userId, name, email, body };
    },

    updateComments: async (userId, commentId, updatedData) => {
        if (!userId || !commentId) throw new Error('User ID and comment ID are required');
        if (!updatedData.body || updatedData.body.trim() === '') throw new Error('Body cannot be empty');

        const affectedRows = await Comments.update(userId, commentId, updatedData);
        if (affectedRows === 0) {
            throw new Error('Comments not found or not authorized to update');
        }
        return { success: true, message: 'Comments updated successfully' };
    },

    deleteComments: async (userId, commentId) => {
        if (!userId || !commentId) throw new Error('User ID and Comment ID are required');

        const affectedRows = await Comments.delete(userId, commentId);
        if (affectedRows === 0) {
            throw new Error('Comments not found or not authorized to delete');
        }
        return { success: true, message: 'Comments deleted successfully' };
    }
};

module.exports = CommentsService;