import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { AdminContext } from '../../context/AdminContext';
import AdminNavbar from '../../components/AdminNavbar';
import API from '../../services/api';

import {
  FaUsers,
  FaDumbbell,
  FaFire,
  FaChartPie,
  FaTrash,
  FaEye,
  FaUserPlus,
  FaCalendarAlt,
} from "react-icons/fa";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { admin } = useContext(AdminContext);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
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
        workoutsByType: []
      });
    } catch (error) {
      console.error("Error fetching admin data:", error);
      setUsers([]);
      setAnalytics({
        totalUsers: 0,
        totalWorkouts: 0,
        totalCalories: 0,
        workoutsByType: []
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (
      !window.confirm(
        "Delete this user and all their data? This action cannot be undone.",
      )
    )
      return;

    try {
      await API.delete(`/admin/users/${userId}`);
      fetchData();
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user");
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const COLORS = ["#14b8a6", "#22d3ee", "#f59e0b", "#ef4444"];

  const growthData = [
    { month: "Jan", users: 10 },
    { month: "Feb", users: 25 },
    { month: "Mar", users: 45 },
    { month: "Apr", users: 70 },
    { month: "May", users: 100 },
    { month: "Jun", users: 130 },
  ];

  if (loading) {
    return (
      <div className="bg-dark min-vh-100 d-flex justify-content-center align-items-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.2 }}
        >
          <FaDumbbell size={70} className="text-teal" />
        </motion.div>
      </div>
    );
  }

  return (
    <>
      <AdminNavbar />
      <div className="bg-dark text-light min-vh-100 py-4">
        <div className="container-fluid px-4">
          {/* Welcome Header */}
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="p-5 rounded-4 mb-5"
            style={{ background: "linear-gradient(135deg, #1e2937, #312e81)" }}
          >
            <h1 className="display-4 fw-bold">
              Welcome back, {admin?.name} 👋
            </h1>
            <p className="lead opacity-75">Platform Analytics & Management</p>
          </motion.div>

          {/* Stats Cards */}
          <div className="row g-4 mb-5">
            {[
              {
                title: "Total Users",
                value: analytics?.totalUsers || 0,
                icon: <FaUsers />,
                color: "teal",
              },
              {
                title: "Total Workouts",
                value: analytics?.totalWorkouts || 0,
                icon: <FaDumbbell />,
                color: "sky",
              },
              {
                title: "Calories Burned",
                value: (analytics?.totalCalories || 0).toLocaleString(),
                icon: <FaFire />,
                color: "orange",
              },
              {
                title: "Active Users",
                value: users.filter((u) => u.lastActive).length,
                icon: <FaUserPlus />,
                color: "amber",
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="col-md-3"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="card bg-dark border-0 shadow-lg h-100">
                  <div className="card-body p-4">
                    <div className={`text-${stat.color} mb-3`}>{stat.icon}</div>
                    <h2 className="display-5 fw-bold mb-1">{stat.value}</h2>
                    <p className="text-muted">{stat.title}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Charts */}
          <div className="row g-4 mb-5">
            <div className="col-lg-6">
              <div className="card bg-dark border-0 shadow-lg h-100">
                <div className="card-header bg-transparent border-0">
                  <h5>Workout Distribution</h5>
                </div>
                <div className="card-body">
                  <ResponsiveContainer width="100%" height={320}>
                    <PieChart>
                      <Pie
                        data={analytics?.workoutsByType || []}
                        dataKey="count"
                        nameKey="_id"
                        cx="50%"
                        cy="50%"
                        outerRadius={110}
                        label
                      >
                        {(analytics?.workoutsByType || []).map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
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
              <div className="card bg-dark border-0 shadow-lg h-100">
                <div className="card-header bg-transparent border-0">
                  <h5>User Growth</h5>
                </div>
                <div className="card-body">
                  <ResponsiveContainer width="100%" height={320}>
                    <LineChart data={growthData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                      <XAxis dataKey="month" stroke="#94a3b8" />
                      <YAxis stroke="#94a3b8" />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="users"
                        stroke="#14b8a6"
                        strokeWidth={4}
                        dot={{ fill: "#14b8a6", r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>

          {/* Users Table */}
          <div className="card bg-dark border-0 shadow-lg">
            <div className="card-header bg-transparent border-0 d-flex justify-content-between align-items-center p-4">
              <h5>All Users ({filteredUsers.length})</h5>
              <div className="d-flex gap-3">
                <input
                  type="text"
                  className="form-control bg-dark text-light border-secondary"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ width: "280px" }}
                />
                <button className="btn btn-outline-teal" onClick={fetchData}>
                  Refresh
                </button>
              </div>
            </div>
            <div className="table-responsive">
              <table className="table table-dark table-hover mb-0">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
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
                      <td colSpan="7" className="text-center py-4 text-muted">
                        No users found
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((user, index) => (
                      <motion.tr
                        key={user._id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.03 }}
                      >
                        <td>{index + 1}</td>
                        <td>
                          <div className="d-flex align-items-center">
                            <div
                              className="bg-teal text-white rounded-circle d-flex align-items-center justify-content-center me-3"
                              style={{ width: "38px", height: "38px" }}
                            >
                              {user.name?.[0]?.toUpperCase() || "U"}
                            </div>
                            {user.name}
                          </div>
                        </td>
                        <td>{user.email}</td>
                        <td>
                          <span className="badge bg-primary">
                            {user.workoutCount || 0}
                          </span>
                        </td>
                        <td>
                          <span className="badge bg-success">
                            {user.totalCalories || 0}
                          </span>
                        </td>
                        <td>{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</td>
                        <td>
                          <button className="btn btn-sm btn-outline-info me-2">
                            <FaEye />
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger"
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