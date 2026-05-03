const express = require('express');
const router = express.Router();
const CommentController = require('../controllers/commentsController');

// --- הגדרת הראוטים ---

// שליפת כל התגובות של פוסט מסוים
router.get('/posts/:postId/comments', CommentController.getComments);

// יצירת תגובה חדשה לפוסט על ידי משתמש מסוים
router.post('/posts/:postId/users/:userId/comments', CommentController.createComment);

// עדכון תגובה ספציפית (צריך לדעת מי המשתמש ומה מזהה התגובה)
router.put('/users/:userId/comments/:id', CommentController.updateComment);

// מחיקת תגובה ספציפית
router.delete('/users/:userId/comments/:id', CommentController.deleteComment);

module.exports = router;