const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const User = require('../models/User');
const Workout = require('../models/Workout');
const { adminAuth, checkPermission } = require('../middleware/adminAuth');

// Admin Login - WITH DEBUG LOGS
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // 🔍 DEBUG - Check what's coming from frontend
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🔐 Login Attempt:');
    console.log('Email:', email);
    console.log('Password length:', password?.length || 0);
    
    // Find admin
    const admin = await Admin.findOne({ email });
    console.log('Admin found:', admin ? '✅ YES' : '❌ NO');
    
    if (!admin) {
      console.log('❌ Admin not found with email:', email);
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    // 🔍 DEBUG - Check hash format
    console.log('Stored hash:', admin.password);
    console.log('Hash starts with $2a$10$:', admin.password.startsWith('$2a$10$') ? '✅ YES' : '❌ NO');
    console.log('Hash starts with $2b$10$:', admin.password.startsWith('$2b$10$') ? '✅ YES' : '❌ NO');
    
    // Compare password
    const isMatch = await bcrypt.compare(password, admin.password);
    console.log('Password match:', isMatch ? '✅ YES' : '❌ NO');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    // Generate token
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
        permissions: admin.permissions
      }
    });
  } catch (error) {
    console.error('❌ Login Error:', error);
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

// Create admin (only for development) - WITH FIX
router.post('/create', async (req, res) => {
  try {
    const { name, email, password, role = 'super_admin' } = req.body;
    
    console.log('📝 Creating admin with email:', email);
    
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      console.log('❌ Admin already exists with email:', email);
      return res.status(400).json({ message: 'Admin already exists' });
    }
    
    // Hash password with proper salt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    console.log('✅ Hash generated:', hashedPassword);
    console.log('Hash starts with $2a$10$:', hashedPassword.startsWith('$2a$10$') ? '✅ YES' : '❌ NO');
    
    // Create admin with full permissions
    const admin = new Admin({
      name,
      email,
      password: hashedPassword,
      role: 'super_admin',
      permissions: ['manage_users', 'manage_workouts', 'view_analytics', 'manage_admins']
    });
    
    await admin.save();
    
    console.log('✅ Admin created successfully!');
    console.log('Email:', email);
    console.log('Password:', password);
    
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
    console.error('❌ Error creating admin:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// 🔥 NEW: Quick fix route to reset admin password
router.post('/reset-password', async (req, res) => {
  try {
    const { email = 'admin@fitness.com', newPassword = 'Admin@123' } = req.body;
    
    console.log('🔧 Resetting password for:', email);
    
    // Check if admin exists
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    
    // Generate proper hash
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    
    // Update password
    admin.password = hashedPassword;
    await admin.save();
    
    console.log('✅ Password reset successfully!');
    console.log('New hash:', hashedPassword);
    
    res.json({
      message: 'Password reset successfully',
      email: email,
      password: newPassword
    });
  } catch (error) {
    console.error('❌ Error resetting password:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;