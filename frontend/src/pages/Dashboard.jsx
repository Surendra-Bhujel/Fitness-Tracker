import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import WorkoutForm from '../components/WorkoutForm';
import WorkoutList from '../components/WorkoutList';
import ProgressChart from '../components/ProgressChart';

const Dashboard = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalWorkouts: 0,
    totalCalories: 0,
    avgDuration: 0
  });
  
  const { token } = useContext(AuthContext);

  useEffect(() => {
    fetchWorkouts();
  }, []);

  useEffect(() => {
    calculateStats();
  }, [workouts]);

  const fetchWorkouts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/workouts');
      setWorkouts(response.data);
    } catch (error) {
      console.error('Error fetching workouts:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = () => {
    const total = workouts.length;
    const totalCal = workouts.reduce((sum, w) => sum + (w.calories || 0), 0);
    const avgDur = total > 0 
      ? Math.round(workouts.reduce((sum, w) => sum + (w.duration || 0), 0) / total)
      : 0;
    
    setStats({
      totalWorkouts: total,
      totalCalories: totalCal,
      avgDuration: avgDur
    });
  };

  const addWorkout = async (workoutData) => {
    try {
      const response = await axios.post('http://localhost:5000/api/workouts', workoutData);
      setWorkouts([response.data, ...workouts]);
    } catch (error) {
      console.error('Error adding workout:', error);
      throw error;
    }
  };

  const updateWorkout = async (id, updatedData) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/workouts/${id}`, updatedData);
      setWorkouts(workouts.map(w => w._id === id ? response.data : w));
    } catch (error) {
      console.error('Error updating workout:', error);
      throw error;
    }
  };

  const deleteWorkout = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/workouts/${id}`);
      setWorkouts(workouts.filter(w => w._id !== id));
    } catch (error) {
      console.error('Error deleting workout:', error);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="d-flex justify-content-center align-items-center vh-100">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h1 className="mb-4">My Fitness Dashboard</h1>
        
        {/* Stats Cards */}
        <div className="row mb-4">
          <div className="col-md-4">
            <div className="card bg-primary text-white">
              <div className="card-body">
                <h5 className="card-title">Total Workouts</h5>
                <h2 className="display-4">{stats.totalWorkouts}</h2>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card bg-success text-white">
              <div className="card-body">
                <h5 className="card-title">Total Calories Burned</h5>
                <h2 className="display-4">{stats.totalCalories}</h2>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card bg-info text-white">
              <div className="card-body">
                <h5 className="card-title">Avg. Duration (min)</h5>
                <h2 className="display-4">{stats.avgDuration}</h2>
              </div>
            </div>
          </div>
        </div>
        
        {/* Progress Chart */}
        <ProgressChart workouts={workouts} />
        
        {/* Add Workout Form */}
        <div className="row mt-4">
          <div className="col-md-4">
            <div className="card">
              <div className="card-header">
                <h5>Add New Workout</h5>
              </div>
              <div className="card-body">
                <WorkoutForm onSubmit={addWorkout} />
              </div>
            </div>
          </div>
          
          {/* Workout List */}
          <div className="col-md-8">
            <div className="card">
              <div className="card-header">
                <h5>My Workouts</h5>
              </div>
              <div className="card-body">
                <WorkoutList 
                  workouts={workouts}
                  onUpdate={updateWorkout}
                  onDelete={deleteWorkout}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;