CREATE DATABASE IF NOT EXISTS my_project_db;
USE my_project_db;

-- טבלת משתמשים (כולל שדות מאוחדים לכתובת וחברה)
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    address VARCHAR(255),
    phone VARCHAR(50),
    website VARCHAR(100),
    company VARCHAR(255)
);

-- טבלת סיסמאות (מוגבלת לגישה נפרדת)
CREATE TABLE passwords (
    user_id INT PRIMARY KEY,
    password VARCHAR(36) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- טבלת פוסטים
CREATE TABLE posts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    title VARCHAR(255),
    body TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- טבלת תגובות
CREATE TABLE comments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    post_id INT NOT NULL,
    user_id INT NOT NULL, -- העמודה החדשה
    name VARCHAR(100),
    email VARCHAR(100),
    body TEXT,
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE -- הקישור החדש
);

-- טבלת משימות
CREATE TABLE todos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    title VARCHAR(255),
    completed BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);