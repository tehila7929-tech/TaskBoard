const db = require('../config/db');

const checkPostOwnership = async (req, res, next) => {
    const postId = req.params.id; // מזהה הפוסט משורת הכתובת ה-URL
    const userId = req.userId;    // מזהה המשתמש המחלץ מה-verifyAuth

    try {
        // 1. שליפת הפוסט הרלוונטי ממסד הנתונים
        const [rows] = await db.query('SELECT user_id FROM posts WHERE id = ?', [postId]);

        // 2. בדיקה האם הפוסט בכלל קיים
        if (rows.length === 0) {
            return res.status(404).json({ message: 'הפוסט לא נמצא.' });
        }

        const post = rows[0];

        // 3. אימות הבעלות: האם ה-ID של יוצר הפוסט תואם ל-ID של המשתמש המחובר?
        if (post.user_id !== userId) {
            return res.status(403).json({ message: 'פעולה נדחתה. אינך מורשה לערוך או למחוק פוסט של משתמש אחר.' });
        }

        // 4. אם המשתמש הוא אכן הבעלים - מאפשרים מעבר ל-Controller
        next();
    } catch (error) {
        console.error('Error in checkPostOwnership:', error);
        res.status(500).json({ message: 'שגיאת שרת פנימית בעת בדיקת הרשאות.' });
    }
};

const checkCommentOwnership = async (req, res, next) => {
    const commentId = req.params.id; 
    const userId = req.userId;    

    try {
        const [rows] = await db.query('SELECT user_id FROM comments WHERE id = ?', [commentId]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'התגובה לא נמצאה.' });
        }

        const comment = rows[0];

        if (comment.user_id !== userId) {
            return res.status(403).json({ message: 'פעולה נדחתה. אינך מורשה לערוך או למחוק תגובה של משתמש אחר.' });
        }

        next();
    } catch (error) {
        console.error('Error in checkCommentOwnership:', error);
        res.status(500).json({ message: 'שגיאת שרת פנימית בעת בדיקת הרשאות.' });
    }
};

module.exports = { checkPostOwnership, checkCommentOwnership };