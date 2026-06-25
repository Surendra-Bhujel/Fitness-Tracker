import React from 'react';
import {
  LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { FaDumbbell } from 'react-icons/fa';

const ProgressChart = ({ workouts }) => {
  const data = (() => {
    const today = new Date();
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(today);
      d.setDate(today.getDate() - (6 - i));
      const dateStr = d.toISOString().split('T')[0];
      const hits = workouts.filter(w => new Date(w.date).toISOString().split('T')[0] === dateStr);
      return {
        day: d.toLocaleDateString('en-US', { weekday: 'short' }),
        calories: hits.reduce((s, w) => s + (w.calories || 0), 0),
        duration: hits.reduce((s, w) => s + (w.duration || 0), 0),
      };
    });
  })();

  if (workouts.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '48px 24px', color: '#9ca3af' }}>
        <FaDumbbell size={36} style={{ marginBottom: 12, opacity: 0.25 }} />
        <p style={{ fontSize: 14, marginBottom: 4 }}>No data yet</p>
        <p style={{ fontSize: 12 }}>Complete workouts to see your progress charts</p>
      </div>
    );
  }

  const tooltipStyle = {
    contentStyle: { background: '#1e293b', border: 'none', borderRadius: 8, color: '#f1f5f9', fontSize: 12 },
    labelStyle: { color: '#94a3b8' },
  };

  const axisProps = { stroke: '#94a3b8', fontSize: 11 };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
      <div>
        <p style={{ fontSize: 12, fontWeight: 500, color: '#6b7280', marginBottom: 12 }}>
          Calories burned — last 7 days
        </p>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
            <XAxis dataKey="day" {...axisProps} />
            <YAxis {...axisProps} />
            <Tooltip {...tooltipStyle} />
            <Line type="monotone" dataKey="calories" stroke="#6366f1" strokeWidth={2.5}
              dot={{ fill: '#6366f1', r: 4 }} name="Calories" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div>
        <p style={{ fontSize: 12, fontWeight: 500, color: '#6b7280', marginBottom: 12 }}>
          Duration (min) — last 7 days
        </p>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
            <XAxis dataKey="day" {...axisProps} />
            <YAxis {...axisProps} />
            <Tooltip {...tooltipStyle} />
            <Bar dataKey="duration" fill="#6366f1" fillOpacity={0.85} radius={[5,5,0,0]} name="Duration" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProgressChart;