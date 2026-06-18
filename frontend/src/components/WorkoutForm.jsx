import React, { useState } from 'react';

const WorkoutForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '', // Changed from 'exercise' to 'title'
    type: 'cardio', // Added 'type' field
    duration: '',
    calories: '',
    date: new Date().toISOString().split('T')[0],
    notes: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.duration) return;
    
    onSubmit({
      title: formData.title, // Changed from 'exercise'
      type: formData.type, // Added 'type'
      duration: Number(formData.duration),
      calories: Number(formData.calories) || 0,
      date: formData.date,
      notes: formData.notes
    });

    // Reset form
    setFormData({
      title: '',
      type: 'cardio',
      duration: '',
      calories: '',
      date: new Date().toISOString().split('T')[0],
      notes: ''
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">
          <i className="bi bi-dumbbell me-2"></i>Exercise Name
        </label>
        <input
          type="text"
          className="form-control"
          name="title" // Changed from 'exercise'
          value={formData.title} // Changed from 'exercise'
          onChange={handleChange}
          placeholder="e.g. Bench Press"
          required
        />
      </div>

      {/* Added Workout Type Dropdown */}
      <div className="mb-3">
        <label className="form-label">
          <i className="bi bi-tag me-2"></i>Workout Type
        </label>
        <select
          className="form-select"
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
        >
          <option value="cardio">Cardio</option>
          <option value="strength">Strength</option>
          <option value="flexibility">Flexibility</option>
          <option value="swimming">Swimming</option>
          <option value="cycling">Cycling</option>
          <option value="walking">Walking</option>
        </select>
      </div>

      <div className="row">
        <div className="col-6 mb-3">
          <label className="form-label">
            <i className="bi bi-clock me-2"></i>Duration (min)
          </label>
          <input
            type="number"
            className="form-control"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            placeholder="45"
            required
          />
        </div>
        <div className="col-6 mb-3">
          <label className="form-label">
            <i className="bi bi-fire me-2"></i>Calories Burned
          </label>
          <input
            type="number"
            className="form-control"
            name="calories"
            value={formData.calories}
            onChange={handleChange}
            placeholder="320"
          />
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">
          <i className="bi bi-calendar-date me-2"></i>Date
        </label>
        <input
          type="date"
          className="form-control"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">
          <i className="bi bi-journal-text me-2"></i>Notes
        </label>
        <textarea
          className="form-control"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows="2"
          placeholder="Felt strong today..."
        />
      </div>

      <button type="submit" className="btn btn-success w-100">
        <i className="bi bi-plus-circle me-2"></i>Add Workout
      </button>
    </form>
  );
};

export default WorkoutForm;