const router = require('express').Router();
const authMiddleware = require('../middleware/authMiddleware');
const Workout = require('../models/Workout');

// All routes below are protected - apply auth middleware 
router.use(authMiddleware);


// GET /api/workouts - Get all workout for logged in user
router.get('/', async (req, res)=>{
    try{
        const workouts = await Workout.find({user: req.user})
        .sort({date: -1}); // latest first 
        res.json(workouts);
    }catch(error){
        res.status(500).json({
            message: 'Server Error',
            error: error.message
        });
    }
});


//POST api/workouts - Create a new workout entry
router.post('/', async (req, res)=>{
    try{
        const {title, type, duration, calories, date, notes } = req.body;
        
        // Validate required fields
        if (!title || !type || !duration || !calories) {
            return res.status(400).json({
                message: 'Missing required fields: title, type, duration, calories'
            });
        }
        
        const workout = new Workout({
            user: req.user,
            title,
            type,
            duration,
            calories,
            date: date || Date.now(),
            notes
        });
        
        await workout.save();
        res.status(201).json(workout);
    }catch(error){
        res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
});

//PUT api/workout/:id - Update an existing workout 
router.put('/:id', async(req, res)=>{
    try{
        const {title, type, duration, calories, date, notes} = req.body;


        // Find workout and check ownership 
        let workout = await Workout.findById(req.params.id);
        if(!workout){
            return res.status(404).json({
                message: 'Workout not found'
            });
        }

        // Check if user owns the workout
        if(workout.user.toString() != req.user){
            return res.status(401).json({message: 'Not authorized'});
        }

        // Update fields
        workout.title = title || workout.title;
        workout.type = type || workout.type;
        workout.duration = duration || workout.duration;
        workout.calories = calories || workout.calories;
        workout.date = date || workout.date;
        workout.notes = notes || workout.notes;

        await workout.save();
        res.json(workout);

    }catch(error){
        res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
});


// Delete /api/workouts/:id = Delete a workout entry
router.delete('/:id', async(req, res)=>{
    try{
        const workout = await Workout.findById(req.params.id);
        if(!workout){
            return res.status(404).json({
                message: 'Workout not found'
            });
        }

        // Check if users owns the workout 
        if(workout.user.toString() != req.user){
            return res.status(404).json({
                message: 'Not Authorized'
            });
        }

        await workout.deleteOne();
        res.json({
            message: 'Workout deleted successfully'
        });
    }catch(error){
        res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
});

module.exports = router;