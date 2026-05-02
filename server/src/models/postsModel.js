const db = require('../config/db');

const post = {

    getByUserId: async (userId) => {
        const [rows] = await db.query(
            'SELECT * FROM posts WHERE user_id = ? ORDER BY id ASC',
            [userId]
        );
        return rows;
    },

    getAll: async () => {
        const [rows] = await db.query(
            'SELECT * FROM posts ORDER BY id ASC'
        );
        return rows;
    },

    create: async (userId, title, body) => {
        const [result] = await db.query(
            'INSERT INTO posts (userId, title, body) VALUES (?, ?, ?)',
            [userId, title, body]
        );
        return result.insertId;
    },

    update: async (userId, postId, updatedData) => {
        const { title, body } = updatedData;
        const [result] = await db.query(
            'UPDATE posts SET title = ?, body = ? WHERE id = ? AND user_id = ?',
            [title, body, postId, userId]
        );
        return result.affectedRows;
    },

    delete: async (userId, postId) => {
        await db.query(`
        DELETE FROM comments 
        WHERE postId = ? AND EXISTS (SELECT 1 FROM posts WHERE id = ? AND user_id = ?)`,
            [postId, postId, userId]
        );
        const [result] = await db.query(
            'DELETE FROM posts WHERE id = ? AND user_id = ?',
            [postId, userId]
        );
        return result.affectedRows; 
    }
};

module.exports = post;