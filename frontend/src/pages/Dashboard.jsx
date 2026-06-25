import React, { useState, useEffect, useContext, useRef } from 'react';
import { AuthContext } from '../context/AuthContext';
import WorkoutForm from '../components/WorkoutForm';
import WorkoutList from '../components/WorkoutList';
import ProgressChart from '../components/ProgressChart';
import API from '../services/api';

import {
  FaDumbbell, FaClock, FaPlus, FaChartLine,
  FaHistory, FaUser, FaCog, FaTrophy, FaSignOutAlt,
  FaEdit, FaMoon, FaSun, FaLock, FaBolt, FaCamera, FaSave, FaTimes,
  FaCheckCircle, FaTrash, FaFlag
} from 'react-icons/fa';

/* ─── Design tokens ────────────────────────────────────────────── */
const SIDEBAR_BG   = '#0f172a';
const ACCENT       = '#6366f1';
const ACCENT_HOVER = '#4f46e5';

/* ─── Sidebar item config ───────────────────────────────────────── */
const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard',   icon: FaChartLine },
  { id: 'workouts',  label: 'My workouts', icon: FaHistory   },
  { id: 'progress',  label: 'Progress',     icon: FaDumbbell  },
  { id: 'goals',     label: 'Goals',       icon: FaTrophy    },
  { id: 'profile',   label: 'Profile',     icon: FaUser      },
  { id: 'settings',  label: 'Settings',    icon: FaCog       },
];

