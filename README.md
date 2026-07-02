# Fitness Tracker

A full-stack web application for tracking fitness workouts with user authentication, workout management, and admin analytics. Built with a modern tech stack using React, Node.js, Express, and MongoDB.

## 🎯 Project Overview

Fitness Tracker is a comprehensive fitness management platform that allows users to:
- Create and manage their workout records
- Track workout metrics (duration, calories burned, workout type)
- Monitor fitness progress with visual charts
- Manage their profile with avatar upload
- Access admin dashboard for platform analytics and user management

## 🛠️ Tech Stack

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js (v5.2.1)
- **Database:** MongoDB with Mongoose ODM (v9.7.0)
- **Authentication:** JWT (JSON Web Tokens) with jsonwebtoken (v9.0.3)
- **Security:** bcryptjs (v3.0.3) for password hashing
- **File Upload:** Multer (v2.2.0) for avatar uploads
- **CORS:** Enabled for cross-origin requests
- **Environment:** dotenv (v17.4.2) for environment variables
- **Dev Tools:** Nodemon (v3.1.14) for auto-reload

### Frontend
- **Framework:** React (v19.2.6) with React Router (v7.17.0)
- **Build Tool:** Vite (v8.0.12)
- **Styling:** Tailwind CSS (v4.3.0) with Bootstrap (v5.3.8)
- **UI Components:** React Icons, Lucide React, Bootstrap Icons
- **State Management:** React Context API
- **HTTP Client:** Axios (v1.17.0)
- **Animations:** Framer Motion (v12.40.0)
- **Charts:** Recharts (v3.8.1) for data visualization
- **Dev Tools:** ESLint for code quality

