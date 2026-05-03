const UsersService = require('../services/usersService');

const UserController = {

    login: async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await UsersService.login(username, password);

        const token = jwt.sign(
            { userId: user.id }, 
            process.env.JWT_SECRET, 
            { expiresIn: '24h' } 
        );

        return res.status(200).json({ 
            user, 
            token 
        });

    } catch (error) {
        return res.status(401).json({ error: error.message });
    }
},

    getUserInfo: async (req, res) => {
        try {
            const userId = req.params.userId;
            const userInfo = await UsersService.getUserInfo(userId);

            res.status(200).json(userInfo);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    },

    checkUserExists: async (req, res) => {
        try {
            const userId = req.params.userId;
            const exists = await UsersService.checkUserExists(userId);
            res.status(200).json({ exists });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    register: async (req, res) => {
        try {
            const { username, password } = req.body;
            const newUser = await UsersService.register(username, password);
            res.status(201).json(newUser);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    checkUsernameExists: async (req, res) => {
        try {
            const { username } = req.params;
            const exists = await UsersService.checkUsernameExists(username);
            res.status(200).json({ exists });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
};

module.exports = UserController;