/* ─── Tiny style helpers ────────────────────────────────────────── */
const sx = {
  sidebar: {
    width: 240,
    minWidth: 240,
    background: SIDEBAR_BG,
    display: 'flex',
    flexDirection: 'column',
    position: 'sticky',
    top: 0,
    height: '100vh',
  },
  navBtn: (active) => ({
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    width: '100%',
    padding: '9px 14px',
    border: 'none',
    borderRadius: 8,
    background: active ? ACCENT : 'transparent',
    color: active ? '#fff' : 'rgba(255,255,255,0.5)',
    fontSize: 13,
    fontWeight: active ? 500 : 400,
    cursor: 'pointer',
    marginBottom: 2,
    transition: 'background 0.15s, color 0.15s',
    textAlign: 'left',
  }),
  footerBtn: (danger = false) => ({
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    width: '100%',
    padding: '9px 14px',
    border: 'none',
    borderRadius: 8,
    background: 'transparent',
    color: danger ? '#f87171' : 'rgba(255,255,255,0.5)',
    fontSize: 13,
    cursor: 'pointer',
    marginBottom: 2,
    textAlign: 'left',
  }),
  statCard: (dark) => ({
    background: dark ? '#1e293b' : '#fff',
    border: `0.5px solid ${dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
    borderRadius: 12,
    padding: '18px 20px',
  }),
  card: (dark) => ({
    background: dark ? '#1e293b' : '#fff',
    border: `0.5px solid ${dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
    borderRadius: 12,
    overflow: 'hidden',
  }),
  cardHeader: (dark) => ({
    padding: '14px 20px',
    borderBottom: `0.5px solid ${dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
    fontSize: 14,
    fontWeight: 500,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  }),
  input: (dark) => ({
    width: '100%',
    padding: '8px 12px',
    borderRadius: 6,
    fontSize: 13,
    border: `0.5px solid ${dark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)'}`,
    background: dark ? '#1e293b' : '#fff',
    color: dark ? '#f1f5f9' : '#0f172a',
    marginTop: 4,
    marginBottom: 12,
    outline: 'none',
  })
};

const STAT_COLORS = {
  indigo: { bg: '#eef2ff', color: '#6366f1', darkBg: '#312e81' },
  emerald: { bg: '#ecfdf5', color: '#10b981', darkBg: '#064e3b' },
  sky:     { bg: '#e0f2fe', color: '#0ea5e9', darkBg: '#0c4a6e' },
};

function StatCard({ title, value, unit, icon: Icon, accent, dark }) {
  const c = STAT_COLORS[accent];
  return (
    <div style={sx.statCard(dark)}>
      <div style={{
        width: 36, height: 36, borderRadius: 8, marginBottom: 12,
        background: dark ? c.darkBg : c.bg,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icon size={18} color={c.color} />
      </div>
      <p style={{ fontSize: 12, color: dark ? 'rgba(255,255,255,0.45)' : '#6b7280', marginBottom: 4 }}>
        {title}
      </p>
      <p style={{ fontSize: 26, fontWeight: 500, lineHeight: 1 }}>{value}</p>
      {unit && (
        <p style={{ fontSize: 12, color: dark ? 'rgba(255,255,255,0.45)' : '#6b7280', marginTop: 3 }}>
          {unit}
        </p>
      )}
    </div>
  );
}

/* ─── Main component ─────────────────────────────────────────────── */
const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);

  const [workouts,     setWorkouts]     = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [currentView,  setCurrentView]  = useState('dashboard');
  const [showForm,     setShowForm]     = useState(true);
  const [darkMode,     setDarkMode]     = useState(false);
  const [stats,        setStats]        = useState({ totalWorkouts: 0, totalDuration: 0, avgDuration: 0 });

  /* ── Functional Goals State Framework ── */
  const [goals, setGoals] = useState([
    { id: 1, title: 'Complete 10 Strength Sessions', category: 'Workouts', target: 10, current: 4, completed: false },
    { id: 2, title: 'Reach 300 total Training Minutes', category: 'Duration', target: 300, current: 180, completed: false }
  ]);
  const [showGoalForm, setShowGoalForm] = useState(false);
  const [newGoal, setNewGoal] = useState({ title: '', category: 'Workouts', target: '' });

  /* ── Profile Editing States ── */
  const [isEditing, setIsEditing] = useState(false);
  const [profileForm, setProfileForm] = useState({ name: '', email: '', avatar: '' });
  const fileInputRef = useRef(null);

  /* Dark mode ── */
  useEffect(() => {
    const saved = localStorage.getItem('darkMode') === 'true';
    setDarkMode(saved);
    document.documentElement.classList.toggle('dark', saved);
  }, []);

  const toggleDark = () => {
    const next = !darkMode;
    setDarkMode(next);
    localStorage.setItem('darkMode', next);
    document.documentElement.classList.toggle('dark', next);
  };

  /* Data ── */
  useEffect(() => { fetchWorkouts(); }, []);

  useEffect(() => {
    if (user) {
      const storedAvatar = localStorage.getItem(`avatar_${user.email}`) || user.avatar || '';
      const storedName = localStorage.getItem(`name_${user.email}`) || user.name || '';
      
      setProfileForm({
        name: storedName,
        email: user.email || '',
        avatar: storedAvatar
      });
    }
  }, [user]);

  const fetchWorkouts = async () => {
    try {
      const { data } = await API.get('/workouts');
      setWorkouts(data);
    } catch (e) {
      console.error('Error fetching workouts:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const n   = workouts.length;
    const totalDur = workouts.reduce((s, w) => s + (w.duration || 0), 0);
    const avgDur = n ? Math.round(totalDur / n) : 0;
    setStats({ totalWorkouts: n, totalDuration: totalDur, avgDuration: avgDur });
  }, [workouts]);

  const addWorkout    = async (data)       => { try { const r = await API.post('/workouts', data);          setWorkouts(p => [r.data, ...p]); } catch (e) { throw e; } };
  const updateWorkout = async (id, data)   => { try { const r = await API.put(`/workouts/${id}`, data);    setWorkouts(p => p.map(w => w._id === id ? r.data : w)); } catch (e) { throw e; } };
  const deleteWorkout = async (id)         => { try { await API.delete(`/workouts/${id}`);                  setWorkouts(p => p.filter(w => w._id !== id)); } catch (e) { console.error(e); } };

  /* ── Goals Business Logic ── */
  const handleCreateGoal = (e) => {
    e.preventDefault();
    if (!newGoal.title || !newGoal.target) return;

    const goalItem = {
      id: Date.now(),
      title: newGoal.title,
      category: newGoal.category,
      target: parseInt(newGoal.target, 10),
      current: 0,
      completed: false
    };

    setGoals(prev => [...prev, goalItem]);
    setNewGoal({ title: '', category: 'Workouts', target: '' });
    setShowGoalForm(false);
  };

  const handleIncrementGoal = (id) => {
    setGoals(prev => prev.map(g => {
      if (g.id === id) {
        const updatedCurrent = g.current + 1;
        return {
          ...g,
          current: updatedCurrent,
          completed: updatedCurrent >= g.target
        };
      }
      return g;
    }));
  };

  const handleDeleteGoal = (id) => {
    setGoals(prev => prev.filter(g => g.id !== id));
  };

  /* ── Profile Business Logic ── */
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileForm(prev => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const saveProfileUpdates = async () => {
    try {
      if (profileForm.email) {
        localStorage.setItem(`avatar_${profileForm.email}`, profileForm.avatar);
        localStorage.setItem(`name_${profileForm.email}`, profileForm.name);
      }
      setIsEditing(false);
      alert('Profile details saved successfully!');
    } catch (e) {
      console.error('Profile update failed:', e);
    }
  };

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <div className="spinner-border text-primary" role="status" style={{ width: '2.5rem', height: '2.5rem' }} />
    </div>
  );

  const textPrimary   = darkMode ? '#f1f5f9' : '#0f172a';
  const textSecondary = darkMode ? 'rgba(255,255,255,0.45)' : '#6b7280';
  const pageBg        = darkMode ? '#0f172a' : '#f8fafc';

  const firstName = profileForm.name?.split(' ')[0] || 'Champion';

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: pageBg, color: textPrimary }}>

      {/* ── Sidebar ── */}
      <aside style={sx.sidebar}>
        {/* Logo */}
        <div style={{ padding: '18px 16px', borderBottom: '0.5px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 8, background: ACCENT, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FaBolt size={16} color="#fff" />
          </div>
          <div>
            <p style={{ color: '#fff', fontWeight: 500, fontSize: 15, lineHeight: 1 }}>FitForge</p>
            <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 11, marginTop: 3 }}>Forge your strength</p>
          </div>
        </div>

        {/* Dynamic Sidebar Avatar Feature */}
        <div style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: '0.5px solid rgba(255,255,255,0.08)' }}>
          {profileForm.avatar ? (
            <img src={profileForm.avatar} alt="Avatar Mini Preview" style={{ width: 34, height: 34, borderRadius: '50%', objectFit: 'cover' }} />
          ) : (
            <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FaUser size={14} color="rgba(255,255,255,0.6)" />
            </div>
          )}
          <div style={{ overflow: 'hidden' }}>
            <p style={{ color: '#fff', fontSize: 13, fontWeight: 500, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{profileForm.name || 'User'}</p>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11 }}>Active Tier</p>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ padding: '12px 10px', flex: 1 }}>
          {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setCurrentView(id)}
              style={sx.navBtn(currentView === id)}
              onMouseEnter={e => { if (currentView !== id) { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'rgba(255,255,255,0.8)'; }}}
              onMouseLeave={e => { if (currentView !== id) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; }}}
            >
              <Icon size={15} />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div style={{ padding: '12px 10px', borderTop: '0.5px solid rgba(255,255,255,0.08)' }}>
          <button style={sx.footerBtn()} onClick={toggleDark}>
            {darkMode ? <FaSun size={14} /> : <FaMoon size={14} />}
            <span>{darkMode ? 'Light mode' : 'Dark mode'}</span>
          </button>
          <button style={sx.footerBtn(true)} onClick={logout}>
            <FaSignOutAlt size={14} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* ── Main content ── */}
      <main style={{ flex: 1, padding: '28px 32px', overflowY: 'auto', minWidth: 0 }}>

        {/* Page header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 500, marginBottom: 4 }}>
              {currentView === 'dashboard'
                ? `Welcome back, ${firstName}!`
                : NAV_ITEMS.find(i => i.id === currentView)?.label ?? ''}
            </h1>
            <p style={{ fontSize: 13, color: textSecondary }}>
              {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          {(currentView === 'dashboard' || currentView === 'workouts') && (
            <button
              onClick={() => setShowForm(v => !v)}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '8px 16px', border: 'none', borderRadius: 8,
                background: ACCENT, color: '#fff', fontSize: 13, fontWeight: 500, cursor: 'pointer',
              }}
            >
              <FaPlus size={12} />
              {showForm ? 'Hide form' : 'New workout'}
            </button>
          )}
        </div>

        {/* ── DASHBOARD ── */}
        {currentView === 'dashboard' && (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, marginBottom: 20 }}>
              <StatCard title="Total workouts"  value={stats.totalWorkouts}  icon={FaDumbbell} accent="indigo"  dark={darkMode} />
              <div style={sx.statCard(darkMode)}>
                <div style={{
                  width: 36, height: 36, borderRadius: 8, marginBottom: 12,
                  background: darkMode ? '#0c4a6e' : '#e0f2fe',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <FaClock size={18} color="#0ea5e9" />
                </div>
                <p style={{ fontSize: 12, color: textSecondary, marginBottom: 4 }}>Total Time Spent</p>
                <p style={{ fontSize: 26, fontWeight: 500, lineHeight: 1 }}>{stats.totalDuration} <span style={{ fontSize: 14, color: textSecondary }}>min</span></p>
              </div>
              <StatCard title="Avg duration"    value={stats.avgDuration}    unit="min"  icon={FaClock}    accent="emerald"    dark={darkMode} />
            </div>

            <div style={sx.card(darkMode)}>
              <div style={sx.cardHeader(darkMode)}>
                <span>Progress overview</span>
              </div>
              <div style={{ padding: 20 }}>
                <ProgressChart workouts={workouts} />
              </div>
            </div>
          </>
        )}

        {/* ── WORKOUTS ── */}
        {currentView === 'workouts' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {showForm && (
              <div style={sx.card(darkMode)}>
                <div style={sx.cardHeader(darkMode)}>Log new workout</div>
                <div style={{ padding: 20 }}>
                  <WorkoutForm onSubmit={addWorkout} />
                </div>
              </div>
            )}
            <div style={sx.card(darkMode)}>
              <div style={sx.cardHeader(darkMode)}>
                <span>My workouts</span>
                <span style={{ fontSize: 12, color: textSecondary, background: darkMode ? 'rgba(255,255,255,0.06)' : '#f1f5f9', padding: '2px 8px', borderRadius: 20 }}>
                  {workouts.length}
                </span>
              </div>
              <WorkoutList workouts={workouts} onUpdate={updateWorkout} onDelete={deleteWorkout} />
            </div>
          </div>
        )}

        {/* ── PROGRESS ── */}
        {currentView === 'progress' && (
          <div style={sx.card(darkMode)}>
            <div style={sx.cardHeader(darkMode)}>Detailed progress analytics</div>
            <div style={{ padding: 20 }}>
              <ProgressChart workouts={workouts} />
            </div>
          </div>
        )}

        {/* ── GOALS ── */}
        {currentView === 'goals' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: 16, fontWeight: 500 }}>Active Goals Tracker</h2>
              <button 
                onClick={() => setShowGoalForm(!showGoalForm)}
                style={{
                  padding: '8px 16px', border: 'none', borderRadius: 8,
                  background: ACCENT, color: '#fff', fontSize: 13, fontWeight: 500, cursor: 'pointer',
                }}
              >
                {showGoalForm ? 'Cancel Form' : 'Create new goal'}
              </button>
            </div>

            {showGoalForm && (
              <form onSubmit={handleCreateGoal} style={{ ...sx.card(darkMode), padding: 20, maxWidth: 500 }}>
                <h3 style={{ fontSize: 14, fontWeight: 500, marginBottom: 12 }}>New Milestone parameters</h3>
                <label style={{ fontSize: 12, color: textSecondary }}>Goal Description</label>
                <input 
                  type="text" 
                  placeholder="e.g. 5 Complete Legs Sessions"
                  value={newGoal.title}
                  onChange={e => setNewGoal(prev => ({ ...prev, title: e.target.value }))}
                  style={sx.input(darkMode)}
                  required
                />
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div>
                    <label style={{ fontSize: 12, color: textSecondary }}>Category</label>
                    <select 
                      value={newGoal.category}
                      onChange={e => setNewGoal(prev => ({ ...prev, category: e.target.value }))}
                      style={{ ...sx.input(darkMode), cursor: 'pointer' }}
                    >
                      <option value="Workouts">Workouts Sessions</option>
                      <option value="Duration">Total Duration (min)</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: 12, color: textSecondary }}>Target Count</label>
                    <input 
                      type="number" 
                      placeholder="e.g. 10"
                      value={newGoal.target}
                      onChange={e => setNewGoal(prev => ({ ...prev, target: e.target.value }))}
                      style={sx.input(darkMode)}
                      min="1"
                      required
                    />
                  </div>
                </div>
                <button type="submit" style={{ padding: '8px 20px', border: 'none', background: '#10b981', color: '#fff', borderRadius: 6, fontSize: 13, cursor: 'pointer' }}>
                  Save Goal
                </button>
              </form>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {goals.map(goal => (
                <div key={goal.id} style={{ ...sx.card(darkMode), padding: 18, opacity: goal.completed ? 0.75 : 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                    <div>
                      <span style={{ fontSize: 11, background: ACCENT, color: '#fff', padding: '2px 8px', borderRadius: 12, fontWeight: 500 }}>
                        {goal.category}
                      </span>
                      <h4 style={{ fontSize: 15, fontWeight: 500, marginTop: 8, marginBottom: 4 }}>{goal.title}</h4>
                      <p style={{ fontSize: 12, color: textSecondary }}>Progress: {goal.current} / {goal.target}</p>
                    </div>
                    <div style={{ display: 'flex', gap: 6 }}>
                      {!goal.completed && (
                        <button 
                          onClick={() => handleIncrementGoal(goal.id)}
                          style={{ border: 'none', background: 'rgba(16,185,129,0.1)', color: '#10b981', padding: '6px 10px', borderRadius: 6, cursor: 'pointer', fontSize: 12 }}
                          title="Log Increment"
                        >
                          +1 Progress
                        </button>
                      )}
                      <button 
                        onClick={() => handleDeleteGoal(goal.id)}
                        style={{ border: 'none', background: 'transparent', color: '#f87171', cursor: 'pointer', padding: 4 }}
                      >
                        <FaTrash size={13} />
                      </button>
                    </div>
                  </div>

                  {/* Progress Bar Display Rendering */}
                  <div style={{ width: '100%', height: 6, background: darkMode ? '#334155' : '#e2e8f0', borderRadius: 3, overflow: 'hidden', position: 'relative' }}>
                    <div style={{
                      width: `${Math.min((goal.current / goal.target) * 100, 100)}%`,
                      height: '100%',
                      background: goal.completed ? '#10b981' : ACCENT,
                      transition: 'width 0.3s ease'
                    }} />
                  </div>

                  {goal.completed && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#10b981', fontSize: 12, marginTop: 10 }}>
                      <FaCheckCircle size={12} /> <span>Goal Completed Successfully!</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── PROFILE ── */}
        {currentView === 'profile' && (
          <div style={sx.card(darkMode)}>
            <div style={{ ...sx.cardHeader(darkMode), justifyContent: 'space-between' }}>
              <span>My profile</span>
              {!isEditing ? (
                <button 
                  onClick={() => setIsEditing(true)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px',
                    border: `0.5px solid ${darkMode ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)'}`,
                    borderRadius: 8, background: 'transparent', color: ACCENT, fontSize: 13, cursor: 'pointer',
                  }}
                >
                  <FaEdit size={12} /> Edit profile
                </button>
              ) : (
                <div style={{ display: 'flex', gap: 8 }}>
                  <button 
                    onClick={saveProfileUpdates}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px',
                      border: 'none', borderRadius: 8, background: '#10b981', color: '#fff', fontSize: 13, cursor: 'pointer',
                    }}
                  >
                    <FaSave size={12} /> Save
                  </button>
                  <button 
                    onClick={() => {
                      setIsEditing(false);
                      if (user) {
                        const savedAvatar = localStorage.getItem(`avatar_${user.email}`) || user.avatar || '';
                        const savedName = localStorage.getItem(`name_${user.email}`) || user.name || '';
                        setProfileForm({ name: savedName, email: user.email || '', avatar: savedAvatar });
                      }
                    }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px',
                      border: `0.5px solid ${darkMode ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)'}`, 
                      borderRadius: 8, background: 'transparent', color: '#f87171', fontSize: 13, cursor: 'pointer',
                    }}
                  >
                    <FaTimes size={12} /> Cancel
                  </button>
                </div>
              )}
            </div>
            <div style={{ padding: 28 }}>
              <div style={{ display: 'flex', gap: 28, alignItems: 'flex-start', flexWrap: 'wrap' }}>
                
                {/* Avatar Display Frame */}
                <div style={{ position: 'relative', flexShrink: 0 }}>
                  <div style={{
                    width: 80, height: 80, borderRadius: '50%',
                    background: darkMode ? '#312e81' : '#eef2ff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    overflow: 'hidden', border: `2px solid ${ACCENT}`
                  }}>
                    {profileForm.avatar ? (
                      <img src={profileForm.avatar} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <FaUser size={32} color={ACCENT} />
                    )}
                  </div>
                  
                  {isEditing && (
                    <>
                      <button
                        onClick={() => fileInputRef.current.click()}
                        style={{
                          position: 'absolute', bottom: -4, right: -4, width: 28, height: 28,
                          borderRadius: '50%', background: ACCENT, border: 'none',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff'
                        }}
                        title="Upload Avatar Image"
                      >
                        <FaCamera size={12} />
                      </button>
                      <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleAvatarChange} 
                        accept="image/*" 
                        style={{ display: 'none' }} 
                      />
                    </>
                  )}
                </div>

                {/* Profile Details Content Form */}
                <div style={{ flex: 1, minWidth: 250 }}>
                  {!isEditing ? (
                    <>
                      <h2 style={{ fontSize: 18, fontWeight: 500, marginBottom: 4 }}>{profileForm.name || 'User'}</h2>
                      <p style={{ color: textSecondary, fontSize: 14, marginBottom: 20 }}>{profileForm.email}</p>
                    </>
                  ) : (
                    <div style={{ maxWidth: 400 }}>
                      <label style={{ fontSize: 12, fontWeight: 500, color: textSecondary }}>Full Name</label>
                      <input 
                        type="text" 
                        value={profileForm.name} 
                        onChange={e => setProfileForm(prev => ({ ...prev, name: e.target.value }))}
                        style={sx.input(darkMode)}
                      />
                      <label style={{ fontSize: 12, fontWeight: 500, color: textSecondary }}>Email Address</label>
                      <input 
                        type="email" 
                        value={profileForm.email} 
                        disabled
                        style={{ ...sx.input(darkMode), opacity: 0.6, cursor: 'not-allowed' }}
                      />
                    </div>
                  )}

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 24px', fontSize: 13, marginTop: 12 }}>
                    {[
                      ['Member since', new Date().getFullYear()],
                      ['Total workouts logged', stats.totalWorkouts],
                      ['Total duration', `${stats.totalDuration} min`],
                      ['Avg duration per session', `${stats.avgDuration} min`],
                    ].map(([label, val]) => (
                      <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: `0.5px solid ${darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}` }}>
                        <span style={{ color: textSecondary }}>{label}</span>
                        <span style={{ fontWeight: 500 }}>{val}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* ── SETTINGS ── */}
        {currentView === 'settings' && (
          <div style={sx.card(darkMode)}>
            <div style={sx.cardHeader(darkMode)}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><FaCog size={14} /> Application settings</span>
            </div>
            <div style={{ padding: 28 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>

                {/* General */}
                <div>
                  <h3 style={{ fontSize: 13, fontWeight: 500, color: textSecondary, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 14 }}>General</h3>
                  <SettingRow label="Dark mode" desc="Toggle dark theme" dark={darkMode}>
                    <label style={{ position: 'relative', display: 'inline-block', width: 40, height: 22 }}>
                      <input type="checkbox" checked={darkMode} onChange={toggleDark} style={{ opacity: 0, width: 0, height: 0 }} />
                      <span style={{
                        position: 'absolute', inset: 0, background: darkMode ? ACCENT : '#d1d5db',
                        borderRadius: 11, transition: 'background 0.2s', cursor: 'pointer',
                      }}>
                        <span style={{
                          position: 'absolute', top: 3, left: darkMode ? 21 : 3,
                          width: 16, height: 16, background: '#fff', borderRadius: '50%', transition: 'left 0.2s',
                        }} />
                      </span>
                    </label>
                  </SettingRow>
                  <SettingRow label="Measurement units" dark={darkMode}>
                    <select defaultValue="metric" style={{
                      padding: '5px 10px', borderRadius: 6, fontSize: 12,
                      border: `0.5px solid ${darkMode ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)'}`,
                      background: darkMode ? '#1e293b' : '#fff',
                      color: textPrimary,
                    }}>
                      <option value="metric">Metric (kg, cm)</option>
                      <option value="imperial">Imperial (lbs, in)</option>
                    </select>
                  </SettingRow>
                </div>

                {/* Notifications */}
                <div>
                  <h3 style={{ fontSize: 13, fontWeight: 500, color: textSecondary, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 14 }}>Notifications</h3>
                  {['Daily workout reminder', 'Streak alerts', 'Progress milestones'].map(label => (
                    <SettingRow key={label} label={label} dark={darkMode}>
                      <Toggle defaultChecked accent={ACCENT} />
                    </SettingRow>
                  ))}
                </div>
              </div>

              {/* Security */}
              <div style={{ marginTop: 32 }}>
                <h3 style={{ fontSize: 13, fontWeight: 500, color: textSecondary, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 14 }}>Privacy &amp; security</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 32px' }}>
                  <SettingRow label="Two-factor authentication" dark={darkMode} icon={<FaLock size={12} />}>
                    <button style={{
                      padding: '5px 14px', borderRadius: 6, fontSize: 12,
                      border: `0.5px solid ${ACCENT}`, background: 'transparent', color: ACCENT, cursor: 'pointer',
                    }}>Enable</button>
                  </SettingRow>
                  <SettingRow label="Export my data" dark={darkMode}>
                    <button style={{
                      padding: '5px 14px', borderRadius: 6, fontSize: 12,
                      border: `0.5px solid ${darkMode ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)'}`,
                      background: 'transparent', color: textPrimary, cursor: 'pointer',
                    }}>Download</button>
                  </SettingRow>
                </div>
              </div>

              <div style={{ marginTop: 32, textAlign: 'right' }}>
                <button style={{
                  padding: '10px 28px', border: 'none', borderRadius: 8,
                  background: ACCENT, color: '#fff', fontSize: 13, fontWeight: 500, cursor: 'pointer',
                }}>Save changes</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

/* ── Small helpers ────────────────────────────────────────────────── */

function SettingRow({ label, desc, children, dark, icon }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '11px 0',
      borderBottom: `0.5px solid ${dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        {icon}
        <div>
          <p style={{ fontSize: 13, fontWeight: 500 }}>{label}</p>
          {desc && <p style={{ fontSize: 11, color: dark ? 'rgba(255,255,255,0.35)' : '#9ca3af', marginTop: 1 }}>{desc}</p>}
        </div>
      </div>
      {children}
    </div>
  );
}

function Toggle({ defaultChecked, accent }) {
  const [on, setOn] = useState(defaultChecked ?? false);
  return (
    <label style={{ position: 'relative', display: 'inline-block', width: 40, height: 22, cursor: 'pointer' }}>
      <input type="checkbox" checked={on} onChange={() => setOn(v => !v)} style={{ opacity: 0, width: 0, height: 0 }} />
      <span style={{ position: 'absolute', inset: 0, background: on ? accent : '#d1d5db', borderRadius: 11, transition: 'background 0.2s' }}>
        <span style={{
          position: 'absolute', top: 3, left: on ? 21 : 3,
          width: 16, height: 16, background: '#fff', borderRadius: '50%', transition: 'left 0.2s',
        }} />
      </span>
    </label>
  );
}

export default Dashboard;