const db = require('../config/db');

const Todo = {
    getByUserId: async (userId) => {
        const [rows] = await db.query(
            'SELECT * FROM todos WHERE user_id = ? ORDER BY id ASC',
            [userId]
        );
        return rows;
    },

    create: async (userId, title) => {
        const [result] = await db.query(
            'INSERT INTO todos (user_id, title, completed) VALUES (?, ?, ?)',
            [userId, title, false] 
        );
        return result.insertId;
    },

    update: async (userId, todoId, updatedData) => {
        const { title, completed } = updatedData;
        const [result] = await db.query(
            'UPDATE todos SET title = ?, completed = ? WHERE id = ? AND user_id = ?',
            [title, completed, todoId, userId]
        );
        return result.affectedRows;
    },

    delete: async (userId, todoId) => {
        const [result] = await db.query('DELETE FROM todos WHERE id = ? AND user_id = ?',
            [todoId, userId]);
        return result.affectedRows;
    }
};

module.exports = Todo;