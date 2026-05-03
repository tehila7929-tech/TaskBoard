const express = require('express');
const router = express.Router();
const UserController = require('../controllers/usersController');
const auth = require('../middlewares/authMiddleware'); // 1. ייבוא המידלוודר

// --- נתיבים ציבוריים (ללא בדיקת טוקן) ---

// התחברות והרשמה חייבות להיות פתוחות לכולם
router.post('/login', UserController.login);
router.post('/register', UserController.register);

// בדיקה אם שם משתמש תפוס (בדרך כלל פתוח כדי לעזור למשתמש בזמן ההרשמה)
router.get('/exists/username/:username', UserController.checkUsernameExists);


// --- נתיבים מוגנים (עם בדיקת טוקן) ---

// רק משתמש מחובר יכול לקבל מידע על משתמש
router.get('/info/:userId', auth, UserController.getUserInfo); 

// בדיקה אם משתמש קיים (אם זה חלק מחיפוש פנימי באפליקציה, כדאי להגן על זה)
router.get('/exists/:userId', auth, UserController.checkUserExists);

module.exports = router;