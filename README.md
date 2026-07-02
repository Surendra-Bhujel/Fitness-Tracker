# 🏋️ Fitness Tracker

![React](https://img.shields.io/badge/React-19-blue?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green?logo=mongodb)
![License](https://img.shields.io/badge/License-ISC-blue)

A full-stack MERN Fitness Tracker application with secure authentication, workout management, analytics, profile management, and an admin dashboard.

---

# ✨ Features

## 👤 User
- Register & Login
- JWT Authentication
- Password Hashing (bcrypt)
- Profile Management
- Avatar Upload
- Change Password
- Delete Account

## 💪 Workout
- Create Workout
- Update Workout
- Delete Workout
- Workout History
- Progress Charts
- Calories Tracking
- Workout Type Filtering

## 👨‍💼 Admin
- Admin Login
- User Management
- Platform Analytics
- Delete Users
- Create Admin
- Reset Password

---

# 🛠 Tech Stack

| Frontend | Backend | Database |
|-----------|----------|----------|
| React + Vite | Node.js | MongoDB |
| React Router | Express.js | Mongoose |
| Tailwind CSS | JWT | |
| Bootstrap | Multer | |
| Axios | bcryptjs | |
| Recharts | CORS | |

---

# 📁 Project Structure

```text
Fitness-Tracker/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── uploads/
│   ├── server.js
│   ├── package.json
│   └── .gitignore
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── context/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── README.md
└── .gitignore
```

## Folder Purpose

| Folder | Purpose |
|---------|----------|
| backend/models | Database Schemas |
| backend/routes | API Routes |
| backend/middleware | Authentication |
| backend/uploads | User Uploads |
| frontend/pages | Application Pages |
| frontend/components | Reusable Components |
| frontend/context | Global State |
| frontend/services | API Calls |

---

# 🔄 Data Flow

```text
React
   │
Axios
   │
Express Routes
   │
Middleware
   │
MongoDB
```

---

# 🚀 Installation

## Clone

```bash
git clone https://github.com/Surendra-Bhujel/Fitness-Tracker.git
cd Fitness-Tracker
```

## Backend

```bash
cd backend
npm install
```

Create `.env`

```env
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret
```

Run

```bash
npm run dev
```

## Frontend

```bash
cd ../frontend
npm install
npm run dev
```

---

# 🌐 API Routes

## Authentication

| Method | Endpoint |
|--------|----------|
| POST | /api/auth/register |
| POST | /api/auth/login |
| GET | /api/auth/me |
| PUT | /api/auth/profile |
| PUT | /api/auth/change-password |
| PUT | /api/auth/profile/avatar |
| DELETE | /api/auth/account |

## Workouts

| Method | Endpoint |
|--------|----------|
| GET | /api/workouts |
| POST | /api/workouts |
| PUT | /api/workouts/:id |
| DELETE | /api/workouts/:id |

## Admin

| Method | Endpoint |
|--------|----------|
| POST | /api/admin/login |
| GET | /api/admin/users |
| GET | /api/admin/analytics |
| DELETE | /api/admin/users/:id |

---

# 📦 Database Models

### User
- name
- email
- password
- avatar

### Workout
- user
- title
- type
- duration
- calories
- notes
- date

### Admin
- name
- email
- password
- role
- permissions

---

# 🔒 Security

- JWT Authentication
- bcrypt Password Hashing
- Protected Routes
- Role Based Authorization
- Multer Upload Validation
- CORS Enabled

---

# 📈 Future Improvements

- AI Workout Recommendations
- Email Notifications
- Mobile App
- Fitness Wearable Integration
- Social Features
- Goal Tracking

---

# 👨‍💻 Author

**Surendra Bhujel**

GitHub: https://github.com/Surendra-Bhujel

---

# 📄 License

Licensed under the ISC License.
