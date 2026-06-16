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

const ProgressChart = ({ workouts }) => {
  // Process data for last 7 days
  const getLast7DaysData = () => {
    const last7Days = [];
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      // Sum workouts for this day
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
      <div className="card">
        <div className="card-body text-center py-5">
          <p className="text-muted mb-0">
            Complete some workouts to see your progress chart!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-header">
        <h5>Weekly Progress</h5>
      </div>
      <div className="card-body">
        <h6 className="mb-3">Calories Burned Over Time</h6>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="calories"
              stroke="#8884d8"
              name="Calories Burned"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
        
        <h6 className="mb-3 mt-4">Workout Duration (minutes)</h6>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="duration" fill="#82ca9d" name="Duration (min)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProgressChart;