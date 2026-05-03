const User = require('../models/usersModel');

const UsersService = {
    // אימות משתמש (Login)
    login: async (username, password) => {
        if (!username || !password) {
            throw new Error('Username and password are required');
        }

        const user = await User.getByUsername(username);
        
        // בדיקה אם המשתמש קיים והאם הסיסמה תואמת
        // הערה: בפרויקט אמיתי מומלץ להשתמש ב-bcrypt להשוואת סיסמאות מוצפנות
        if (!user || user.password !== password) {
            throw new Error('Invalid username or password');
        }

        // החזרת פרטי המשתמש ללא הסיסמה
        const { password: _, ...userWithoutPassword } = user;
        return userWithoutPassword;
    },

    // שליפת מידע אישי עבור עמוד Info
    getUserInfo: async (userId) => {
        if (!userId) throw new Error('User ID is required');

        const user = await User.getById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        // החזרת המידע ללא הסיסמה (לפי דרישות שלב ג')
        const { password: _, ...userInfo } = user;
        return userInfo;
    },

    // בדיקה אם משתמש קיים (עבור לוגיקת רישום או אימות)
    checkUserExists: async (userId) => {
        const user = await User.getById(userId);
        return !!user;
    },

    register: async (username, password) => {
        if (!username || !password) throw new Error('Username and password are required');
        const alreadyExists = await User.exists(username);
        if (alreadyExists) throw new Error('Username already taken');
        const newId = await User.create(username, password);
        return { id: newId, username };
    },

    checkUsernameExists: async (username) => {
        return await User.exists(username);
    }
};

module.exports = UsersService;