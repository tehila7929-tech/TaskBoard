// const express = require('express');
// const cors = require('cors');
// require('dotenv').config();

// // ייבוא החיבור למסד הנתונים כדי לוודא שהוא עובד (למרות שעוד לא השתמשנו בו בנתיבים)
// const db = require('./config/db'); 

// const app = express();
// const PORT = process.env.PORT || 3000;

// // Middlewares
// app.use(cors()); // מאפשר קבלת בקשות מדומיינים אחרים (כמו ה-React שלך)
// app.use(express.json()); // מאפשר לשרת להבין בקשות עם תוכן מסוג JSON

// // נתיב בדיקה בסיסי כדי לוודא שהשרת עובד
// app.get('/', (req, res) => {
//     res.send('Server is up and running!');
// });

// // כאן נוסיף בהמשך את הנתיבים שלנו, למשל:
// // const userRoutes = require('./routes/users.routes');
// // app.use('/api/users', userRoutes);

// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });






const express = require('express');
const app = express();

// ייבוא הראוטרים
const todoRoutes = require('./routes/todosRoutes'); // ודא שהנתיב מדויק
// const postsRoutes = require('./routes/posts.routes'); // תוסיף בהמשך כשתיצור
// const authRoutes = require('./routes/authRoutes'); // תוסיף בהמשך עבור הלוגין

// Middleware מובנה של Express לקריאת נתונים בפורמט JSON מגוף הבקשה (Body)
app.use(express.json());

// נתיב בסיסי לבדיקה מהירה שהשרת אכן למעלה
app.get('/', (req, res) => {
    res.send('ברוכים הבאים ל-API של הפרויקט!');
});

// חיבור נתיבי ה-API לראוטרים המתאימים
app.use('/api/todos', todoRoutes);
// app.use('/api/posts', postsRoutes);
// app.use('/login', authRoutes);

// טיפול בשגיאת "נתיב לא נמצא" (404)
app.use((req, res) => {
    res.status(404).json({ message: 'הנתיב המבוקש לא נמצא.' });
});

// הפעלת השרת על פורט 3000 (או פורט שמוגדר בסביבה)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running successfully on http://localhost:${PORT}`);
});