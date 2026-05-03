const db = require('../config/db');

const User = {
    getById: async (id) => {
        const [rows] = await db.query(
            'SELECT id, username FROM users WHERE id = ?',
            [id]
        );
        return rows[0];
    },

    getByUsername: async (username) => {
        const [rows] = await db.query(
            'SELECT * FROM users WHERE username = ?',
            [username]
        );
        return rows[0];
    },

    create: async (username, hashedPassword) => {
        const [result] = await db.query(
            'INSERT INTO users (username, password) VALUES (?, ?)',
            [username, hashedPassword]
        );
        return result.insertId;
    },

    exists: async (username) => {
        const [rows] = await db.query(
            'SELECT id FROM users WHERE username = ?',
            [username]
        );
        return rows.length > 0;
    }
};

module.exports = User;