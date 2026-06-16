import React, { useState } from 'react';
import WorkoutForm from './WorkoutForm';

const WorkoutList = ({ workouts, onUpdate, onDelete }) => {
  const [editingId, setEditingId] = useState(null);

  const getTypeBadgeColor = (type) => {
    switch(type) {
      case 'cardio': return 'bg-danger';
      case 'strength': return 'bg-success';
      case 'flexibility': return 'bg-info';
      default: return 'bg-secondary';
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (workouts.length === 0) {
    return (
      <div className="text-center py-4">
        <p className="text-muted">No workouts yet. Add your first workout!</p>
      </div>
    );
  }

  return (
    <div className="workout-list">
      {workouts.map((workout) => (
        <div key={workout._id} className="card mb-3">
          <div className="card-body">
            {editingId === workout._id ? (
              <>
                <h6 className="mb-3">Edit Workout</h6>
                <WorkoutForm
                  onSubmit={async (data) => {
                    await onUpdate(workout._id, data);
                    setEditingId(null);
                  }}
                  initialData={workout}
                />
                <button
                  className="btn btn-secondary mt-2"
                  onClick={() => setEditingId(null)}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h5 className="card-title">{workout.title}</h5>
                    <span className={`badge ${getTypeBadgeColor(workout.type)} me-2`}>
                      {workout.type}
                    </span>
                    <span className="badge bg-secondary">
                      {formatDate(workout.date)}
                    </span>
                  </div>
                  <div>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => setEditingId(workout._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => {
                        if (window.confirm('Are you sure you want to delete this workout?')) {
                          onDelete(workout._id);
                        }
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <div className="mt-2">
                  <p className="mb-1">
                    <strong>Duration:</strong> {workout.duration} min | 
                    <strong> Calories:</strong> {workout.calories} kcal
                  </p>
                  {workout.notes && (
                    <p className="text-muted small mb-0">{workout.notes}</p>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default WorkoutList;