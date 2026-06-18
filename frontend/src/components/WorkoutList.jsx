import React, { useState } from 'react';

const WorkoutList = ({ workouts, onUpdate, onDelete }) => {
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  const startEdit = (workout) => {
    setEditingId(workout._id);
    setEditForm(workout);
  };

  const saveEdit = async () => {
    await onUpdate(editingId, editForm);
    setEditingId(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle">
        <thead className="table-light">
          <tr>
            <th><i className="bi bi-calendar3"></i> Date</th>
            <th><i className="bi bi-dumbbell"></i> Exercise</th>
            <th><i className="bi bi-clock"></i> Duration</th>
            <th><i className="bi bi-fire"></i> Calories</th>
            <th>Notes</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {workouts.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center py-5 text-muted">
                <i className="bi bi-clipboard-x display-4 d-block mb-3"></i>
                No workouts yet. Add your first workout!
              </td>
            </tr>
          ) : (
            workouts.map((workout) => (
              <tr key={workout._id}>
                {editingId === workout._id ? (
                  // Edit Mode
                  <>
                    <td>
                      <input
                        type="date"
                        className="form-control form-control-sm"
                        value={editForm.date}
                        onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={editForm.exercise}
                        onChange={(e) => setEditForm({ ...editForm, exercise: e.target.value })}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        value={editForm.duration}
                        onChange={(e) => setEditForm({ ...editForm, duration: e.target.value })}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        value={editForm.calories}
                        onChange={(e) => setEditForm({ ...editForm, calories: e.target.value })}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={editForm.notes || ''}
                        onChange={(e) => setEditForm({ ...editForm, notes: e.target.value })}
                      />
                    </td>
                    <td className="text-center">
                      <button className="btn btn-sm btn-success me-2" onClick={saveEdit}>
                        <i className="bi bi-check-lg"></i>
                      </button>
                      <button className="btn btn-sm btn-secondary" onClick={cancelEdit}>
                        <i className="bi bi-x-lg"></i>
                      </button>
                    </td>
                  </>
                ) : (
                  // View Mode
                  <>
                    <td>{new Date(workout.date).toLocaleDateString()}</td>
                    <td className="fw-medium">{workout.exercise}</td>
                    <td>{workout.duration} min</td>
                    <td>{workout.calories || 0} cal</td>
                    <td className="text-muted small">{workout.notes}</td>
                    <td className="text-center">
                      <button
                        className="btn btn-sm btn-outline-primary me-2"
                        onClick={() => startEdit(workout)}
                      >
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => onDelete(workout._id)}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default WorkoutList;