// בתוך authMiddleware.js
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // שליפת הטוקן מה-Header
    
    if (!token) return res.status(401).send('Access Denied');

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified; // שומרים את פרטי המשתמש על ה-req לשימוש עתידי
        next(); // הכל תקין? תמשיך לקונטרולר
    } catch (err) {
        res.status(400).send('Invalid Token');
    }
};