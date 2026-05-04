const Todo = require('../models/todosModel');

const TodoService = {
    getUserTodos: async (userId) => {
        if (!userId) throw new Error('User ID is required');
        return await Todo.getByUserId(userId);
    },

    createTodo: async (userId, title) => {
        if (!userId) throw new Error('User ID is required');
        if (!title || title.trim() === '') throw new Error('Title cannot be empty');
        const insertId = await Todo.create(userId, title);
        return { id: insertId, userId, title, completed: false };
    },

    updateTodo: async (userId, todoId, updatedData) => {
        if (!todoId) throw new Error('Todo ID is required');
        const affectedRows = await Todo.update(userId, todoId, updatedData);
        if (affectedRows === 0) throw new Error('Todo not found or not authorized to update');
        return { success: true, message: 'Todo updated successfully' };
    },

    deleteTodo: async (todoId) => {
        if (!todoId) throw new Error('Todo ID is required');
        const affectedRows = await Todo.delete(todoId);
        if (affectedRows === 0) throw new Error('Todo not found');
        return { success: true, message: 'Todo deleted successfully' };
    }
};

module.exports = TodoService;
