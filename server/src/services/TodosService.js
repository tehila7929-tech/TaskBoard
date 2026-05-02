const Todo = require('../models/todosModel'); // ודא שהנתיב תואם למיקום הקובץ שלך

const TodoService = {
    // שליפת כל המשימות של משתמש
    getUserTodos: async (userId) => {
        if (!userId) throw new Error('User ID is required');
        return await Todo.getByUserId(userId);
    },

    // יצירת משימה חדשה
    createTodo: async (userId, title) => {
        if (!userId) throw new Error('User ID is required');
        if (!title || title.trim() === '') throw new Error('Title cannot be empty');

        const insertId = await Todo.create(userId, title);
        return { id: insertId, userId, title, completed: false };
    },

    // עדכון משימה
    updateTodo: async (userId, todoId, updatedData) => {
        if (!userId || !todoId) throw new Error('User ID and Todo ID are required');
        if (!updatedData.title || updatedData.title.trim() === '') throw new Error('Title cannot be empty');
        if (typeof updatedData.completed !== 'boolean') throw new Error('Completed must be a boolean value');

        const affectedRows = await Todo.update(userId, todoId, updatedData);
        if (affectedRows === 0) {
            throw new Error('Todo not found or not authorized to update');
        }
        return { success: true, message: 'Todo updated successfully' };
    },

    // מחיקת משימה
    deleteTodo: async (userId, todoId) => {
        if (!userId || !todoId) throw new Error('User ID and Todo ID are required');

        const affectedRows = await Todo.delete(userId, todoId);
        if (affectedRows === 0) {
            throw new Error('Todo not found or not authorized to delete');
        }
        return { success: true, message: 'Todo deleted successfully' };
    }
};

module.exports = TodoService;