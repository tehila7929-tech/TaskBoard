const db = require('../config/db');

const checkPostOwnership = async (req, res, next) => {
    const postId = req.params.id;
    const userId = Number(req.params.userId);

    try {
        const [rows] = await db.query('SELECT user_id FROM posts WHERE id = ?', [postId]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'הפוסט לא נמצא.' });
        }

        if (rows[0].user_id !== userId) {
            return res.status(403).json({ message: 'פעולה נדחתה. אינך מורשה לערוך או למחוק פוסט של משתמש אחר.' });
        }

        next();
    } catch (error) {
        res.status(500).json({ message: 'שגיאת שרת פנימית בעת בדיקת הרשאות.' });
    }
};

const checkCommentOwnership = async (req, res, next) => {
    const commentId = req.params.id;
    const userId = Number(req.params.userId);

    try {
        const [rows] = await db.query('SELECT user_id FROM comments WHERE id = ?', [commentId]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'התגובה לא נמצאה.' });
        }

        if (rows[0].user_id !== userId) {
            return res.status(403).json({ message: 'פעולה נדחתה. אינך מורשה לערוך או למחוק תגובה של משתמש אחר.' });
        }

        next();
    } catch (error) {
        res.status(500).json({ message: 'שגיאת שרת פנימית בעת בדיקת הרשאות.' });
    }
};

module.exports = { checkPostOwnership, checkCommentOwnership };
