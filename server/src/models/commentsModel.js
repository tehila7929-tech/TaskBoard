const db = require('../config/db');

const commment = {

    getByPostId: async (postId) => {
        const [rows] = await db.query(
            'SELECT * FROM comments WHERE post_id = ? ORDER BY id ASC',
            [postId]
        );
        return rows;
    },

    create: async (postId, userId, name, email, body) => {
        const [result] = await db.query(
            'INSERT INTO comments (post_id, user_id, name, email, body) VALUES (?, ?, ?, ?, ?)',
            [postId, userId, name, email, body]
        );
        return result.insertId;
    },

    update: async (userId, commentId, updatedData) => {
        const { body } = updatedData;
        const [result] = await db.query(
            'UPDATE comments SET body = ? WHERE id = ?',
            [body, commentId]
        );
        return result.affectedRows;
    },

    delete: async (userId, commentId) => {
        const [result] = await db.query('DELETE FROM comments WHERE id = ?', [commentId]);
        return result.affectedRows;
    }
};

module.exports = commment;
