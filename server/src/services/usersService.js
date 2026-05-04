const User = require('../models/usersModel');

const UsersService = {
    login: async (username, password) => {
        if (!username || !password) throw new Error('Username and password are required');

        const user = await User.getByUsername(username);
        if (!user || user.password !== password) throw new Error('Invalid username or password');

        const { password: _, ...userWithoutPassword } = user;
        return userWithoutPassword;
    },

    getUserInfo: async (userId) => {
        if (!userId) throw new Error('User ID is required');

        const user = await User.getById(userId);
        if (!user) throw new Error('User not found');

        const { password: _, ...userInfo } = user;
        return userInfo;
    },

    checkUserExists: async (userId) => {
        const user = await User.getById(userId);
        return !!user;
    },

    register: async (username, password, details = {}) => {
        if (!username || !password) throw new Error('Username and password are required');
        const alreadyExists = await User.exists(username);
        if (alreadyExists) throw new Error('Username already taken');
        const newId = await User.create(username, password, details);
        return { id: newId, username, ...details };
    },

    checkUsernameExists: async (username) => {
        return await User.exists(username);
    }
};

module.exports = UsersService;
