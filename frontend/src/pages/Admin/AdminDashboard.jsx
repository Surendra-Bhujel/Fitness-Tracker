import React, { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { AdminContext } from '../../context/AdminContext';
import AdminNavbar from '../../components/AdminNavbar';
import API from '../../services/api';
import { 
  FaUsers, FaDumbbell, FaFire, FaChartPie, 
  FaTrash, FaEye, FaUserPlus, FaCalendarAlt,
  FaSearch, FaDownload, FaFilter, FaClock,
  FaArrowUp, FaArrowDown, FaTrophy, FaBolt,
  FaHeartbeat, FaUserCircle, FaSignOutAlt,
  FaCog, FaBell, FaChartLine, FaRunning,
  FaMedal, FaStar, FaCheckCircle, FaExclamationTriangle,
  FaMoon, FaSun, FaCalendarWeek,
  FaClipboardList, FaWeightHanging, FaStopwatch
} from 'react-icons/fa';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie,
  Cell, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer, LineChart, Line,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [timeRange, setTimeRange] = useState('week');
  const [error, setError] = useState(null);
  const { admin, logout } = useContext(AdminContext);

  useEffect(() => {
    fetchData();
    const savedTheme = localStorage.getItem('adminTheme');
    if (savedTheme) {
      setDarkMode(savedTheme === 'dark');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('adminTheme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [usersRes, analyticsRes] = await Promise.all([
        API.get('/admin/users'),
        API.get('/admin/analytics')
      ]);
      
      setUsers(usersRes.data || []);
      setAnalytics(analyticsRes.data || {
        totalUsers: 0,
        totalWorkouts: 0,
        totalCalories: 0,
        workoutsByType: []
      });
    } catch (error) {
      console.error('Error fetching admin data:', error);
      setError('Failed to load dashboard data');
      setUsers([]);
      setAnalytics({
        totalUsers: 0,
        totalWorkouts: 0,
        totalCalories: 0,
        workoutsByType: [
          { _id: 'cardio', count: 45 },
          { _id: 'strength', count: 30 },
          { _id: 'flexibility', count: 15 },
          { _id: 'swimming', count: 10 },
          { _id: 'cycling', count: 20 }
        ]
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Delete this user and all their data? This cannot be undone.')) return;
    try {
      await API.delete(`/admin/users/${userId}`);
      fetchData();
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user');
    }
  };

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setShowUserModal(true);
  };

  const filteredUsers = users.filter(user =>
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Theme classes - ALL BLACK BACKGROUND
  const theme = {
    bg: darkMode ? 'bg-black' : 'bg-slate-100',
    card: darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-slate-200',
    cardLight: darkMode ? 'bg-neutral-800' : 'bg-white',
    text: darkMode ? 'text-white' : 'text-slate-900',
    textMuted: darkMode ? 'text-neutral-400' : 'text-slate-500',
    border: darkMode ? 'border-neutral-800' : 'border-slate-200',
    hover: darkMode ? 'hover:bg-neutral-800' : 'hover:bg-slate-50',
    input: darkMode ? 'bg-neutral-800 border-neutral-700 text-white' : 'bg-white border-slate-300 text-slate-900',
    table: darkMode ? 'table-dark' : '',
    inputBg: darkMode ? 'bg-neutral-800' : 'bg-slate-100',
  };

  // Colors
  const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#f59e0b', '#14b8a6'];
  const GRADIENTS = ['#4f46e5', '#7c3aed', '#db2777', '#e11d48', '#d97706', '#0d9488'];

  // Stats cards with more data - BLACK background with white text
  const stats = [
    { 
      title: 'Total Users', 
      value: analytics?.totalUsers || 0, 
      icon: <FaUsers size={24} />, 
      color: 'indigo',
      change: '+12.5%',
      trend: 'up',
      bg: 'from-indigo-600 to-purple-700',
      subText: 'Last 30 days',
      valuePrefix: ''
    },
    { 
      title: 'Total Workouts', 
      value: analytics?.totalWorkouts || 0, 
      icon: <FaDumbbell size={24} />, 
      color: 'purple',
      change: '+8.3%',
      trend: 'up',
      bg: 'from-purple-600 to-pink-700',
      subText: 'All time',
      valuePrefix: ''
    },
    { 
      title: 'Calories Burned', 
      value: (analytics?.totalCalories || 0).toLocaleString(), 
      icon: <FaFire size={24} />, 
      color: 'rose',
      change: '+18.7%',
      trend: 'up',
      bg: 'from-rose-600 to-red-700',
      subText: 'Total calories',
      valuePrefix: ''
    },
    { 
      title: 'Active Users', 
      value: users.filter(u => u.lastActive).length || Math.floor((analytics?.totalUsers || 0) * 0.7), 
      icon: <FaHeartbeat size={24} />, 
      color: 'emerald',
      change: '+5.2%',
      trend: 'up',
      bg: 'from-emerald-600 to-teal-700',
      subText: 'Active this week',
      valuePrefix: ''
    }
  ];

  // Enhanced growth data with more metrics
  const growthData = [
    { month: 'Jan', users: 10, workouts: 45, calories: 1200, active: 8 },
    { month: 'Feb', users: 25, workouts: 89, calories: 2400, active: 20 },
    { month: 'Mar', users: 45, workouts: 156, calories: 4200, active: 38 },
    { month: 'Apr', users: 70, workouts: 234, calories: 6300, active: 62 },
    { month: 'May', users: 100, workouts: 345, calories: 9300, active: 88 },
    { month: 'Jun', users: 130, workouts: 467, calories: 12600, active: 115 }
  ];

  // Activity distribution data
  const activityData = analytics?.workoutsByType || [
    { _id: 'cardio', count: 45 },
    { _id: 'strength', count: 30 },
    { _id: 'flexibility', count: 15 },
    { _id: 'swimming', count: 10 },
    { _id: 'cycling', count: 20 }
  ];

  // Weekly activity data
  const weeklyData = [
    { day: 'Mon', workouts: 12, calories: 450 },
    { day: 'Tue', workouts: 8, calories: 320 },
    { day: 'Wed', workouts: 15, calories: 580 },
    { day: 'Thu', workouts: 10, calories: 390 },
    { day: 'Fri', workouts: 18, calories: 670 },
    { day: 'Sat', workouts: 6, calories: 220 },
    { day: 'Sun', workouts: 4, calories: 150 }
  ];

  // Quick stats - BLACK background
  const quickStats = [
    { label: 'New Users (Today)', value: '24', icon: <FaUserPlus size={18} />, color: 'indigo' },
    { label: 'Workouts (Today)', value: '89', icon: <FaRunning size={18} />, color: 'purple' },
    { label: 'Avg. Calories', value: '342 kcal', icon: <FaFire size={18} />, color: 'rose' },
    { label: 'Active Users', value: '67', icon: <FaBolt size={18} />, color: 'emerald' },
    { label: 'Total Exercises', value: '156', icon: <FaDumbbell size={18} />, color: 'amber' },
    { label: 'Avg. Duration', value: '48 min', icon: <FaStopwatch size={18} />, color: 'cyan' },
  ];

  // Radar data
  const radarData = [
    { subject: 'Cardio', A: 120, fullMark: 150 },
    { subject: 'Strength', A: 98, fullMark: 150 },
    { subject: 'Flexibility', A: 86, fullMark: 150 },
    { subject: 'Swimming', A: 45, fullMark: 150 },
    { subject: 'Cycling', A: 72, fullMark: 150 },
  ];

  // Recent activities
  const recentActivities = [
    { user: 'John Doe', action: 'Completed workout', time: '2 min ago', type: 'workout' },
    { user: 'Jane Smith', action: 'Set new record', time: '15 min ago', type: 'record' },
    { user: 'Mike Johnson', action: 'Achieved goal', time: '1 hour ago', type: 'goal' },
    { user: 'Sarah Wilson', action: 'Shared workout', time: '2 hours ago', type: 'share' },
  ];

  if (loading) {
    return (
      <div className={`${theme.bg} min-vh-100 d-flex justify-content-center align-items-center`}>
        <motion.div 
          animate={{ rotate: 360, scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-3 p-5 shadow-2xl">
            <FaRunning size={60} className="text-white" />
          </div>
          <p className={`${theme.text} mt-4 fw-light`}>Loading dashboard...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={`${theme.bg} ${theme.text} min-vh-100 transition-colors duration-300`}>
      {/* Custom Navbar with Dark Mode Toggle - BLACK */}
      <nav className={`${darkMode ? 'bg-black border-neutral-800' : 'bg-white border-slate-200'} shadow-sm border-bottom sticky-top`}>
        <div className="container-fluid px-4 py-3">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-3 p-2 me-3">
                <FaChartPie className="text-white" size={20} />
              </div>
              <h5 className={`fw-bold mb-0 ${darkMode ? 'text-white' : 'text-slate-900'}`}>Admin Panel</h5>
            </div>
            
            <div className="d-flex align-items-center gap-3">
              {/* Dark Mode Toggle */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`btn btn-sm rounded-pill px-3 ${darkMode ? 'btn-warning' : 'btn-dark'}`}
                onClick={() => setDarkMode(!darkMode)}
              >
                {darkMode ? <FaSun className="me-1" /> : <FaMoon className="me-1" />}
                {darkMode ? 'Light' : 'Dark'}
              </motion.button>

              <button className={`btn btn-sm rounded-pill px-3 ${darkMode ? 'btn-outline-neutral-400' : 'btn-outline-secondary'}`}>
                <FaBell className="me-1" /> <span className="badge bg-danger rounded-pill">3</span>
              </button>
              <div className="dropdown">
                <button className={`btn btn-sm rounded-pill px-3 dropdown-toggle ${darkMode ? 'btn-outline-neutral-400' : 'btn-outline-secondary'}`} data-bs-toggle="dropdown">
                  <FaUserCircle className="me-1" /> {admin?.name || 'Admin'}
                </button>
                <ul className={`dropdown-menu dropdown-menu-end ${darkMode ? 'bg-neutral-900 border-neutral-800' : ''}`}>
                  <li><Link className={`dropdown-item ${darkMode ? 'text-neutral-300 hover:bg-neutral-800' : ''}`} to="/admin/settings"><FaCog className="me-2" /> Settings</Link></li>
                  <li><hr className={`dropdown-divider ${darkMode ? 'border-neutral-800' : ''}`} /></li>
                  <li><button className={`dropdown-item text-danger ${darkMode ? 'hover:bg-neutral-800' : ''}`} onClick={logout}><FaSignOutAlt className="me-2" /> Logout</button></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="container-fluid px-4 py-4">
        {/* Error Alert */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="alert alert-danger alert-dismissible fade show"
            >
              <FaExclamationTriangle className="me-2" />
              {error}
              <button type="button" className="btn-close" onClick={() => setError(null)} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Welcome Banner - BLACK background */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`card border-0 shadow-lg rounded-4 mb-4 overflow-hidden ${darkMode ? 'bg-neutral-900' : 'bg-white'}`}
          style={{ background: darkMode ? 'linear-gradient(135deg, #000000, #1a1a2e)' : 'linear-gradient(135deg, #e0e7ff, #ede9fe)' }}
        >
          <div className="card-body p-4">
            <div className="row align-items-center">
              <div className="col-md-8">
                <h1 className={`fw-bold mb-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  👋 Welcome back, {admin?.name || 'Admin'}!
                </h1>
                <p className={darkMode ? 'text-neutral-400' : 'text-slate-600'}>
                  Here's what's happening with your platform today
                </p>
                <div className="d-flex gap-4 mt-2">
                  <div className="d-flex align-items-center">
                    <FaClock className={`me-2 ${darkMode ? 'text-neutral-400' : 'text-slate-500'}`} />
                    <small className={darkMode ? 'text-neutral-400' : 'text-slate-500'}>
                      Last updated: {new Date().toLocaleString()}
                    </small>
                  </div>
                  <div className="d-flex align-items-center">
                    <FaCheckCircle className={`me-2 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
                    <small className={darkMode ? 'text-neutral-400' : 'text-slate-500'}>
                      All systems operational
                    </small>
                  </div>
                </div>
              </div>
              <div className="col-md-4 text-end">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`btn ${darkMode ? 'btn-light' : 'btn-dark'} btn-sm px-4 py-2 shadow`}
                  onClick={fetchData}
                >
                  <FaDownload className="me-2" /> Refresh Data
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards - BLACK background with white text */}
        <div className="row g-4 mb-4">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="col-xl-3 col-lg-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
            >
              <div className="card border-0 shadow-lg rounded-4 overflow-hidden hover-lift">
                <div className={`card-body p-4 bg-gradient-to-br ${stat.bg} text-black position-relative`}>
                  <div className="position-absolute top-0 end-0 p-3 opacity-10">
                    {stat.icon}
                  </div>
                  <div className="position-relative">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <span className="text-black-70 small text-uppercase fw-semibold">
                        {stat.title}
                      </span>
                      <span className={`badge ${stat.trend === 'up' ? 'bg-success' : 'bg-danger'} bg-opacity-30 text-black px-3 py-1 rounded-pill`}>
                        {stat.change} {stat.trend === 'up' ? <FaArrowUp size={10} /> : <FaArrowDown size={10} />}
                      </span>
                    </div>
                    <h2 className="display-4 fw-bold mb-0">{stat.valuePrefix}{stat.value}</h2>
                    <div className="mt-2">
                      <small className="text-black-70">{stat.subText}</small>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Stats Row - BLACK background */}
        <div className="row g-3 mb-4">
          {quickStats.map((stat, index) => (
            <motion.div 
              key={index}
              className="col-md-2 col-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.03 }}
            >
              <div className={`card border-0 shadow-sm rounded-4 ${darkMode ? 'bg-neutral-900' : 'bg-white'}`}>
                <div className="card-body p-3">
                  <div className="d-flex align-items-center gap-3">
                    <div className={`bg-${stat.color}-100 text-${stat.color} rounded-3 p-2`}>
                      {stat.icon}
                    </div>
                    <div>
                      <div className={`fw-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{stat.value}</div>
                      <div className={`small ${darkMode ? 'text-neutral-400' : 'text-muted'}`}>{stat.label}</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts Section - BLACK background */}
        <div className="row g-4 mb-4">
          {/* Main Chart - Area */}
          <motion.div 
            className="col-xl-5"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className={`card border-0 shadow-lg rounded-4 ${darkMode ? 'bg-neutral-900' : 'bg-white'}`}>
              <div className={`card-header bg-transparent border-0 pt-4 px-4 ${darkMode ? 'border-neutral-800' : ''}`}>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h5 className={`fw-bold mb-0 ${darkMode ? 'text-white' : 'text-slate-900'}`}>Platform Growth</h5>
                    <p className={`small ${darkMode ? 'text-neutral-400' : 'text-muted'}`}>User & activity trends</p>
                  </div>
                  <div className="d-flex gap-2">
                    <button className={`btn btn-sm ${timeRange === 'week' ? 'btn-primary' : darkMode ? 'btn-outline-neutral-400' : 'btn-outline-secondary'} rounded-pill px-3`} onClick={() => setTimeRange('week')}>
                      Week
                    </button>
                    <button className={`btn btn-sm ${timeRange === 'month' ? 'btn-primary' : darkMode ? 'btn-outline-neutral-400' : 'btn-outline-secondary'} rounded-pill px-3`} onClick={() => setTimeRange('month')}>
                      Month
                    </button>
                  </div>
                </div>
              </div>
              <div className="card-body p-4">
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={growthData}>
                    <defs>
                      <linearGradient id="userGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0.05}/>
                      </linearGradient>
                      <linearGradient id="workoutGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.05}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#333333' : '#e2e8f0'} />
                    <XAxis dataKey="month" stroke={darkMode ? '#666666' : '#94a3b8'} />
                    <YAxis stroke={darkMode ? '#666666' : '#94a3b8'} />
                    <Tooltip 
                      contentStyle={{ 
                        background: darkMode ? '#1a1a2e' : 'white', 
                        border: 'none', 
                        borderRadius: '12px',
                        boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                        padding: '12px',
                        color: darkMode ? 'white' : 'black'
                      }}
                    />
                    <Legend />
                    <Area type="monotone" dataKey="users" stroke="#6366f1" strokeWidth={3} fill="url(#userGradient)" name="Users" />
                    <Area type="monotone" dataKey="workouts" stroke="#8b5cf6" strokeWidth={3} fill="url(#workoutGradient)" name="Workouts" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>

          {/* Radar Chart */}
          <motion.div 
            className="col-xl-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            <div className={`card border-0 shadow-lg rounded-4 h-100 ${darkMode ? 'bg-neutral-900' : 'bg-white'}`}>
              <div className={`card-header bg-transparent border-0 pt-4 px-4 ${darkMode ? 'border-neutral-800' : ''}`}>
                <h5 className={`fw-bold mb-0 ${darkMode ? 'text-white' : 'text-slate-900'}`}>Activity Radar</h5>
                <p className={`small ${darkMode ? 'text-neutral-400' : 'text-muted'}`}>Performance metrics</p>
              </div>
              <div className="card-body p-4 d-flex align-items-center">
                <ResponsiveContainer width="100%" height={280}>
                  <RadarChart data={radarData}>
                    <PolarGrid stroke={darkMode ? '#333333' : '#e2e8f0'} />
                    <PolarAngleAxis dataKey="subject" stroke={darkMode ? '#666666' : '#64748b'} />
                    <PolarRadiusAxis stroke={darkMode ? '#666666' : '#64748b'} />
                    <Radar name="Activity" dataKey="A" stroke="#6366f1" fill="#6366f1" fillOpacity={0.6} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>

          {/* Pie Chart & Stats */}
          <motion.div 
            className="col-xl-4"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className={`card border-0 shadow-lg rounded-4 h-100 ${darkMode ? 'bg-neutral-900' : 'bg-white'}`}>
              <div className={`card-header bg-transparent border-0 pt-4 px-4 ${darkMode ? 'border-neutral-800' : ''}`}>
                <h5 className={`fw-bold mb-0 ${darkMode ? 'text-white' : 'text-slate-900'}`}>Activity Distribution</h5>
                <p className={`small ${darkMode ? 'text-neutral-400' : 'text-muted'}`}>Workout types breakdown</p>
              </div>
              <div className="card-body p-4">
                <ResponsiveContainer width="100%" height={180}>
                  <PieChart>
                    <Pie
                      data={activityData}
                      dataKey="count"
                      nameKey="_id"
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={75}
                      paddingAngle={4}
                      label={({ _id, percent }) => `${_id} ${(percent * 100).toFixed(0)}%`}
                    >
                      {activityData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        background: darkMode ? '#1a1a2e' : 'white', 
                        border: 'none', 
                        borderRadius: '12px',
                        boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                        color: darkMode ? 'white' : 'black'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="row g-2 mt-2">
                  {activityData.map((item, index) => (
                    <div key={index} className="col-6">
                      <div className="d-flex align-items-center gap-2">
                        <div style={{ width: '12px', height: '12px', background: COLORS[index % COLORS.length], borderRadius: '4px' }}></div>
                        <span className={`small ${darkMode ? 'text-neutral-300' : 'text-slate-700'}`}>
                          {item._id}: {item.count}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Weekly Activity Bar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="row g-4 mb-4"
        >
          <div className="col-12">
            <div className={`card border-0 shadow-lg rounded-4 ${darkMode ? 'bg-neutral-900' : 'bg-white'}`}>
              <div className={`card-header bg-transparent border-0 pt-4 px-4 ${darkMode ? 'border-neutral-800' : ''}`}>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h5 className={`fw-bold mb-0 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                      <FaCalendarWeek className="me-2" /> Weekly Activity
                    </h5>
                    <p className={`small ${darkMode ? 'text-neutral-400' : 'text-muted'}`}>Last 7 days</p>
                  </div>
                  <div>
                    <span className={`badge ${darkMode ? 'bg-neutral-800 text-neutral-300' : 'bg-slate-100 text-slate-600'} px-3 py-2 rounded-pill`}>
                      Total: {weeklyData.reduce((sum, d) => sum + d.workouts, 0)} workouts
                    </span>
                  </div>
                </div>
              </div>
              <div className="card-body p-4">
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#333333' : '#e2e8f0'} />
                    <XAxis dataKey="day" stroke={darkMode ? '#666666' : '#94a3b8'} />
                    <YAxis stroke={darkMode ? '#666666' : '#94a3b8'} />
                    <Tooltip 
                      contentStyle={{ 
                        background: darkMode ? '#1a1a2e' : 'white', 
                        border: 'none', 
                        borderRadius: '12px',
                        boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                        color: darkMode ? 'white' : 'black'
                      }}
                    />
                    <Bar dataKey="workouts" fill="#6366f1" radius={[6, 6, 0, 0]} />
                    <Bar dataKey="calories" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
                    <Legend />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Recent Activity & Users Table - BLACK background */}
        <div className="row g-4">
          {/* Recent Activity */}
          <motion.div
            className="col-xl-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className={`card border-0 shadow-lg rounded-4 h-100 ${darkMode ? 'bg-neutral-900' : 'bg-white'}`}>
              <div className={`card-header bg-transparent border-0 pt-4 px-4 ${darkMode ? 'border-neutral-800' : ''}`}>
                <h5 className={`fw-bold mb-0 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  <FaClock className="me-2" /> Recent Activity
                </h5>
              </div>
              <div className="card-body p-4">
                {recentActivities.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className={`d-flex align-items-center gap-3 p-3 rounded-3 mb-2 ${darkMode ? 'hover:bg-neutral-800' : 'hover:bg-slate-50'}`}
                  >
                    <div className={`bg-${index === 0 ? 'indigo' : index === 1 ? 'purple' : index === 2 ? 'emerald' : 'amber'}-100 text-${index === 0 ? 'indigo' : index === 1 ? 'purple' : index === 2 ? 'emerald' : 'amber'}-700 rounded-3 p-2`}>
                      {activity.type === 'workout' && <FaDumbbell size={16} />}
                      {activity.type === 'record' && <FaTrophy size={16} />}
                      {activity.type === 'goal' && <FaMedal size={16} />}
                      {activity.type === 'share' && <FaBolt size={16} />}
                    </div>
                    <div className="flex-grow-1">
                      <div className={`fw-semibold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{activity.user}</div>
                      <div className={`small ${darkMode ? 'text-neutral-400' : 'text-muted'}`}>{activity.action}</div>
                    </div>
                    <div className={`small ${darkMode ? 'text-neutral-500' : 'text-muted'}`}>{activity.time}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Users Table - Professional Design */}
          <motion.div
            className="col-xl-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className={`card border-0 shadow-lg rounded-4 ${darkMode ? 'bg-neutral-900' : 'bg-white'}`}>
              <div className={`card-header bg-transparent border-0 pt-4 px-4 ${darkMode ? 'border-neutral-800' : ''}`}>
                <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
                  <div>
                    <h5 className={`fw-bold mb-0 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                      <FaUsers className="me-2 text-indigo-500" /> 
                      Users Management
                      <span className={`badge ${darkMode ? 'bg-indigo-900 text-indigo-300' : 'bg-indigo-100 text-indigo-700'} ms-3 px-3 py-2 rounded-pill`}>
                        {filteredUsers.length} users
                      </span>
                    </h5>
                  </div>
                  <div className="d-flex gap-2 flex-wrap">
                    <div className="position-relative">
                      <FaSearch className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" size={14} />
                      <input
                        type="text"
                        className={`form-control ps-5 border-0 rounded-pill ${darkMode ? 'bg-neutral-800 text-white placeholder-neutral-500' : 'bg-slate-100'}`}
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ width: '200px' }}
                      />
                    </div>
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`btn ${darkMode ? 'btn-outline-neutral-400' : 'btn-outline-secondary'} btn-sm rounded-pill px-3`}
                      onClick={fetchData}
                    >
                      <FaDownload className="me-1" size={12} /> Refresh
                    </motion.button>
                  </div>
                </div>
              </div>
              
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className={`table table-hover mb-0 ${darkMode ? 'table-dark' : ''}`}>
                    <thead className={darkMode ? 'bg-neutral-800' : 'bg-slate-50'}>
                      <tr>
                        <th className={`px-4 py-3 text-uppercase small fw-bold ${darkMode ? 'text-neutral-400' : 'text-muted'}`}>#</th>
                        <th className={`px-4 py-3 text-uppercase small fw-bold ${darkMode ? 'text-neutral-400' : 'text-muted'}`}>User</th>
                        <th className={`px-4 py-3 text-uppercase small fw-bold ${darkMode ? 'text-neutral-400' : 'text-muted'}`}>Email</th>
                        <th className={`px-4 py-3 text-uppercase small fw-bold ${darkMode ? 'text-neutral-400' : 'text-muted'} text-center`}>Workouts</th>
                        <th className={`px-4 py-3 text-uppercase small fw-bold ${darkMode ? 'text-neutral-400' : 'text-muted'} text-center`}>Calories</th>
                        <th className={`px-4 py-3 text-uppercase small fw-bold ${darkMode ? 'text-neutral-400' : 'text-muted'}`}>Joined</th>
                        <th className={`px-4 py-3 text-uppercase small fw-bold ${darkMode ? 'text-neutral-400' : 'text-muted'} text-center`}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.length === 0 ? (
                        <tr>
                          <td colSpan="7" className="text-center py-5">
                            <div className={`${darkMode ? 'text-neutral-400' : 'text-muted'}`}>
                              <FaUsers size={48} className="mb-3 opacity-25 d-block mx-auto" />
                              <p className="mb-0">No users found</p>
                              <small>Try adjusting your search</small>
                            </div>
                          </td>
                        </tr>
                      ) : (
                        filteredUsers.map((user, index) => (
                          <motion.tr
                            key={user._id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: index * 0.02 }}
                            className="border-0"
                            whileHover={{ backgroundColor: darkMode ? '#2a2a2a' : '#f8fafc' }}
                          >
                            <td className="px-4 py-3 align-middle">
                              <span className={`small ${darkMode ? 'text-neutral-400' : 'text-muted'}`}>{index + 1}</span>
                            </td>
                            <td className="px-4 py-3 align-middle">
                              <div className="d-flex align-items-center">
                                <div 
                                  className="d-flex align-items-center justify-content-center rounded-circle me-3 text-white fw-bold shadow-sm"
                                  style={{ 
                                    width: '38px', 
                                    height: '38px',
                                    background: `linear-gradient(135deg, ${COLORS[index % COLORS.length]}, ${GRADIENTS[(index + 1) % GRADIENTS.length]})`,
                                    fontSize: '14px'
                                  }}
                                >
                                  {user.name?.[0]?.toUpperCase() || 'U'}
                                </div>
                                <div>
                                  <div className={`fw-semibold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{user.name}</div>
                                  <div className={`small ${darkMode ? 'text-neutral-400' : 'text-muted'}`}>ID: {user._id?.slice(-6) || 'N/A'}</div>
                                </div>
                              </div>
                            </td>
                            <td className={`px-4 py-3 align-middle ${darkMode ? 'text-neutral-300' : 'text-slate-600'}`}>{user.email}</td>
                            <td className="px-4 py-3 align-middle text-center">
                              <span className={`badge ${darkMode ? 'bg-indigo-900 text-indigo-300' : 'bg-indigo-100 text-indigo-700'} px-3 py-2 rounded-pill`}>
                                {user.workoutCount || 0}
                              </span>
                            </td>
                            <td className="px-4 py-3 align-middle text-center">
                              <span className={`badge ${darkMode ? 'bg-rose-900 text-rose-300' : 'bg-rose-100 text-rose-700'} px-3 py-2 rounded-pill`}>
                                {user.totalCalories || 0}
                              </span>
                            </td>
                            <td className="px-4 py-3 align-middle">
                              <div>
                                <div className={`fw-medium small ${darkMode ? 'text-neutral-300' : 'text-slate-700'}`}>
                                  {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                                </div>
                                <div className={`small ${darkMode ? 'text-neutral-500' : 'text-muted'}`}>
                                  {user.createdAt ? new Date(user.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : ''}
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3 align-middle text-center">
                              <div className="d-flex justify-content-center gap-1">
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  className={`btn btn-sm ${darkMode ? 'btn-outline-primary' : 'btn-outline-primary'} rounded-pill px-3`}
                                  onClick={() => handleViewUser(user)}
                                >
                                  <FaEye size={12} className="me-1" /> View
                                </motion.button>
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  className={`btn btn-sm ${darkMode ? 'btn-outline-danger' : 'btn-outline-danger'} rounded-pill px-3`}
                                  onClick={() => handleDeleteUser(user._id)}
                                >
                                  <FaTrash size={12} className="me-1" /> Delete
                                </motion.button>
                              </div>
                            </td>
                          </motion.tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className={`card-footer bg-transparent border-0 pt-3 pb-4 px-4 ${darkMode ? 'border-neutral-800' : ''}`}>
                <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
                  <span className={`small ${darkMode ? 'text-neutral-400' : 'text-muted'}`}>
                    Showing {filteredUsers.length} of {users.length} users
                  </span>
                  <div className="d-flex gap-1">
                    <button className={`btn btn-sm ${darkMode ? 'btn-outline-neutral-400' : 'btn-outline-secondary'} rounded-pill px-3`}>‹</button>
                    <button className={`btn btn-sm ${darkMode ? 'btn-primary' : 'btn-primary'} rounded-pill px-3`}>1</button>
                    <button className={`btn btn-sm ${darkMode ? 'btn-outline-neutral-400' : 'btn-outline-secondary'} rounded-pill px-3`}>2</button>
                    <button className={`btn btn-sm ${darkMode ? 'btn-outline-neutral-400' : 'btn-outline-secondary'} rounded-pill px-3`}>3</button>
                    <button className={`btn btn-sm ${darkMode ? 'btn-outline-neutral-400' : 'btn-outline-secondary'} rounded-pill px-3`}>›</button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* User Detail Modal */}
      <AnimatePresence>
        {showUserModal && selectedUser && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal show d-block"
            style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)' }}
            onClick={() => setShowUserModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              className="modal-dialog modal-dialog-centered modal-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className={`modal-content rounded-4 border-0 shadow-2xl overflow-hidden ${darkMode ? 'bg-neutral-900 text-white' : 'bg-white'}`}>
                <div className="modal-header border-0 px-4 pt-4" style={{ background: darkMode ? 'linear-gradient(135deg, #000000, #1a1a2e)' : 'linear-gradient(135deg, #e0e7ff, #ede9fe)' }}>
                  <div className="d-flex align-items-center">
                    <div 
                      className="d-flex align-items-center justify-content-center rounded-circle me-3 text-white fw-bold shadow-lg"
                      style={{ 
                        width: '56px', 
                        height: '56px',
                        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                        fontSize: '20px'
                      }}
                    >
                      {selectedUser.name?.[0]?.toUpperCase() || 'U'}
                    </div>
                    <div>
                      <h5 className={`fw-bold mb-0 ${darkMode ? 'text-white' : 'text-slate-900'}`}>{selectedUser.name}</h5>
                      <p className={`mb-0 small ${darkMode ? 'text-neutral-400' : 'text-slate-600'}`}>{selectedUser.email}</p>
                    </div>
                  </div>
                  <button className={`btn-close ${darkMode ? 'btn-close-white' : ''}`} onClick={() => setShowUserModal(false)}></button>
                </div>
                <div className="modal-body px-4 py-4">
                  <div className="row g-3">
                    <div className="col-6">
                      <div className={`rounded-3 p-3 text-center ${darkMode ? 'bg-neutral-800' : 'bg-indigo-50'}`}>
                        <div className={`display-6 fw-bold ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>{selectedUser.workoutCount || 0}</div>
                        <div className={`small ${darkMode ? 'text-neutral-400' : 'text-muted'}`}>Total Workouts</div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className={`rounded-3 p-3 text-center ${darkMode ? 'bg-neutral-800' : 'bg-rose-50'}`}>
                        <div className={`display-6 fw-bold ${darkMode ? 'text-rose-400' : 'text-rose-600'}`}>{selectedUser.totalCalories || 0}</div>
                        <div className={`small ${darkMode ? 'text-neutral-400' : 'text-muted'}`}>Calories Burned</div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className={`rounded-3 p-3 ${darkMode ? 'bg-neutral-800' : 'bg-slate-50'}`}>
                        <div className="row g-2">
                          <div className="col-6">
                            <div className={`small ${darkMode ? 'text-neutral-400' : 'text-muted'}`}>User ID</div>
                            <div className={`small fw-medium ${darkMode ? 'text-neutral-300' : ''}`}>{selectedUser._id}</div>
                          </div>
                          <div className="col-6">
                            <div className={`small ${darkMode ? 'text-neutral-400' : 'text-muted'}`}>Joined</div>
                            <div className={`small fw-medium ${darkMode ? 'text-neutral-300' : ''}`}>{selectedUser.createdAt ? new Date(selectedUser.createdAt).toLocaleDateString() : 'N/A'}</div>
                          </div>
                          <div className="col-12">
                            <div className={`small ${darkMode ? 'text-neutral-400' : 'text-muted'}`}>Last Active</div>
                            <div className={`small fw-medium ${darkMode ? 'text-neutral-300' : ''}`}>{selectedUser.lastActive ? new Date(selectedUser.lastActive).toLocaleString() : 'Never'}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={`modal-footer border-0 px-4 pb-4 ${darkMode ? 'border-neutral-800' : ''}`}>
                  <button className={`btn ${darkMode ? 'btn-neutral-600' : 'btn-secondary'} rounded-pill px-4`} onClick={() => setShowUserModal(false)}>Close</button>
                  <button className={`btn btn-danger rounded-pill px-4`} onClick={() => {
                    handleDeleteUser(selectedUser._id);
                    setShowUserModal(false);
                  }}>
                    <FaTrash className="me-2" size={12} /> Delete User
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .hover-lift {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .hover-lift:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 50px rgba(0,0,0,0.15) !important;
        }
        .shadow-2xl {
          box-shadow: 0 25px 80px rgba(0,0,0,0.2);
        }
        .text-white-70 {
          color: rgba(255,255,255,0.7);
        }
        .bg-opacity-30 {
          --bs-bg-opacity: 0.3;
        }
        .bg-neutral-800 {
          background-color: #1a1a1a;
        }
        .bg-neutral-900 {
          background-color: #0a0a0a;
        }
        .text-neutral-300 {
          color: #d4d4d4;
        }
        .text-neutral-400 {
          color: #a3a3a3;
        }
        .text-neutral-500 {
          color: #737373;
        }
        .border-neutral-700 {
          border-color: #333333;
        }
        .border-neutral-800 {
          border-color: #1a1a1a;
        }
        .hover\\:bg-neutral-800:hover {
          background-color: #1a1a1a;
        }
        .hover\\:bg-neutral-700:hover {
          background-color: #333333;
        }
        .btn-neutral-600 {
          background-color: #525252;
          color: white;
        }
        .btn-neutral-600:hover {
          background-color: #404040;
          color: white;
        }
        .btn-outline-neutral-400 {
          color: #a3a3a3;
          border-color: #a3a3a3;
        }
        .btn-outline-neutral-400:hover {
          background: #a3a3a3;
          color: #0a0a0a;
        }
        .btn-close-white {
          filter: invert(1);
        }
        .transition-colors {
          transition: background-color 0.3s, color 0.3s;
        }
        .bg-indigo-900 {
          background-color: #312e81;
        }
        .text-indigo-300 {
          color: #a5b4fc;
        }
        .bg-rose-900 {
          background-color: #881337;
        }
        .text-rose-300 {
          color: #fda4af;
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;