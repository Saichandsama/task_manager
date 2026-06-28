# TaskTracker: MERN Stack Web Application

![TaskTracker](https://via.placeholder.com/1200x600.png?text=TaskTracker+Dashboard)

A modern, responsive, and production-ready Task Management web application built with the MERN stack (MongoDB, Express, React, Node.js). It features a beautiful UI, smooth animations, dark mode, and complete CRUD functionality for tasks.

## 🚀 Features

- **Full CRUD Operations**: Create, Read, Update, and Delete tasks seamlessly.
- **Advanced Filtering & Sorting**: Filter tasks by status and priority. Sort by due date, created date, or priority.
- **Search Functionality**: Instantly search tasks by title or description.
- **Pagination**: Efficiently load and browse through large numbers of tasks.
- **Dashboard Statistics**: Get a quick overview of total, pending, in-progress, and completed tasks.
- **Dark Mode**: Built-in dark and light mode toggle for better accessibility and user preference.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop viewing.
- **Smooth Animations**: Powered by Framer Motion for a premium feel.
- **Toast Notifications**: Real-time feedback for user actions.
- **Loading Skeletons**: Enhanced user experience during data fetching.

## 🛠️ Tech Stack

**Frontend:**
- React (Vite)
- Tailwind CSS
- Framer Motion (Animations)
- React Router DOM
- Context API (State Management)
- Axios (HTTP Client)
- Lucide React (Icons)
- React Hot Toast (Notifications)

**Backend:**
- Node.js & Express.js
- MongoDB & Mongoose
- Express Validator (Input validation)
- Morgan (Logging)
- dotenv (Environment management)

## 📁 Folder Structure

```
task-tracker/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── context/        # Global state (Theme & Tasks)
│   │   ├── hooks/          # Custom React hooks
│   │   ├── pages/          # Application pages (Dashboard)
│   │   ├── services/       # API configuration
│   │   ├── App.jsx         # Main layout & routing
│   │   └── main.jsx        # Entry point
│   ├── index.html
│   ├── tailwind.config.js
│   └── package.json
│
├── server/                 # Backend Node.js/Express application
│   ├── config/             # Database connection
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Custom middlewares (Error handling)
│   ├── models/             # Mongoose schemas
│   ├── routes/             # API routes
│   ├── server.js           # Express entry point
│   └── package.json
└── README.md
```

## ⚙️ Installation & Local Setup

### Prerequisites
- Node.js (v16+)
- MongoDB running locally or a MongoDB Atlas connection string.

### 1. Clone the repository
```bash
git clone <repository-url>
cd task-tracker
```

### 2. Backend Setup
```bash
cd server
npm install
```
Create a `.env` file in the `server` directory:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/tasktracker
NODE_ENV=development
```
Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd client
npm install
```
Create a `.env` file in the `client` directory:
```env
VITE_API_URL=http://localhost:5000/api
```
Start the frontend development server:
```bash
npm run dev
```

The application will be running at `http://localhost:5173`.

## 📡 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/tasks` | Fetch all tasks (supports `?page`, `?limit`, `?status`, `?priority`, `?search`, `?sortBy`, `?sortOrder`) |
| `GET` | `/api/tasks/:id` | Fetch a single task by ID |
| `POST` | `/api/tasks` | Create a new task |
| `PUT` | `/api/tasks/:id` | Update an existing task |
| `DELETE` | `/api/tasks/:id` | Delete a task |

## 🚀 Deployment Steps

### Deploying the Backend (Render)
1. Push your code to GitHub.
2. Go to [Render](https://render.com) and create a new **Web Service**.
3. Connect your GitHub repository and select the `server` directory as the Root Directory.
4. Set Build Command to `npm install` and Start Command to `node server.js`.
5. Add Environment Variables (`MONGO_URI`, `PORT`, `NODE_ENV=production`, `CORS_ORIGIN=<your_vercel_url>`).
6. Click **Deploy**.

### Deploying the Frontend (Vercel)
1. Go to [Vercel](https://vercel.com) and import your GitHub repository.
2. Set the Root Directory to `client`.
3. The framework preset should automatically detect **Vite**.
4. Add the Environment Variable `VITE_API_URL` pointing to your deployed Render backend URL (e.g., `https://your-backend.onrender.com/api`).
5. Click **Deploy**.

## 🔮 Future Improvements
- User Authentication (Login/Register)
- Assigning tasks to specific users
- Drag and drop Kanban board view
- Email notifications for upcoming due dates

---
*Built with modern web technologies.*
