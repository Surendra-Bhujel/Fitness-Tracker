const Workout = require('../models/Workout');

const getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({ user: req.user }).sort({ date: -1 });
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const createWorkout = async (req, res) => {
  try {
    const { title, type, duration, calories, date, notes } = req.body;

    if (!title || !type || !duration) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const workout = new Workout({
      user: req.user,
      title: title.trim(),
      type,
      duration: Number(duration),
      calories: Number(calories) || 0,
      date: date || new Date(),
      notes: notes || ''
    });

    await workout.save();
    res.status(201).json(workout);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updateWorkout = async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);

    if (!workout) return res.status(404).json({ message: 'Workout not found' });
    if (workout.user.toString() !== req.user) return res.status(401).json({ message: 'Not authorized' });

    Object.assign(workout, req.body);
    await workout.save();

    res.json(workout);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteWorkout = async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);

    if (!workout) return res.status(404).json({ message: 'Workout not found' });
    if (workout.user.toString() !== req.user) return res.status(401).json({ message: 'Not authorized' });

    await workout.deleteOne();
    res.json({ message: 'Workout deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getWorkouts,
  createWorkout,
  updateWorkout,
  deleteWorkout
};