## 📁 Project Structure
Fitness-Tracker/
│
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   │   └── Schema: name, email, password (hashed), avatar, timestamps
│   │   │
│   │   ├── Workout.js
│   │   │   └── Schema: user (ref), title, type (enum), duration, calories, date, notes, timestamps
│   │   │
│   │   └── Admin.js
│   │       └── Schema: name, email, password (hashed), role, permissions, timestamps
│   │
│   ├── routes/
│   │   ├── auth.js
│   │   │   ├── POST   /register        - Register new user
│   │   │   ├── POST   /login           - User login
│   │   │   ├── GET    /me              - Get current user (protected)
│   │   │   ├── PUT    /profile         - Update profile (protected)
│   │   │   ├── PUT    /change-password - Change password (protected)
│   │   │   ├── DELETE /account         - Delete account (protected)
│   │   │   └── PUT    /profile/avatar  - Upload avatar (protected)
│   │   │
│   │   ├── workout.js
│   │   │   ├── GET    /                - Get all workouts (protected)
│   │   │   ├── POST   /                - Create workout (protected)
│   │   │   ├── PUT    /:id             - Update workout (protected)
│   │   │   └── DELETE /:id             - Delete workout (protected)
│   │   │
│   │   └── admin.js
│   │       ├── POST   /login           - Admin login
│   │       ├── GET    /users           - Get all users (super admin)
│   │       ├── DELETE /users/:id       - Delete user (super admin)
│   │       ├── GET    /analytics       - Get platform analytics
│   │       ├── POST   /create          - Create admin account
│   │       └── POST   /reset-password  - Reset admin password
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   │   └── Verifies JWT token and attaches user ID to request
│   │   │
│   │   └── adminAuth.js
│   │       ├── adminAuth middleware - Verifies admin JWT
│   │       └── checkPermission middleware - Checks admin permissions
│   │
│   ├── uploads/
│   │   └── avatars/
│   │       └── Stores user profile pictures (created at runtime)
│   │
│   ├── server.js
│   │   ├── Express app setup
│   │   ├── Middleware configuration (CORS, JSON parser)
│   │   ├── Route mounting
│   │   ├── MongoDB connection
│   │   └── Server startup on port 5000
│   │
│   ├── package.json
│   │   └── Dependencies: express, mongoose, bcryptjs, jsonwebtoken, multer, cors, dotenv
│   │
│   ├── package-lock.json
│   │   └── Locked dependency versions
│   │
│   └── .gitignore
│       └── Excludes node_modules, .env
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── LandingPage.jsx
│   │   │   │   └── Public landing page with features showcase
│   │   │   │
│   │   │   ├── LoginPage.jsx
│   │   │   │   └── User login form with email/password validation
│   │   │   │
│   │   │   ├── RegisterPage.jsx
│   │   │   │   └── User registration form with validation
│   │   │   │
│   │   │   ├── Dashboard.jsx
│   │   │   │   ├── Main user dashboard
│   │   │   │   ├── Workout list display
│   │   │   │   ├── Add/edit/delete workouts
│   │   │   │   ├── Progress charts
│   │   │   │   └── Analytics visualization
│   │   │   │
│   │   │   ├── Profile.jsx
│   │   │   │   ├── User profile information
│   │   │   │   ├── Edit profile form
│   │   │   │   ├── Change password
│   │   │   │   ├── Upload avatar
│   │   │   │   └── Delete account option
│   │   │   │
│   │   │   └── Admin/
│   │   │       ├── AdminLogin.jsx
│   │   │       │   └── Admin authentication page
│   │   │       │
│   │   │       ├── AdminDashboard.jsx
│   │   │       │   ├── Platform analytics display
│   │   │       │   ├── User management
│   │   │       │   ├── Workout statistics
│   │   │       │   └── Admin features
│   │   │       │
│   │   │       └── AdminSettings.jsx
│   │   │           └── Admin configuration options
│   │   │
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   │   └── User navigation bar with logout
│   │   │   │
│   │   │   ├── AdminNavbar.jsx
│   │   │   │   └── Admin navigation bar
│   │   │   │
│   │   │   ├── WorkoutForm.jsx
│   │   │   │   ├── Form to create new workout
│   │   │   │   ├── Form to edit existing workout
│   │   │   │   ├── Fields: title, type, duration, calories, notes
│   │   │   │   └── Form validation
│   │   │   │
│   │   │   ├── WorkoutList.jsx
│   │   │   │   ├── Display all user workouts
│   │   │   │   ├── Edit/delete workout buttons
│   │   │   │   ├── Filter by workout type
│   │   │   │   └── Sort workouts
│   │   │   │
│   │   │   ├── ProgressChart.jsx
│   │   │   │   ├── Recharts visualization
│   │   │   │   ├── Calories trend
│   │   │   │   ├── Workout frequency
│   │   │   │   └── Type breakdown
│   │   │   │
│   │   │   ├── ProtectedRoute.jsx
│   │   │   │   ├── Guards user routes
│   │   │   │   └── Redirects to login if not authenticated
│   │   │   │
│   │   │   ├── AdminRoute.jsx
│   │   │   │   ├── Guards admin routes
│   │   │   │   └── Redirects to admin login if not authenticated
│   │   │   │
│   │   │   └── Footer.jsx
│   │       └── Empty footer component
│   │
│   ├── context/
│   │   └── AuthContext.jsx
│   │       ├── Global authentication state
│   │       ├── User login/logout functions
│   │       ├── Admin login/logout functions
│   │       ├── Token management
│   │       └── Auth state persistence
│   │
│   ├── services/
│   │   └── API service calls (if any)
│   │
│   ├── App.jsx
│   │   ├── Main app component
│   │   ├── Route definitions:
│   │   │   ├── Public: /, /login, /register, /admin/login
│   │   │   ├── Protected: /dashboard, /profile
│   │   │   └── Admin: /admin/dashboard, /admin/AdminSettings
│   │   └── AuthProvider wrapper
│   │
│   ├── main.jsx
│   │   └── React app entry point with root rendering
│   │
│   ├── index.jsx
│   │   └── Alternative entry point (may not be used)
│   │
│   ├── index.css
│   │   └── Global styles
│   │
│   ├── App.css
│   │   └── App-specific styles
│   │
│   ├── package.json
│   │   └── Dependencies: react, react-router-dom, axios, tailwindcss, bootstrap, recharts, framer-motion
│   │
│   ├── package-lock.json
│   │   └── Locked dependency versions
│   │
│   ├── vite.config.js
│   │   └── Vite build configuration
│   │
│   ├── eslint.config.js
│   │   └── ESLint configuration for code quality
│   │
│   ├── index.html
│   │   └── HTML template with root div
│   │
│   ├── .gitignore
│   │   └── Excludes node_modules, dist, .env
│   │
│   └── public/
│       └── Static assets (images, icons)
│
├── .git/
│   └── Git repository files
│
└── .gitignore
    └── Root level git ignore

