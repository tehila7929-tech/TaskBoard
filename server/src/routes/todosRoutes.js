const express = require('express');
const router = express.Router();
const TodoController = require('../controllers/todosController');
const authMiddleware = require('../middlewares/authMiddleware');

// החלת המידלוור על כל הנתיבים בקובץ הזה
// זה אומר שאי אפשר לגשת לאף אחת מהכתובות כאן בלי טוקן תקין
router.use(authMiddleware);

// --- הגדרת הנתיבים ---

// שליפת כל המשימות
// מתאים לבקשת: GET /api/todos
router.get('/', TodoController.getTodos);

// יצירת משימה חדשה
// מתאים לבקשת: POST /api/todos
router.post('/', TodoController.createTodo);

// עדכון משימה קיימת (לפי ID)
// מתאים לבקשת: PUT /api/todos/5
router.put('/:id', TodoController.updateTodo);

// מחיקת משימה (לפי ID)
// מתאים לבקשת: DELETE /api/todos/5
router.delete('/:id', TodoController.deleteTodo);

module.exports = router;