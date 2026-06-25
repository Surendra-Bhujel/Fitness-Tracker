// models/Workout.js

const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        enum: ['cardio', 'strength', 'flexibility', 'cycling', 'walking'],
        default: 'cardio'
    },
    duration: {
        type: Number, // in minutes
        required: true,
        min:1
    },
    calories: {
        type: Number,
        required: false,  
        default: 0,
        min: 0
    },
    date: {
        type: Date,
        default: Date.now
    },
    notes: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Workout', workoutSchema);