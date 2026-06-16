// models/Workout.js

const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['cardio', 'strength', 'flexibility']
    },
    duration: {
        type: Number, // in minutes
        required: true,
        min:1
    },
    calories: {
        type: Number,
        required: true,  
        min: 0
    },
    date: {
        type: Date,
        default: Date.now
    },
    notes: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Workout', workoutSchema);