# Project 7 - Full Stack App

A full stack web application built with React + Vite (client) and Node.js + Express (server), using MySQL as the database.

## Tech Stack

- **Client:** React 19, React Router v7, Axios, Vite
- **Server:** Node.js, Express 5, MySQL2, JWT, dotenv
- **Database:** MySQL

## Project Structure

```
project_7/
├── client/       # React frontend
├── server/       # Express backend
└── database/     # SQL schema and seed files
```

## Getting Started

### Prerequisites

- Node.js
- MySQL server running locally

### Database Setup

1. Open MySQL and run the schema file:
```bash
mysql -u root -p < database/schema.sql
```
2. (Optional) Seed the database:
```bash
mysql -u root -p < database/seed.sql
```

### Environment Variables

Create a `.env` file in the root directory:
```
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=<your_password>
DB_NAME=my_project_db
```

### Install & Run

**Server:**
```bash
cd server
npm install
npm run dev
```
Server runs on `http://localhost:3000`

**Client:**
```bash
cd client
npm install
npm run dev
```
Client runs on `http://localhost:5173`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/users/login` | Login |
| POST | `/users` | Register |
| GET | `/users` | Check if username exists |
| GET | `/users/info/:userId` | Get user info |
| GET | `/posts` | Get all posts |
| POST | `/posts` | Create post |
| PATCH | `/posts/:id` | Update post |
| DELETE | `/posts/:id` | Delete post |
| GET | `/comments` | Get comments |
| POST | `/comments` | Create comment |
| PATCH | `/comments/:id` | Update comment |
| DELETE | `/comments/:id` | Delete comment |
| GET | `/todos` | Get todos |
| POST | `/todos` | Create todo |
| PATCH | `/todos/:id` | Update todo |
| DELETE | `/todos/:id` | Delete todo |

## Pages

- `/login` — Login page
- `/register` — Registration (2-step: basic info + details)
- `/home` — Home page (requires login)
- `/users/:id/posts` — User's posts (owner only)
- `/users/:id/todos` — User's todos (owner only)