📊 Project Structure Summary
Backend Structure (Node.js + Express + MongoDB)
backend/
├── Models (Database Schemas)
│   ├── User Model - Stores user accounts
│   ├── Workout Model - Stores workout records
│   └── Admin Model - Stores admin accounts
│
├── Routes (API Endpoints)
│   ├── Auth Routes - User registration/login/profile
│   ├── Workout Routes - CRUD operations for workouts
│   └── Admin Routes - Admin operations and analytics
│
├── Middleware (Request Processing)
│   ├── Auth Middleware - JWT verification
│   └── Admin Auth - Role-based access control
│
└── Server - Express app configuration

Frontend Structure (React + Vite)
frontend/
├── Pages (Screen Components)
│   ├── Public Pages - Landing, Login, Register
│   ├── User Pages - Dashboard, Profile
│   └── Admin Pages - Admin Login, Dashboard
│
├── Components (Reusable UI)
│   ├── Navigation - Navbar components
│   ├── Forms - WorkoutForm
│   ├── Display - WorkoutList, ProgressChart
│   └── Guards - ProtectedRoute, AdminRoute
│
├── Context (State Management)
│   └── AuthContext - Global auth state
│
└── Vite Configuration - Build setup

🔄 Data Flow Architecture
┌─────────────────────────────────────────────────────────┐
│                  FRONTEND (React + Vite)                │
│  ┌──────────────────────────────────────────────────┐   │
│  │  Pages (Dashboard, Login, Profile, etc.)         │   │
│  │        ↓↑                                         │   │
│  │  Components (Forms, Lists, Charts)               │   │
│  │        ↓↑                                         │   │
│  │  Context API (AuthContext)                       │   │
│  │        ↓↑                                         │   │
│  │  Axios (HTTP Client)                             │   │
│  └──────────────────────────────────────────────────┘   │
└──────────────────────────┬──────────────────────────────┘
                           │ HTTP/REST
                           ↓↑
┌──────────────────────────────────────────────────────────┐
│               BACKEND (Express.js + Node)                │
│  ┌──────────────────────────────────────────────────┐   │
│  │  server.js (App Configuration)                   │   │
│  │        ↓↑                                         │   │
│  │  Middleware (CORS, Auth, Body Parser)            │   │
│  │        ↓↑                                         │   │
│  │  Routes (auth.js, workout.js, admin.js)          │   │
│  │        ↓↑                                         │   │
│  │  Middleware (authMiddleware, adminAuth)          │   │
│  │        ↓↑                                         │   │
│  │  Controllers/Handlers                            │   │
│  │        ↓↑                                         │   │
│  │  Models (Mongoose Schemas)                       │   │
│  │        ↓↑                                         │   │
│  │  Multer (File Upload)                            │   │
│  └──────────────────────────────────────────────────┘   │
└──────────────────────────┬──────────────────────────────┘
                           │ Connection String
                           ↓↑
┌──────────────────────────────────────────────────────────┐
│            DATABASE (MongoDB Atlas/Local)                │
│  ┌──────────────────────────────────────────────────┐   │
│  │  Collections:                                    │   │
│  │  ├── users (User accounts)                       │   │
│  │  ├── workouts (Workout records)                  │   │
│  │  └── admins (Admin accounts)                     │   │
│  └──────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────┘

📂 File Hierarchy
Root Directory
│
├── Backend (Node.js Server)
│   ├── Model Layer (Mongoose)
│   ├── Route Layer (Express)
│   ├── Middleware Layer
│   └── Server Entry Point
│
├── Frontend (React Application)
│   ├── Page Layer (UI Screens)
│   ├── Component Layer (Reusable UI)
│   ├── Context Layer (State Management)
│   ├── Build Configuration (Vite)
│   └── Index Entry Point
│
└── Git & Config Files

🎯 Folder Purpose Quick Reference
Folder	Purpose
backend/models	Database schemas and data structures
backend/routes	API endpoint handlers
backend/middleware	Request processing and authentication
backend/uploads	Stores uploaded user files
frontend/pages	Full page components (screens)
frontend/components	Reusable UI components
frontend/context	Global state management
frontend/services	API communication layer
frontend/public	Static assets


## 🔌 Backend API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---|
| POST | `/register` | Register a new user | ❌ |
| POST | `/login` | Login user and get JWT token | ❌ |
| GET | `/me` | Get current user profile | ✅ |
| PUT | `/profile` | Update user profile (name, email) | ✅ |
| PUT | `/change-password` | Change user password | ✅ |
| DELETE | `/account` | Delete user account and workouts | ✅ |
| PUT | `/profile/avatar` | Upload user profile picture | ✅ |

