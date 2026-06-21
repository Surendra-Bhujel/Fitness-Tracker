import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { AdminContext } from '../../context/AdminContext';
import AdminNavbar from '../../components/AdminNavbar';
import API from '../../services/api';

import {
  FaUsers, FaDumbbell, FaFire, FaChartPie, FaTrash, FaEye,
  FaRunning, FaSync, FaMoon, FaSun
} from "react-icons/fa";

import {
  LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [theme, setTheme] = useState('dark');
  const { admin } = useContext(AdminContext);

  // Theme Management
  useEffect(() => {
    const savedTheme = localStorage.getItem('adminTheme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('adminTheme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [usersRes, analyticsRes] = await Promise.all([
        API.get("/admin/users"),
        API.get("/admin/analytics"),
      ]);
      setUsers(usersRes.data || []);
      setAnalytics(analyticsRes.data || {
        totalUsers: 0,
        totalWorkouts: 0,
        totalCalories: 0,
        workoutsByType: [],
      });
    } catch (err) {
      console.error("Error fetching admin data:", err);
      setError("Failed to load dashboard. Please try again.");
      setUsers([]);
      setAnalytics({ totalUsers: 0, totalWorkouts: 0, totalCalories: 0, workoutsByType: [] });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Delete this user and all their fitness data? This action cannot be undone.")) return;
    try {
      await API.delete(`/admin/users/${userId}`);
      fetchData();
    } catch (error) {
      alert("Failed to delete user.");
    }
  };

  const filteredUsers = users.filter(user =>
    user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user?.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const COLORS = ["#14b8a6", "#22d3ee", "#a855f7", "#f59e0b", "#ef4444"];

  const growthData = [
    { month: "Jan", users: 45 }, { month: "Feb", users: 68 },
    { month: "Mar", users: 92 }, { month: "Apr", users: 125 },
    { month: "May", users: 167 }, { month: "Jun", users: 203 },
  ];

  if (loading) {
    return (
      <div className={`min-vh-100 d-flex flex-column justify-content-center align-items-center ${theme === 'dark' ? 'bg-[#0a0f1c]' : 'bg-gray-50'}`}>
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>
          <FaDumbbell size={90} className="text-[#14b8a6]" />
        </motion.div>
        <p className="mt-4 text-muted">Loading Fitness Intelligence...</p>
      </div>
    );
  }

  return (
    <>
      <AdminNavbar />
      <div className={`min-vh-100 pb-5 ${theme === 'dark' ? 'bg-[#0a0f1c] text-white' : 'bg-gray-50 text-gray-900'}`}>
        <div className="container-fluid px-4 pt-4">

          {/* Top Bar with Theme Toggle */}
          <div className="d-flex justify-content-end mb-3">
            <button
              onClick={toggleTheme}
              className={`btn d-flex align-items-center gap-2 ${theme === 'dark' ? 'btn-outline-light' : 'btn-outline-dark'}`}
              title="Toggle Theme"
            >
              {theme === 'dark' ? <FaSun size={18} /> : <FaMoon size={18} />}
              <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
          </div>

          {/* Hero Header */}
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className={`p-6 rounded-3xl mb-6 shadow-2xl ${theme === 'dark' 
              ? 'bg-gradient-to-r from-[#1e2937] via-[#312e81] to-[#4f46e5]' 
              : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'}`}
          >
            <div className="d-flex align-items-center gap-4">
              <div className="text-6xl">💪</div>
              <div>
                <h1 className="display-4 fw-bold mb-1">
                  Welcome back, {admin?.name || "Super Admin"}!
                </h1>
                <p className="lead opacity-75 mb-0">
                  Fitness Platform • Real-time Analytics & Management
                </p>
              </div>
            </div>
          </motion.div>

          {error && <div className="alert alert-danger">{error}</div>}

          {/* Stats Cards */}
          <div className="row g-4 mb-6">
            {[
              { title: "Total Members", value: analytics?.totalUsers || 0, icon: <FaUsers />, color: "teal" },
              { title: "Total Workouts", value: analytics?.totalWorkouts || 0, icon: <FaDumbbell />, color: "emerald" },
              { title: "Calories Burned", value: (analytics?.totalCalories || 0).toLocaleString(), icon: <FaFire />, color: "orange" },
              { title: "Active Today", value: users.filter(u => u.lastActive).length, icon: <FaRunning />, color: "violet" },
            ].map((stat, i) => (
              <motion.div key={i} className="col-md-3" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: i * 0.1 }}>
                <div className={`card border-0 shadow-xl h-100 ${theme === 'dark' ? 'bg-[#1a2236]' : 'bg-white'}`}>
                  <div className="card-body p-4">
                    <div className={`text-${stat.color} mb-3 fs-1`}>{stat.icon}</div>
                    <h2 className="display-5 fw-bold mb-1">{stat.value}</h2>
                    <p className={theme === 'dark' ? "text-gray-400" : "text-gray-600"}>{stat.title}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Charts */}
          <div className="row g-4 mb-6">
            <div className="col-lg-6">
              <div className={`card border-0 shadow-xl h-100 ${theme === 'dark' ? 'bg-[#1a2236]' : 'bg-white'}`}>
                <div className="card-header bg-transparent border-0">
                  <h5>Workout Distribution</h5>
                </div>
                <div className="card-body">
                  <ResponsiveContainer width="100%" height={340}>
                    <PieChart>
                      <Pie
                        data={analytics?.workoutsByType || []}
                        dataKey="count"
                        nameKey="_id"
                        cx="50%"
                        cy="50%"
                        outerRadius={130}
                        label={({ name, percent }) => `${name} ${Math.round(percent * 100)}%`}
                      >
                        {(analytics?.workoutsByType || []).map((_, index) => (
                          <Cell key={index} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className={`card border-0 shadow-xl h-100 ${theme === 'dark' ? 'bg-[#1a2236]' : 'bg-white'}`}>
                <div className="card-header bg-transparent border-0">
                  <h5>Member Growth Trend</h5>
                </div>
                <div className="card-body">
                  <ResponsiveContainer width="100%" height={340}>
                    <LineChart data={growthData}>
                      <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? "#334155" : "#e5e7eb"} />
                      <XAxis dataKey="month" stroke={theme === 'dark' ? "#94a3b8" : "#6b7280"} />
                      <YAxis stroke={theme === 'dark' ? "#94a3b8" : "#6b7280"} />
                      <Tooltip />
                      <Line 
                        type="natural" 
                        dataKey="users" 
                        stroke="#14b8a6" 
                        strokeWidth={5} 
                        dot={{ r: 6, fill: "#14b8a6" }} 
                        activeDot={{ r: 9 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>

          {/* Users Table */}
          <div className={`card border-0 shadow-xl ${theme === 'dark' ? 'bg-[#1a2236]' : 'bg-white'}`}>
            <div className="card-header bg-transparent border-0 d-flex justify-content-between align-items-center p-4">
              <div>
                <h5 className="mb-1">All Members ({filteredUsers.length})</h5>
                <small className={theme === 'dark' ? "text-gray-400" : "text-gray-600"}>Fitness Community Management</small>
              </div>
              <div className="d-flex gap-3 align-items-center">
                <input
                  type="text"
                  className={`form-control w-80 ${theme === 'dark' ? 'bg-[#0f1629] text-white border-gray-700' : 'bg-white border-gray-300'}`}
                  placeholder="Search members by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button 
                  className={`btn d-flex align-items-center gap-2 ${theme === 'dark' ? 'btn-outline-light' : 'btn-outline-primary'}`} 
                  onClick={fetchData}
                >
                  <FaSync /> Refresh
                </button>
              </div>
            </div>

            <div className="table-responsive">
              <table className={`table table-hover mb-0 align-middle ${theme === 'dark' ? 'table-dark' : ''}`}>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Member</th>
                    <th>Email</th>
                    <th>Workouts</th>
                    <th>Calories</th>
                    <th>Joined</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="text-center py-5 text-muted">No members found</td>
                    </tr>
                  ) : (
                    filteredUsers.map((user, index) => (
                      <motion.tr 
                        key={user._id} 
                        initial={{ opacity: 0, y: 10 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        transition={{ delay: index * 0.03 }}
                      >
                        <td>{index + 1}</td>
                        <td>
                          <div className="d-flex align-items-center gap-3">
                            <div 
                              className="bg-gradient-to-br from-teal-500 to-cyan-500 text-white rounded-circle d-flex align-items-center justify-content-center fw-bold" 
                              style={{ width: "48px", height: "48px" }}
                            >
                              {user.name?.[0]?.toUpperCase() || "?"}
                            </div>
                            <div>
                              <div className="fw-medium">{user.name}</div>
                              {user.isActive && <span className="badge bg-success">Active</span>}
                            </div>
                          </div>
                        </td>
                        <td>{user.email}</td>
                        <td><span className="badge bg-primary">{user.workoutCount || 0}</span></td>
                        <td><span className="badge bg-success">{user.totalCalories || 0}</span></td>
                        <td>
                          {user.createdAt 
                            ? new Date(user.createdAt).toLocaleDateString('en-US', { 
                                month: 'short', day: 'numeric', year: 'numeric' 
                              }) 
                            : 'N/A'}
                        </td>
                        <td>
                          <button className="btn btn-sm btn-outline-info me-2" title="View Profile">
                            <FaEye />
                          </button>
                          <button 
                            className="btn btn-sm btn-outline-danger" 
                            title="Delete User"
                            onClick={() => handleDeleteUser(user._id)}
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </motion.tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;