const TodoService = require('../services/todosService');

const TodoController = {
    getTodos: async (req, res) => {
        try {
            const userId = req.query.userId;
            const todos = await TodoService.getUserTodos(userId);
            res.status(200).json(todos);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    createTodo: async (req, res) => {
        try {
            const { userId, title } = req.body;
            const newTodo = await TodoService.createTodo(userId, title);
            res.status(201).json(newTodo);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    updateTodo: async (req, res) => {
        try {
            const todoId = req.params.id;
            const { userId, title, completed } = req.body;
            const result = await TodoService.updateTodo(userId, todoId, { title, completed });
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    deleteTodo: async (req, res) => {
        try {
            const todoId = req.params.id;
            const result = await TodoService.deleteTodo(todoId);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
};

module.exports = TodoController;
