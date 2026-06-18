import React from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { FaChartBar, FaChartLine } from 'react-icons/fa';

const ProgressChart = ({ workouts }) => {
  const getLast7DaysData = () => {
    const last7Days = [];
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      const dayWorkouts = workouts.filter(w => {
        const workoutDate = new Date(w.date).toISOString().split('T')[0];
        return workoutDate === dateStr;
      });
      
      const totalCalories = dayWorkouts.reduce((sum, w) => sum + (w.calories || 0), 0);
      const totalDuration = dayWorkouts.reduce((sum, w) => sum + (w.duration || 0), 0);
      
      last7Days.push({
        date: dateStr,
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        calories: totalCalories,
        duration: totalDuration,
        workouts: dayWorkouts.length
      });
    }
    
    return last7Days;
  };

  const data = getLast7DaysData();

  if (workouts.length === 0) {
    return (
      <div className="text-center py-5">
        <FaChartBar size={48} className="text-secondary opacity-25 mb-3" />
        <p className="text-muted mb-0">Complete some workouts to see your progress!</p>
        <small className="text-muted">Your charts will appear here once you start tracking</small>
      </div>
    );
  }

  return (
    <div>
      <div className="row g-3">
        <div className="col-lg-6">
          <h6 className="text-white-50 small mb-3">
            <FaChartLine className="me-2 text-teal" /> Calories Burned
          </h6>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="day" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip 
                contentStyle={{ 
                  background: '#1e293b', 
                  border: 'none',
                  borderRadius: '8px',
                  color: 'white'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="calories" 
                stroke="#14b8a6" 
                strokeWidth={3}
                dot={{ fill: '#14b8a6', r: 5 }}
                name="Calories"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="col-lg-6">
          <h6 className="text-white-50 small mb-3">
            <FaChartBar className="me-2 text-teal" /> Duration (minutes)
          </h6>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="day" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip 
                contentStyle={{ 
                  background: '#1e293b', 
                  border: 'none',
                  borderRadius: '8px',
                  color: 'white'
                }}
              />
              <Bar 
                dataKey="duration" 
                fill="#14b8a6" 
                radius={[6, 6, 0, 0]}
                name="Duration"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ProgressChart;