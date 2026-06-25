import React, { useState, useEffect } from 'react';
import { FaFire } from 'react-icons/fa';

const ACCENT = '#6366f1';

const WORKOUT_TYPES = [
  { value: 'cardio', label: 'Cardio', met: 8.0 },
  { value: 'strength', label: 'Strength', met: 6.0 },
  { value: 'flexibility', label: 'Flexibility', met: 4.0 },
  { value: 'swimming', label: 'Swimming', met: 9.5 },
  { value: 'cycling', label: 'Cycling', met: 8.5 },
  { value: 'walking', label: 'Walking', met: 4.5 },
];

const WorkoutForm = ({ onSubmit, dark = false }) => {
  const [formData, setFormData] = useState({
    title: '',
    type: 'cardio',
    duration: '',
    calories: '',
    date: new Date().toISOString().split('T')[0],
    notes: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [userWeight, setUserWeight] = useState(70); // Default weight
  const [autoCalc, setAutoCalc] = useState(true);

  // Load user weight from localStorage
  useEffect(() => {
    const savedWeight = localStorage.getItem('userWeight');
    if (savedWeight) {
      setUserWeight(parseFloat(savedWeight));
    }
  }, []);

  // Auto-calculate calories
  useEffect(() => {
    if (!autoCalc) return;
    if (formData.duration && parseFloat(formData.duration) > 0) {
      const met = WORKOUT_TYPES.find(t => t.value === formData.type)?.met || 6.0;
      const duration = parseFloat(formData.duration);
      const calories = Math.round(met * userWeight * (duration / 60));
      setFormData(prev => ({ ...prev, calories: calories.toString() }));
    } else {
      setFormData(prev => ({ ...prev, calories: '' }));
    }
  }, [formData.type, formData.duration, userWeight, autoCalc]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'calories') {
      setAutoCalc(false);
      setFormData(prev => ({ ...prev, calories: value }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
      if (name === 'type' || name === 'duration') setAutoCalc(true);
    }
  };

  const handleWeightChange = (e) => {
    const weight = parseFloat(e.target.value) || '';
    setUserWeight(weight);
    localStorage.setItem('userWeight', weight);
    setAutoCalc(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!formData.title.trim()) { setError('Exercise name is required.'); return; }
    if (!formData.duration) { setError('Duration is required.'); return; }

    setLoading(true);
    try {
      await onSubmit({
        title: formData.title.trim(),
        type: formData.type,
        duration: Number(formData.duration),
        calories: Number(formData.calories) || 0,
        date: formData.date,
        notes: formData.notes.trim(),
      });
      // Reset form
      setFormData({
        title: '',
        type: 'cardio',
        duration: '',
        calories: '',
        date: new Date().toISOString().split('T')[0],
        notes: '',
      });
      setAutoCalc(true);
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to add workout. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '9px 12px',
    borderRadius: 8,
    border: `1px solid ${dark ? 'rgba(255,255,255,0.15)' : '#cbd5e1'}`,
    background: dark ? '#0f172a' : '#f8fafc',
    color: dark ? '#f1f5f9' : '#0f172a',
    fontSize: 13,
    outline: 'none',
  };

  const labelStyle = {
    fontSize: 11,
    fontWeight: 700,
    color: dark ? 'rgba(255,255,255,0.55)' : '#475569',
    display: 'block',
    marginBottom: 5,
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
  };

  // Preview calories
  const previewCalories = formData.duration && parseFloat(formData.duration) > 0
    ? (() => {
        const met = WORKOUT_TYPES.find(t => t.value === formData.type)?.met || 6.0;
        return Math.round(met * userWeight * (parseFloat(formData.duration) / 60));
      })()
    : 0;

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {error && (
        <div style={{
          background: 'rgba(239,68,68,0.1)',
          border: '1px solid rgba(239,68,68,0.3)',
          borderRadius: 9,
          padding: '10px 14px',
          fontSize: 13,
          color: '#ef4444'
        }}>
          {error}
        </div>
      )}

      {/* User Weight Input */}
      <div>
        <label style={labelStyle}>Your Weight (kg)</label>
        <input
          style={inputStyle}
          type="number"
          value={userWeight}
          onChange={handleWeightChange}
          placeholder="e.g. 70"
          min="30"
          max="300"
        />
      </div>

      <div>
        <label style={labelStyle}>Exercise Name *</label>
        <input
          style={inputStyle}
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="e.g. Bench press, Morning run..."
          required
        />
      </div>

      <div>
        <label style={labelStyle}>Workout Type</label>
        <select
          style={inputStyle}
          name="type"
          value={formData.type}
          onChange={handleChange}
        >
          {WORKOUT_TYPES.map(t => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <div>
          <label style={labelStyle}>Duration (minutes) *</label>
          <input
            style={inputStyle}
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            placeholder="e.g. 45"
            min="1"
            max="600"
            required
          />
        </div>
        <div>
          <label style={{ ...labelStyle, display: 'flex', alignItems: 'center', gap: 6 }}>
            <FaFire size={11} color="#ef4444" />
            Calories Burned
            {autoCalc && formData.duration && (
              <span style={{
                fontSize: 10,
                color: '#6366f1',
                background: 'rgba(99,102,241,0.12)',
                padding: '1px 6px',
                borderRadius: 10,
                fontWeight: 600
              }}>
                auto
              </span>
            )}
          </label>
          <input
            style={inputStyle}
            type="number"
            name="calories"
            value={formData.calories}
            onChange={handleChange}
            placeholder="auto-calculated"
            min="0"
          />
        </div>
      </div>

      {/* Auto-calc info banner */}
      {formData.duration && previewCalories > 0 && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '10px 14px',
          borderRadius: 9,
          background: dark ? 'rgba(99,102,241,0.1)' : '#eef2ff',
          border: `1px solid ${dark ? 'rgba(99,102,241,0.25)' : '#c7d2fe'}`,
          fontSize: 12
        }}>
          <FaFire size={13} color="#ef4444" />
          <span style={{ color: dark ? '#a5b4fc' : '#4338ca' }}>
            Estimated <strong>{previewCalories} kcal</strong> for {formData.duration} min of {formData.type} at {userWeight} kg
            {!autoCalc && ' (you entered a custom value)'}
          </span>
          {!autoCalc && (
            <button
              type="button"
              onClick={() => setAutoCalc(true)}
              style={{
                marginLeft: 'auto',
                fontSize: 11,
                color: '#6366f1',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 600,
                whiteSpace: 'nowrap'
              }}
            >
              Reset to auto
            </button>
          )}
        </div>
      )}

      <div>
        <label style={labelStyle}>Date</label>
        <input
          style={inputStyle}
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
      </div>

      <div>
        <label style={labelStyle}>Notes (optional)</label>
        <textarea
          style={{ ...inputStyle, resize: 'vertical', minHeight: 70 }}
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="How did it feel? Any achievements?"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        style={{
          padding: '11px 0',
          border: 'none',
          borderRadius: 9,
          background: loading ? 'rgba(99,102,241,0.5)' : 'linear-gradient(90deg,#6366f1,#8b5cf6)',
          color: '#fff',
          fontSize: 14,
          fontWeight: 700,
          cursor: loading ? 'not-allowed' : 'pointer',
          transition: 'opacity 0.2s',
        }}
      >
        {loading ? 'Adding...' : '+ Add Workout'}
      </button>
    </form>
  );
};

export default WorkoutForm;