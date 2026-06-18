import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import WorkoutForm from '../components/WorkoutForm';
import WorkoutList from '../components/WorkoutList';
import ProgressChart from '../components/ProgressChart';
import API from '../services/api';

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
      const response = await API.get('/workouts');
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
      const response = await API.post('/workouts', workoutData);
      setWorkouts([response.data, ...workouts]);
    } catch (error) {
      console.error('Error adding workout:', error);
      throw error;
    }
  };

  const updateWorkout = async (id, updatedData) => {
    try {
      const response = await API.put(`/workouts/${id}`, updatedData);
      setWorkouts(workouts.map(w => w._id === id ? response.data : w));
    } catch (error) {
      console.error('Error updating workout:', error);
      throw error;
    }
  };

  const deleteWorkout = async (id) => {
    try {
      await API.delete(`/workouts/${id}`);
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
      <div className="container-fluid px-4 py-4"> {/* Changed to container-fluid + adjusted padding */}
        <div className="row justify-content-center">
          <div className="col-12 col-xl-11"> {/* Limits max width on very large screens but removes side gaps */}
            <h1 className="mb-4 text-center">My Fitness Dashboard</h1>
            
            {/* Stats Cards */}
            <div className="row mb-4 g-3">
              <div className="col-md-4">
                <div className="card bg-primary text-white h-100">
                  <div className="card-body text-center">
                    <h5 className="card-title">Total Workouts</h5>
                    <h2 className="display-4 mb-0">{stats.totalWorkouts}</h2>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card bg-success text-white h-100">
                  <div className="card-body text-center">
                    <h5 className="card-title">Total Calories Burned</h5>
                    <h2 className="display-4 mb-0">{stats.totalCalories}</h2>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card bg-info text-white h-100">
                  <div className="card-body text-center">
                    <h5 className="card-title">Avg. Duration (min)</h5>
                    <h2 className="display-4 mb-0">{stats.avgDuration}</h2>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Progress Chart */}
            <div className="mb-4">
              <ProgressChart workouts={workouts} />
            </div>
            
            {/* Add Workout Form + Workout List */}
            <div className="row g-4">
              <div className="col-lg-4">
                <div className="card h-100">
                  <div className="card-header">
                    <h5 className="mb-0">Add New Workout</h5>
                  </div>
                  <div className="card-body">
                    <WorkoutForm onSubmit={addWorkout} />
                  </div>
                </div>
              </div>
              
              <div className="col-lg-8">
                <div className="card h-100">
                  <div className="card-header">
                    <h5 className="mb-0">My Workouts</h5>
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
        </div>
      </div>
    </>
  );
};

export default Dashboard;