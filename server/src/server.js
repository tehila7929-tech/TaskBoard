const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

const usersRoutes = require('./routes/usersRoutes');
const postsRoutes = require('./routes/postsRoutes');
const todosRoutes = require('./routes/todosRoutes');
const commentsRoutes = require('./routes/commentsRoutes');

app.use(express.json());

app.use('/users', usersRoutes);
app.use('/posts', postsRoutes);
app.use('/todos', todosRoutes);
app.use('/comments', commentsRoutes);

app.get('/health', (req, res) => {
    res.send("השרת פועל בהצלחה!");
});

app.use((req, res) => {
    res.status(404).json({ message: "הנתיב המבוקש לא נמצא בשרת" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
