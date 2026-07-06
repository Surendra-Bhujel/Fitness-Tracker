const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");         
require("dotenv").config();



const app = express();

// MIDDLEWARE 
app.use(cors());
app.use(express.json()); // to parse JSON body

// ROUTES
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/workouts', require('./routes/workoutRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// DB CONNECTION 
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1); // stop server if DB fails
  }
};

// START SERVER 
const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server running on port ${PORT}`);
});