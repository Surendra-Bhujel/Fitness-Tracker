const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const User = require('../models/User');
const Workout = require('../models/Workout');
const { adminAuth, checkPermission } = require('../middleware/adminAuth');

// Admin Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    
    if (!admin) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    const token = jwt.sign(
      { adminId: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    res.json({
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        permission: admin.permission
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all users (Super Admin only)
router.get('/users', adminAuth, checkPermission('manage_users'), async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete user (Super Admin only)
router.delete('/users/:id', adminAuth, checkPermission('manage_users'), async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    await Workout.deleteMany({ user: req.params.id });
    res.json({ message: 'User and all workouts deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get platform analytics
router.get('/analytics', adminAuth, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalWorkouts = await Workout.countDocuments();
    const totalCalories = await Workout.aggregate([
      { $group: { _id: null, total: { $sum: '$calories' } } }
    ]);
    
    const workoutsByType = await Workout.aggregate([
      { $group: { _id: '$type', count: { $sum: 1 } } }
    ]);
    
    res.json({
      totalUsers,
      totalWorkouts,
      totalCalories: totalCalories[0]?.total || 0,
      workoutsByType
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

//create admin (only for development)
router.post('/create', async (req, res) => {
  try {
    const { name, email, password, role = 'super_admin' } = req.body;
    
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists' });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create admin with full permissions
    const admin = new Admin({
      name,
      email,
      password: hashedPassword,
      role: 'super_admin',
      permissions: ['manage_users', 'manage_workouts', 'view_analytics', 'manage_admins']
    });
    
    await admin.save();
    
    res.status(201).json({
      message: 'Super Admin created successfully',
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});



module.exports = router;