**Register Endpoint Example:**
```javascript
POST /api/auth/register
{
  "name": "Rishabh Ale",
  "email": "alerishabh5@example.com",
  "password": "password123"
}

Login Endpoint Example:
POST /api/auth/login
{
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}

Update Profile:

PUT /api/auth/profile
Header: Authorization: Bearer <token>
{
  "name": "",Rohan Sharma
  "email": "rohan@example.com"
}

Change Password:

PUT /api/auth/change-password
Header: Authorization: Bearer <token>
{
  "currentPassword": "oldpass123",
  "newPassword": "newpass123"
}

Update Avater:

PUT /api/auth/profile/avatar
Header: Authorization: Bearer <token>
Body: FormData with 'avatar' file

Current User:
GET /api/auth/me
Header: Authorization: Bearer <token>

Delete User:
DELETE /api/auth/account
Header: Authorization: Bearer <token>


Workout Routes (/api/workouts)
Method	Endpoint	Description	Auth Required
GET	/	Get all workouts for logged-in user	✅
POST	/	Create a new workout	✅
PUT	/:id	Update an existing workout	✅
DELETE	/:id	Delete a workout	✅
Get All Workouts:

JavaScript
GET /api/workouts
Header: Authorization: Bearer <token>

Response: [
  {
    "_id": "workout_id",
    "user": "user_id",
    "title": "Morning Run",
    "type": "cardio",
    "duration": 30,
    "calories": 300,
    "date": "2024-01-15T07:00:00Z",
    "notes": "Great session",
    "createdAt": "2024-01-15T07:30:00Z",
    "updatedAt": "2024-01-15T07:30:00Z"
  }
]
Create Workout:

JavaScript
POST /api/workouts
Header: Authorization: Bearer <token>
{
  "title": "Evening Gym",
  "type": "strength",
  "duration": 60,
  "calories": 400,
  "notes": "Leg day"
}

Required fields: title, type, duration, calories
Optional fields: date, notes
Types: 'cardio', 'strength', 'flexibility', 'cycling', 'walking'
Update Workout:

JavaScript
PUT /api/workouts/:id
Header: Authorization: Bearer <token>
{
  "title": "Updated Gym Session",
  "duration": 75,
  "calories": 450
}
Delete Workout:

JavaScript
DELETE /api/workouts/:id
Header: Authorization: Bearer <token>
Admin Routes (/api/admin)
Method	Endpoint	Description	Auth Required	Permission
POST	/login	Admin login	❌	-
GET	/users	Get all users	✅	Super Admin
DELETE	/users/:id	Delete user and workouts	✅	Super Admin
GET	/analytics	Get platform analytics	✅	Admin
POST	/create	Create new admin	❌	-
POST	/reset-password	Reset admin password	❌	-
Admin Login:

JavaScript
POST /api/admin/login
{
  "email": "admin@fitness.com",
  "password": "Admin@123"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "admin": {
    "id": "admin_id",
    "name": "Admin",
    "email": "admin@fitness.com",
    "role": "super_admin",
    "permissions": ["manage_users", "manage_workouts", "view_analytics", "manage_admins"]
  }
}
Get All Users:

JavaScript
GET /api/admin/users
Header: Authorization: Bearer <admin_token>
Delete User:

JavaScript
DELETE /api/admin/users/:id
Header: Authorization: Bearer <admin_token>
Get Analytics:

JavaScript
GET /api/admin/analytics
Header: Authorization: Bearer <admin_token>

Response:
{
  "totalUsers": 150,
  "totalWorkouts": 3250,
  "totalCalories": 975000,
  "workoutsByType": [
    { "_id": "cardio", "count": 1500 },
    { "_id": "strength", "count": 1200 },
    { "_id": "flexibility", "count": 350 },
    { "_id": "cycling", "count": 150 },
    { "_id": "walking", "count": 50 }
  ]
}
Create Admin:

JavaScript
POST /api/admin/create
{
  "name": "New Admin",
  "email": "newadmin@fitness.com",
  "password": "AdminPass123",
  "role": "super_admin"
}
Reset Admin Password:

JavaScript
POST /api/admin/reset-password
{
  "email": "admin@fitness.com",
  "newPassword": "NewPassword123"
}
📦 Database Models
User Model
JavaScript
{
  name: String (required),
  email: String (required, unique, lowercase),
  password: String (required, hashed with bcryptjs),
  avatar: String (optional, file path to uploaded image),
  createdAt: Date,
  updatedAt: Date
}
Workout Model
JavaScript
{
  user: ObjectId (reference to User, required),
  title: String (required),
  type: String (enum: 'cardio', 'strength', 'flexibility', 'cycling', 'walking'),
  duration: Number (minutes, required, minimum 1),
  calories: Number (optional, default 0, minimum 0),
  date: Date (default: current date),
  notes: String (optional),
  createdAt: Date,
  updatedAt: Date
}
Admin Model
JavaScript
{
  name: String (required),
  email: String (required, unique, lowercase),
  password: String (required, hashed with bcryptjs),
  role: String (enum: 'admin', 'super_admin', default: 'admin'),
  permissions: [String] (enum: 'manage_users', 'manage_workouts', 'view_analytics', 'manage_admins'),
  createdAt: Date,
  updatedAt: Date
}
🚀 Getting Started
Prerequisites
Node.js (v14 or higher)
npm or yarn
MongoDB instance (local or MongoDB Atlas)
Git
Installation & Setup
Step 1: Clone the Repository
bash
git clone https://github.com/Surendra-Bhujel/Fitness-Tracker.git
cd Fitness-Tracker
Step 2: Backend Setup
bash
cd backend

# Install dependencies
npm install

# Create .env file
cat > .env << EOF
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/fitness-tracker
JWT_SECRET=your_jwt_secret_key_here
PORT=5000
EOF

# Replace username, password with your MongoDB credentials
# Replace JWT_SECRET with a strong random string
Backend .env Example:

Code
MONGO_URI=mongodb+srv://surendra:pass123@cluster0.mongodb.net/fitness-tracker?retryWrites=true&w=majority
JWT_SECRET=my_super_secret_jwt_key_12345
PORT=5000
Start Backend Server:

bash
# Development with auto-reload
npm run dev

# Production
npm run start
Backend will run on http://localhost:5000

Step 3: Frontend Setup
bash
cd ../frontend

# Install dependencies
npm install

# Optional: Create .env file for API configuration
cat > .env << EOF
VITE_API_URL=http://localhost:5000
EOF
Start Frontend Development Server:

bash
npm run dev
Frontend will run on http://localhost:5173

Build for Production:

bash
npm run build
npm run preview
📋 Features Implemented
✅ User Features
Authentication

User Registration with email validation
User Login with JWT tokens (7-day expiry)
Secure password hashing with bcryptjs
Profile Management

View user profile
Update name and email
Change password with current password verification
Upload profile picture/avatar
Delete account (cascades to delete all user workouts)
Workout Management

Create new workouts with title, type, duration, calories
View all personal workouts (sorted by date)
Update existing workouts
Delete workouts
Filter workouts by type
Add notes to workouts
Analytics & Visualization

View progress charts
Track total calories burned
Workout statistics and insights
Visual graphs with Recharts
User Experience

Responsive design (mobile, tablet, desktop)
Real-time form validation
Loading states and error messages
Smooth animations with Framer Motion
Modern UI with Tailwind CSS and Bootstrap
✅ Admin Features
Admin Authentication

Admin login with role-based access
JWT token-based sessions
User Management

View all registered users
Delete users (cascades to delete user's workouts)
View user details
Platform Analytics

Total users count
Total workouts count
Total calories burned across platform
Workouts breakdown by type (cardio, strength, etc.)
Interactive analytics dashboard
Admin Management

Create new admin accounts
Reset admin passwords
Role-based permissions (admin, super_admin)
✅ Security Features
Password hashing with bcryptjs (10 salt rounds)
JWT token authentication (7-day expiry)
Protected routes with middleware
File upload validation:
Allowed formats: JPEG, JPG, PNG, WebP
Maximum file size: 5MB
Email validation with regex
Admin authorization checks
CORS enabled for secure cross-origin requests
User ownership verification for resources
🎨 Frontend Components & Pages
Pages
LandingPage: Public home page with features overview
LoginPage: User authentication form
RegisterPage: New user registration form
Dashboard: Main workout management interface
Profile: User profile and settings
AdminLogin: Admin authentication
AdminDashboard: Admin analytics and user management
AdminSettings: Admin configuration
Components
Navbar: User navigation with logout
AdminNavbar: Admin navigation
WorkoutForm: Create/edit workout form
WorkoutList: Display and manage workouts
ProgressChart: Visual analytics
ProtectedRoute: User route protection
AdminRoute: Admin route protection
🔐 Environment Variables
Backend (.env)
Code
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/fitness-tracker
JWT_SECRET=your_secret_key_here
PORT=5000
Frontend (.env) - Optional
Code
VITE_API_URL=http://localhost:5000
📝 API Usage Examples
cURL Examples
Register User:

bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
Login User:

bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
Create Workout:

bash
curl -X POST http://localhost:5000/api/workouts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your_token_here>" \
  -d '{
    "title": "Morning Run",
    "type": "cardio",
    "duration": 30,
    "calories": 300,
    "notes": "Great morning session"
  }'
Get All Workouts:

bash
curl -X GET http://localhost:5000/api/workouts \
  -H "Authorization: Bearer <your_token_here>"
Update Workout:

bash
curl -X PUT http://localhost:5000/api/workouts/<workout_id> \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your_token_here>" \
  -d '{
    "title": "Updated Run",
    "duration": 45
  }'
Delete Workout:

bash
curl -X DELETE http://localhost:5000/api/workouts/<workout_id> \
  -H "Authorization: Bearer <your_token_here>"
Get User Profile:

bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer <your_token_here>"
Admin Login:

bash
curl -X POST http://localhost:5000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@fitness.com",
    "password": "Admin@123"
  }'
Get Platform Analytics:

bash
curl -X GET http://localhost:5000/api/admin/analytics \
  -H "Authorization: Bearer <admin_token_here>"
🧪 Testing Credentials
Default Admin Account
Email: admin@fitness.com
Password: Admin@123
Test User (Create Your Own)
Register through /register page
Use credentials to login
🛠️ Development Workflow
Start both servers:

bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
Access the application:

Frontend: http://localhost:5173
Backend API: http://localhost:5000
MongoDB: Check your connection string
Development Tools:

Use browser DevTools for frontend debugging
Use Postman/Insomnia for API testing
Check console for error messages
📚 Technologies Summary Table
Layer	Technology	Version
Frontend Framework	React	19.2.6
Frontend Build	Vite	8.0.12
Styling	Tailwind CSS	4.3.0
UI Framework	Bootstrap	5.3.8
Routing	React Router	7.17.0
HTTP Client	Axios	1.17.0
Charts	Recharts	3.8.1
Animations	Framer Motion	12.40.0
Backend Framework	Express.js	5.2.1
Database	MongoDB	Latest
ODM	Mongoose	9.7.0
Authentication	JWT	9.0.3
Security	bcryptjs	3.0.3
File Upload	Multer	2.2.0
Dev Server	Nodemon	3.1.14

Implemented JWT-based auth
Password hashing with bcryptjs
Protected routes
Workout Management ✅

CRUD operations
User ownership verification
Type categorization
Admin Features ✅

Admin login and auth
User management
Platform analytics
Frontend UI ✅

React components
Responsive design
Data visualization
🤝 Contributing
We welcome contributions! Here's how to get started:

Fork the repository

bash
git clone https://github.com/YOUR-USERNAME/Fitness-Tracker.git
Create a feature branch

bash
git checkout -b feature/your-feature-name
Make your changes and commit

bash
git add .
git commit -m "Add your feature description"
Push to your fork

bash
git push origin feature/your-feature-name
Open a Pull Request on the original repository

📄 License
This project is licensed under the ISC License - see LICENSE file for details.

👨‍💻 Author
Surendra Bhujel

GitHub: @Surendra-Bhujel
Repository: Fitness-Tracker
Email: Contact through GitHub
🆘 Troubleshooting
MongoDB Connection Issues
Verify MongoDB URI in .env
Check IP whitelist on MongoDB Atlas
Ensure network connectivity
Port Already in Use
bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Or use different port
PORT=5001 npm run dev
CORS Errors
Ensure backend CORS is configured
Check frontend API URL matches backend address
JWT Token Errors
Verify JWT_SECRET is set in .env
Check token expiry (7 days)
Re-login to get new token
File Upload Issues
Check file size (max 5MB)
Verify file format (JPG, PNG, WebP)
Ensure uploads directory exists
📈 Future Enhancements
 Social features (friend connections, leaderboard)
 Workout recommendations based on history
 Goal setting and progress tracking
 Email notifications
 Mobile app (React Native)
 Integration with fitness wearables
 Advanced analytics and reports
 Subscription/Premium features
 Real-time notifications with WebSockets
 Workout templates and guided programs
 Social sharing functionality
 AI-powered fitness coaching
📞 Support & Issues
If you encounter any issues:

