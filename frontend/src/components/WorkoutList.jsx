import React, { useState } from 'react';
import { FaEdit, FaTrash, FaCheck, FaTimes, FaDumbbell } from 'react-icons/fa';

const ACCENT  = '#6366f1';
const inputSm = {
  padding: '5px 8px', borderRadius: 6, fontSize: 12,
  border: '0.5px solid rgba(0,0,0,0.15)', width: '100%', outline: 'none',
};

const TYPE_COLORS = {
  cardio:      { bg: '#ecfdf5', color: '#065f46' },
  strength:    { bg: '#eef2ff', color: '#3730a3' },
  flexibility: { bg: '#fdf4ff', color: '#7e22ce' },
  swimming:    { bg: '#e0f2fe', color: '#0c4a6e' },
  cycling:     { bg: '#fff7ed', color: '#9a3412' },
  walking:     { bg: '#f0fdf4', color: '#14532d' },
};

function TypeBadge({ type }) {
  const c = TYPE_COLORS[type] || { bg: '#f1f5f9', color: '#475569' };
  return (
    <span style={{
      background: c.bg, color: c.color,
      fontSize: 11, fontWeight: 500, padding: '2px 8px',
      borderRadius: 20, display: 'inline-block', marginTop: 2,
    }}>
      {type ? type.charAt(0).toUpperCase() + type.slice(1) : '—'}
    </span>
  );
}

const WorkoutList = ({ workouts, onUpdate, onDelete }) => {
  const [editingId, setEditingId] = useState(null);
  const [editForm,  setEditForm]  = useState({});
  const [saving,    setSaving]    = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const startEdit = (w) => { setEditingId(w._id); setEditForm({ ...w }); };
  const cancelEdit = () => setEditingId(null);

  const saveEdit = async () => {
    setSaving(true);
    try {
      await onUpdate(editingId, {
        ...editForm,
        duration: Number(editForm.duration),
        calories: Number(editForm.calories) || 0,
      });
      setEditingId(null);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this workout?')) return;
    setDeletingId(id);
    try { await onDelete(id); } finally { setDeletingId(null); }
  };

  if (workouts.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '48px 24px', color: '#9ca3af' }}>
        <FaDumbbell size={36} style={{ marginBottom: 12, opacity: 0.3 }} />
        <p style={{ fontSize: 14, marginBottom: 4 }}>No workouts logged yet</p>
        <p style={{ fontSize: 12 }}>Add your first workout using the form</p>
      </div>
    );
  }

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
        <thead>
          <tr style={{ borderBottom: '0.5px solid rgba(0,0,0,0.08)' }}>
            {['Date','Exercise','Type','Duration','Calories','Notes',''].map(h => (
              <th key={h} style={{ padding: '10px 14px', fontWeight: 500, color: '#6b7280', textAlign: 'left', whiteSpace: 'nowrap' }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {workouts.map((w) => (
            <tr key={w._id} style={{ borderBottom: '0.5px solid rgba(0,0,0,0.05)' }}>
              {editingId === w._id ? (
                <>
                  <td style={{ padding: '8px 10px' }}>
                    <input type="date" style={inputSm} value={editForm.date?.split('T')[0] || ''}
                      onChange={e => setEditForm(p => ({ ...p, date: e.target.value }))} />
                  </td>
                  <td style={{ padding: '8px 10px' }}>
                    <input type="text" style={inputSm} value={editForm.title || ''}
                      onChange={e => setEditForm(p => ({ ...p, title: e.target.value }))} />
                  </td>
                  <td style={{ padding: '8px 10px' }}>
                    <select style={inputSm} value={editForm.type || 'cardio'}
                      onChange={e => setEditForm(p => ({ ...p, type: e.target.value }))}>
                      {['cardio','strength','flexibility','swimming','cycling','walking'].map(t => (
                        <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
                      ))}
                    </select>
                  </td>
                  <td style={{ padding: '8px 10px' }}>
                    <input type="number" style={{ ...inputSm, width: 60 }} value={editForm.duration || ''}
                      onChange={e => setEditForm(p => ({ ...p, duration: e.target.value }))} />
                  </td>
                  <td style={{ padding: '8px 10px' }}>
                    <input type="number" style={{ ...inputSm, width: 60 }} value={editForm.calories || ''}
                      onChange={e => setEditForm(p => ({ ...p, calories: e.target.value }))} />
                  </td>
                  <td style={{ padding: '8px 10px' }}>
                    <input type="text" style={inputSm} value={editForm.notes || ''}
                      onChange={e => setEditForm(p => ({ ...p, notes: e.target.value }))} />
                  </td>
                  <td style={{ padding: '8px 10px', whiteSpace: 'nowrap' }}>
                    <button onClick={saveEdit} disabled={saving} style={{ marginRight: 4, padding: '4px 10px', border: 'none', borderRadius: 6, background: '#10b981', color: '#fff', cursor: 'pointer', fontSize: 12 }}>
                      {saving ? '…' : <FaCheck size={10} />}
                    </button>
                    <button onClick={cancelEdit} style={{ padding: '4px 10px', border: 'none', borderRadius: 6, background: '#6b7280', color: '#fff', cursor: 'pointer', fontSize: 12 }}>
                      <FaTimes size={10} />
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td style={{ padding: '10px 14px', color: '#6b7280', whiteSpace: 'nowrap' }}>
                    {new Date(w.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>
                  <td style={{ padding: '10px 14px', fontWeight: 500 }}>
                    {w.title || w.exercise || '—'}
                  </td>
                  <td style={{ padding: '10px 14px' }}>
                    <TypeBadge type={w.type} />
                  </td>
                  <td style={{ padding: '10px 14px' }}>{w.duration} min</td>
                  <td style={{ padding: '10px 14px' }}>{w.calories || 0} kcal</td>
                  <td style={{ padding: '10px 14px', color: '#9ca3af', maxWidth: 140, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {w.notes || '—'}
                  </td>
                  <td style={{ padding: '10px 14px', whiteSpace: 'nowrap' }}>
                    <button onClick={() => startEdit(w)} style={{ marginRight: 6, padding: '5px 10px', border: `0.5px solid ${ACCENT}`, borderRadius: 6, background: 'transparent', color: ACCENT, cursor: 'pointer' }}>
                      <FaEdit size={11} />
                    </button>
                    <button onClick={() => handleDelete(w._id)} disabled={deletingId === w._id}
                      style={{ padding: '5px 10px', border: '0.5px solid #ef4444', borderRadius: 6, background: 'transparent', color: '#ef4444', cursor: 'pointer' }}>
                      {deletingId === w._id ? '…' : <FaTrash size={11} />}
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WorkoutList;