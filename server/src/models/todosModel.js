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
        const fields = [];
        const values = [];
        if (updatedData.title !== undefined) { fields.push('title = ?'); values.push(updatedData.title); }
        if (updatedData.completed !== undefined) { fields.push('completed = ?'); values.push(updatedData.completed); }
        if (fields.length === 0) return 0;
        values.push(todoId);
        const [result] = await db.query(
            `UPDATE todos SET ${fields.join(', ')} WHERE id = ?`,
            values
        );
        return result.affectedRows;
    },

    delete: async (todoId) => {
        const [result] = await db.query('DELETE FROM todos WHERE id = ?', [todoId]);
        return result.affectedRows;
    }
};

module.exports = Todo;
