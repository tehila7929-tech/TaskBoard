const jwt = require('jsonwebtoken');

// בסביבת ייצור (Production), יש להעביר את הסוד לקובץ .env
// לדוגמה: process.env.JWT_SECRET
const JWT_SECRET = 'your_super_secret_key';

const verifyAuth = (req, res, next) => {
    // 1. קריאת ההדר של האימות מהבקשה
    const authHeader = req.headers.authorization;

    // 2. בדיקה האם סופק טוקן והאם הוא בפורמט התקין (Bearer <token>)
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'גישה נדחתה. לא סופק טוקן התחברות.' });
    }

    // חילוץ הטוקן עצמו
    const token = authHeader.split(' ')[1];

    try {
        // 3. אימות הטוקן מול הסוד שלנו
        const decoded = jwt.verify(token, JWT_SECRET);
        
        // 4. חילוץ מזהה המשתמש מהטוקן המפוענח (בהנחה ששמרנו את 'id' בשלב ההתחברות)
        // שומרים את זה ב-req.userId כך שכל פונקציה בהמשך תכיר את המשתמש
        req.userId = decoded.id; 

        // 5. אישור מעבר לפונקציה הבאה (Middleware נוסף או Controller)
        next();
    } catch (error) {
        return res.status(403).json({ message: 'טוקן לא תקין או שפג תוקפו.' });
    }
};

module.exports =  verifyAuth ;