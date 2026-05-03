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
            'SELECT users.*, password FROM users JOIN passwords ON users.id = passwords.user_id WHERE username = ?',
            [username]
        );
        return rows[0];
    },

    create: async (username, Password) => {
        const [result] = await db.query(
            'INSERT INTO users (username) VALUES (?)',
            [username]
        );
        const newId = result.insertId;
        await db.query(
            'INSERT INTO passwords (user_id, password) VALUES (?, ?)',
            [newId, Password]
        );
        return newId;
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