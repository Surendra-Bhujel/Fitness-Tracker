const router = require('express').Router();
const authMiddleware = require('../middleware/authMiddleware');
const Workout = require('../models/Workout');

// All routes below are protected - apply auth middleware
router.use(authMiddleware);

// GET /api/workouts - Get all workout for logged in user
router.get('/', async (req, res) => {
    try {
        console.log('📊 GET /workouts - User ID:', req.user);
        const workouts = await Workout.find({ user: req.user })
            .sort({ date: -1 });
        res.json(workouts);
    } catch (error) {
        console.error('❌ Error fetching workouts:', error);
        res.status(500).json({
            message: 'Server Error',
            error: error.message
        });
    }
});

// POST api/workouts - Create a new workout entry
router.post('/', async (req, res) => {
    try {
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('📝 POST /workouts - Creating workout');
        console.log('👤 User ID from token:', req.user);
        console.log('📦 Request body:', req.body);
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

        const { title, type, duration, calories, date, notes } = req.body;

        // Validate required fields
        if (!title || !type || !duration || !calories) {
            console.log('❌ Missing required fields');
            return res.status(400).json({
                message: 'Missing required fields: title, type, duration, calories'
            });
        }

        // Check if user exists
        if (!req.user) {
            console.log('❌ No user ID found in request!');
            return res.status(401).json({
                message: 'Unauthorized: No user ID found'
            });
        }

        // Create workout with proper user ID
        const workout = new Workout({
            user: req.user, // This should be the user ID from auth middleware
            title: title.trim(),
            type: type,
            duration: Number(duration),
            calories: Number(calories),
            date: date || new Date(),
            notes: notes || ''
        });

        console.log('✅ Workout object created:', workout);

        await workout.save();
        console.log('✅ Workout saved successfully! ID:', workout._id);
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

        res.status(201).json(workout);
    } catch (error) {
        console.error('❌ Error creating workout:', error);
        console.error('❌ Error stack:', error.stack);
        res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
});

// PUT api/workouts/:id - Update an existing workout
router.put('/:id', async (req, res) => {
    try {
        console.log('✏️ PUT /workouts/:id - Updating workout');
        console.log('📦 Request body:', req.body);

        const { title, type, duration, calories, date, notes } = req.body;

        // Find workout and check ownership
        let workout = await Workout.findById(req.params.id);
        if (!workout) {
            return res.status(404).json({
                message: 'Workout not found'
            });
        }

        // Check if user owns the workout
        if (workout.user.toString() !== req.user) {
            console.warn('⚠️ User not authorized to update workout:', req.user);
            return res.status(401).json({ message: 'Not authorized' });
        }

        // Update fields
        workout.title = title || workout.title;
        workout.type = type || workout.type;
        workout.duration = duration || workout.duration;
        workout.calories = calories || workout.calories;
        workout.date = date || workout.date;
        workout.notes = notes || workout.notes;

        await workout.save();
        console.log('✅ Workout updated:', workout._id);
        res.json(workout);
    } catch (error) {
        console.error('❌ Error updating workout:', error);
        res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
});

// DELETE /api/workouts/:id - Delete a workout entry
router.delete('/:id', async (req, res) => {
    try {
        console.log('🗑️ DELETE /workouts/:id - Deleting workout');

        const workout = await Workout.findById(req.params.id);
        if (!workout) {
            return res.status(404).json({
                message: 'Workout not found'
            });
        }

        // Check if user owns the workout
        if (workout.user.toString() !== req.user) {
            console.warn('⚠️ User not authorized to delete workout:', req.user);
            return res.status(401).json({
                message: 'Not Authorized'
            });
        }

        await workout.deleteOne();
        console.log('✅ Workout deleted:', req.params.id);
        res.json({
            message: 'Workout deleted successfully'
        });
    } catch (error) {
        console.error('❌ Error deleting workout:', error);
        res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
});

module.exports = router;