import React, { useState } from 'react';

const WorkoutForm = ({ onSubmit, initialData = null }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [type, setType] = useState(initialData?.type || 'cardio');
  const [duration, setDuration] = useState(initialData?.duration || '');
  const [calories, setCalories] = useState(initialData?.calories || '');
  const [notes, setNotes] = useState(initialData?.notes || '');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await onSubmit({
        title,
        type,
        duration: parseInt(duration),
        calories: parseInt(calories),
        notes
      });
      
      // Reset form if no initial data
      if (!initialData) {
        setTitle('');
        setType('cardio');
        setDuration('');
        setCalories('');
        setNotes('');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Workout Title</label>
        <input
          type="text"
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="e.g., Morning Run"
        />
      </div>
      
      <div className="mb-3">
        <label className="form-label">Type</label>
        <select
          className="form-select"
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
        >
          <option value="cardio">Cardio</option>
          <option value="strength">Strength</option>
          <option value="flexibility">Flexibility</option>
        </select>
      </div>
      
      <div className="mb-3">
        <label className="form-label">Duration (minutes)</label>
        <input
          type="number"
          className="form-control"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          required
          min="1"
        />
      </div>
      
      <div className="mb-3">
        <label className="form-label">Calories Burned</label>
        <input
          type="number"
          className="form-control"
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
          required
          min="0"
        />
      </div>
      
      <div className="mb-3">
        <label className="form-label">Notes (optional)</label>
        <textarea
          className="form-control"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows="2"
        />
      </div>
      
      <button 
        type="submit" 
        className="btn btn-primary w-100"
        disabled={loading}
      >
        {loading ? 'Saving...' : initialData ? 'Update Workout' : 'Add Workout'}
      </button>
    </form>
  );
};

export default WorkoutForm;