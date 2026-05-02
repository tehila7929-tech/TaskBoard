const TodoService = require('../services/todosService');

const TodoController = {
    // GET /api/todos
    getTodos: async (req, res) => {
        try {
            const userId = req.user.id; // מניח שה-ID מגיע מ-Middleware של אימות
            const todos = await TodoService.getUserTodos(userId);
            res.status(200).json(todos);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // POST /api/todos
    createTodo: async (req, res) => {
        try {
            const userId = req.user.id;
            const { title } = req.body;
            
            const newTodo = await TodoService.createTodo(userId, title);
            res.status(201).json(newTodo);
        } catch (error) {
            // שגיאת לוגיקה (למשל כותרת ריקה) או שגיאת שרת
            res.status(400).json({ error: error.message });
        }
    },

    // PUT /api/todos/:id
    updateTodo: async (req, res) => {
        try {
            const userId = req.user.id;
            const todoId = req.params.id; // מגיע משורת הכתובת ה-URL
            const { title, completed } = req.body;
            
            const result = await TodoService.updateTodo(userId, todoId, { title, completed });
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    // DELETE /api/todos/:id
    deleteTodo: async (req, res) => {
        try {
            const userId = req.user.id;
            const todoId = req.params.id;
            
            const result = await TodoService.deleteTodo(userId, todoId);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
};

module.exports = TodoController;