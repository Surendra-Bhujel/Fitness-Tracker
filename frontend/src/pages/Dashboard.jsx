import React, { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
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

/* ─── Design tokens — same system as LandingPage / LoginPage.
   Pull these into a shared theme.js and import everywhere;
   copy-pasted three times now, that's worth fixing before a fourth file. ── */
const SIDEBAR_BG = '#17181a';
const YELLOW      = '#f5c400';
const RED          = '#c1272d';
const GREEN        = '#5c7a4f';   // muted moss — used only for "done" states, not a brand color
const PAPER        = '#ece7da';
const PAPER_CARD    = '#f5f1e6';
const DARK_CARD     = '#1e1f21';
const LINE_LIGHT    = 'rgba(23,24,26,0.12)';
const LINE_DARK      = 'rgba(236,231,218,0.14)';

const DISPLAY = "'Anton', sans-serif";
const MONO    = "'JetBrains Mono', monospace";

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
    background: active ? YELLOW : 'transparent',
    color: active ? '#17181a' : 'rgba(236,231,218,0.5)',
    fontSize: 13,
    fontWeight: active ? 700 : 400,
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
    background: 'transparent',
    color: danger ? RED : 'rgba(236,231,218,0.5)',
    fontSize: 13,
    cursor: 'pointer',
    marginBottom: 2,
    textAlign: 'left',
  }),
  statCard: (dark) => ({
    background: dark ? DARK_CARD : PAPER_CARD,
    border: `1px solid ${dark ? LINE_DARK : LINE_LIGHT}`,
    padding: '18px 20px',
  }),
  card: (dark) => ({
    background: dark ? DARK_CARD : PAPER_CARD,
    border: `1px solid ${dark ? LINE_DARK : LINE_LIGHT}`,
    overflow: 'hidden',
  }),
  cardHeader: (dark) => ({
    padding: '14px 20px',
    borderBottom: `1px solid ${dark ? LINE_DARK : LINE_LIGHT}`,
    fontSize: 13,
    fontWeight: 600,
    letterSpacing: '0.02em',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  }),
  input: (dark) => ({
    width: '100%',
    padding: '8px 12px',
    fontSize: 13,
    fontFamily: MONO,
    border: `1px solid ${dark ? LINE_DARK : LINE_LIGHT}`,
    background: 'transparent',
    color: dark ? '#ece7da' : '#17181a',
    marginTop: 4,
    marginBottom: 12,
    outline: 'none',
  })
};

/* Left accent bar alternates yellow/red instead of a rainbow of icon colors */
function StatCard({ title, value, unit, icon: Icon, accentColor, dark }) {
  return (
    <div style={{ ...sx.statCard(dark), borderLeft: `3px solid ${accentColor}`, position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
        <Icon size={13} color={dark ? 'rgba(236,231,218,0.4)' : 'rgba(23,24,26,0.4)'} />
        <p style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em', color: dark ? 'rgba(236,231,218,0.45)' : 'rgba(23,24,26,0.5)', margin: 0 }}>
          {title}
        </p>
      </div>
      <p style={{ fontFamily: MONO, fontSize: 28, fontWeight: 700, lineHeight: 1, margin: 0 }}>{value}</p>
      {unit && (
        <p style={{ fontSize: 12, color: dark ? 'rgba(236,231,218,0.45)' : 'rgba(23,24,26,0.5)', marginTop: 4, marginBottom: 0 }}>
          {unit}
        </p>
      )}
    </div>
  );
}

/* ─── Main component ─────────────────────────────────────────────── */
const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate(); // ✅ ADDED for navigation

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

  /* ── Logout Handler ── */
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: darkMode ? '#17181a' : '#ece7da' }}>
      <div className="spinner-border" role="status" style={{ width: '2.5rem', height: '2.5rem', color: YELLOW }} />
    </div>
  );

  const textPrimary   = darkMode ? '#ece7da' : '#17181a';
  const textSecondary = darkMode ? 'rgba(236,231,218,0.45)' : 'rgba(23,24,26,0.55)';
  const pageBg        = darkMode ? '#17181a' : '#ece7da';
  const lineColor      = darkMode ? LINE_DARK : LINE_LIGHT;

  const firstName = profileForm.name?.split(' ')[0] || 'Champion';

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: pageBg, color: textPrimary, fontFamily: "'Inter', system-ui, sans-serif" }}>

      {/* ── Sidebar ── */}
      <aside style={sx.sidebar}>
        {/* Logo */}
        <div style={{ padding: '18px 16px', borderBottom: `1px solid ${LINE_DARK}`, display: 'flex', alignItems: 'center', gap: 10 }}>
          <svg width="30" height="30" viewBox="0 0 26 26" fill="none">
            <rect x="1" y="11" width="4" height="4" fill={YELLOW} />
            <rect x="6" y="8" width="3" height="10" fill="#ece7da" />
            <rect x="10" y="12" width="6" height="2" fill="#ece7da" />
            <rect x="17" y="8" width="3" height="10" fill="#ece7da" />
            <rect x="21" y="11" width="4" height="4" fill={YELLOW} />
          </svg>
          <div>
            <p style={{ color: '#ece7da', fontFamily: DISPLAY, textTransform: 'uppercase', fontSize: 15, lineHeight: 1, margin: 0 }}>FitForge</p>
            <p style={{ color: 'rgba(236,231,218,0.35)', fontSize: 11, marginTop: 3, marginBottom: 0 }}>Forge your strength</p>
          </div>
        </div>

        {/* Sidebar avatar */}
        <div style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: `1px solid ${LINE_DARK}` }}>
          {profileForm.avatar ? (
            <img src={profileForm.avatar} alt="Avatar Mini Preview" style={{ width: 34, height: 34, objectFit: 'cover', border: `1px solid ${LINE_DARK}` }} />
          ) : (
            <div style={{ width: 34, height: 34, background: 'rgba(236,231,218,0.08)', border: `1px solid ${LINE_DARK}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FaUser size={14} color="rgba(236,231,218,0.6)" />
            </div>
          )}
          <div style={{ overflow: 'hidden' }}>
            <p style={{ color: '#ece7da', fontSize: 13, fontWeight: 500, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', margin: 0 }}>{profileForm.name || 'User'}</p>
            <p style={{ color: YELLOW, fontFamily: MONO, fontSize: 10, letterSpacing: '0.04em', margin: 0 }}>ACTIVE LOG</p>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ padding: '12px 10px', flex: 1 }}>
          {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setCurrentView(id)}
              style={sx.navBtn(currentView === id)}
              onMouseEnter={e => { if (currentView !== id) { e.currentTarget.style.background = 'rgba(236,231,218,0.06)'; e.currentTarget.style.color = 'rgba(236,231,218,0.85)'; }}}
              onMouseLeave={e => { if (currentView !== id) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(236,231,218,0.5)'; }}}
            >
              <Icon size={14} />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div style={{ padding: '12px 10px', borderTop: `1px solid ${LINE_DARK}` }}>
          <button style={sx.footerBtn()} onClick={toggleDark}>
            {darkMode ? <FaSun size={13} /> : <FaMoon size={13} />}
            <span>{darkMode ? 'Light mode' : 'Dark mode'}</span>
          </button>
          <button style={sx.footerBtn(true)} onClick={handleLogout}>
            <FaSignOutAlt size={13} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* ── Main content ── */}
      <main style={{ flex: 1, padding: '28px 32px', overflowY: 'auto', minWidth: 0 }}>

        {/* Page header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
          <div>
            <h1 style={{ fontSize: 21, fontWeight: 600, marginBottom: 4 }}>
              {currentView === 'dashboard'
                ? `Welcome back, ${firstName}`
                : NAV_ITEMS.find(i => i.id === currentView)?.label ?? ''}
            </h1>
            <p style={{ fontSize: 13, color: textSecondary, fontFamily: MONO }}>
              {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          {(currentView === 'dashboard' || currentView === 'workouts') && (
            <button
              onClick={() => setShowForm(v => !v)}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '9px 16px', border: 'none',
                background: YELLOW, color: '#17181a', fontSize: 13, fontWeight: 700, cursor: 'pointer',
              }}
            >
              <FaPlus size={11} />
              {showForm ? 'Hide form' : 'New workout'}
            </button>
          )}
        </div>

        {/* ── DASHBOARD ── */}
        {currentView === 'dashboard' && (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, marginBottom: 20 }}>
              <StatCard title="Total workouts" value={stats.totalWorkouts} icon={FaDumbbell} accentColor={YELLOW} dark={darkMode} />
              <StatCard title="Total time spent" value={stats.totalDuration} unit="min" icon={FaClock} accentColor={RED} dark={darkMode} />
              <StatCard title="Avg duration" value={stats.avgDuration} unit="min" icon={FaClock} accentColor={YELLOW} dark={darkMode} />
            </div>

            {/* "New workout" toggles this — previously only wired up on the Workouts tab */}
            {showForm && (
              <div style={{ ...sx.card(darkMode), marginBottom: 16 }}>
                <div style={sx.cardHeader(darkMode)}>Log new workout</div>
                <div style={{ padding: 20 }}>
                  <WorkoutForm onSubmit={addWorkout} dark={darkMode} />
                </div>
              </div>
            )}

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
                  <WorkoutForm onSubmit={addWorkout} dark={darkMode} />
                </div>
              </div>
            )}
            <div style={sx.card(darkMode)}>
              <div style={sx.cardHeader(darkMode)}>
                <span>My workouts</span>
                <span style={{ fontSize: 12, fontFamily: MONO, color: textSecondary, border: `1px solid ${lineColor}`, padding: '2px 8px' }}>
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
              <h2 style={{ fontSize: 16, fontWeight: 600 }}>Active goals</h2>
              <button
                onClick={() => setShowGoalForm(!showGoalForm)}
                style={{
                  padding: '9px 16px', border: 'none',
                  background: YELLOW, color: '#17181a', fontSize: 13, fontWeight: 700, cursor: 'pointer',
                }}
              >
                {showGoalForm ? 'Cancel' : 'Create new goal'}
              </button>
            </div>

            {showGoalForm && (
              <form onSubmit={handleCreateGoal} style={{ ...sx.card(darkMode), padding: 20, maxWidth: 500 }}>
                <h3 style={{ fontSize: 13, fontWeight: 600, marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.04em' }}>New goal</h3>
                <label style={{ fontSize: 12, color: textSecondary }}>Goal description</label>
                <input
                  type="text"
                  placeholder="e.g. 5 complete leg sessions"
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
                      <option value="Workouts">Workout sessions</option>
                      <option value="Duration">Total duration (min)</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: 12, color: textSecondary }}>Target</label>
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
                <button type="submit" style={{ padding: '9px 20px', border: 'none', background: YELLOW, color: '#17181a', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
                  Save goal
                </button>
              </form>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {goals.map(goal => (
                <div key={goal.id} style={{ ...sx.card(darkMode), padding: 18, opacity: goal.completed ? 0.75 : 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                    <div>
                      <span style={{ fontFamily: MONO, fontSize: 11, border: `1px solid ${lineColor}`, padding: '2px 8px', letterSpacing: '0.04em' }}>
                        [{goal.category.toUpperCase()}]
                      </span>
                      <h4 style={{ fontSize: 15, fontWeight: 600, marginTop: 8, marginBottom: 4 }}>{goal.title}</h4>
                      <p style={{ fontSize: 12, fontFamily: MONO, color: textSecondary }}>{goal.current} / {goal.target}</p>
                    </div>
                    <div style={{ display: 'flex', gap: 6 }}>
                      {!goal.completed && (
                        <button
                          onClick={() => handleIncrementGoal(goal.id)}
                          style={{ border: `1px solid ${lineColor}`, background: 'transparent', color: textPrimary, padding: '6px 10px', cursor: 'pointer', fontSize: 12 }}
                          title="Log increment"
                        >
                          +1
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteGoal(goal.id)}
                        style={{ border: 'none', background: 'transparent', color: RED, cursor: 'pointer', padding: 4 }}
                      >
                        <FaTrash size={13} />
                      </button>
                    </div>
                  </div>

                  <div style={{ width: '100%', height: 5, background: darkMode ? 'rgba(236,231,218,0.1)' : 'rgba(23,24,26,0.08)', position: 'relative' }}>
                    <div style={{
                      width: `${Math.min((goal.current / goal.target) * 100, 100)}%`,
                      height: '100%',
                      background: goal.completed ? GREEN : YELLOW,
                      transition: 'width 0.3s ease'
                    }} />
                  </div>

                  {goal.completed && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: GREEN, fontSize: 12, marginTop: 10 }}>
                      <FaCheckCircle size={12} /> <span>Goal completed</span>
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
                    border: `1px solid ${lineColor}`,
                    background: 'transparent', color: textPrimary, fontSize: 13, cursor: 'pointer',
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
                      border: 'none', background: YELLOW, color: '#17181a', fontSize: 13, fontWeight: 700, cursor: 'pointer',
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
                      border: `1px solid ${lineColor}`,
                      background: 'transparent', color: RED, fontSize: 13, cursor: 'pointer',
                    }}
                  >
                    <FaTimes size={12} /> Cancel
                  </button>
                </div>
              )}
            </div>
            <div style={{ padding: 28 }}>
              <div style={{ display: 'flex', gap: 28, alignItems: 'flex-start', flexWrap: 'wrap' }}>

                {/* Avatar frame */}
                <div style={{ position: 'relative', flexShrink: 0 }}>
                  <div style={{
                    width: 80, height: 80,
                    background: darkMode ? '#111214' : '#e3ddcd',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    overflow: 'hidden', border: `2px solid ${YELLOW}`
                  }}>
                    {profileForm.avatar ? (
                      <img src={profileForm.avatar} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <FaUser size={32} color={YELLOW} />
                    )}
                  </div>

                  {isEditing && (
                    <>
                      <button
                        onClick={() => fileInputRef.current.click()}
                        style={{
                          position: 'absolute', bottom: -4, right: -4, width: 26, height: 26,
                          background: YELLOW, border: 'none',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#17181a'
                        }}
                        title="Upload avatar image"
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

                {/* Profile details */}
                <div style={{ flex: 1, minWidth: 250 }}>
                  {!isEditing ? (
                    <>
                      <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 4 }}>{profileForm.name || 'User'}</h2>
                      <p style={{ color: textSecondary, fontSize: 14, marginBottom: 20, fontFamily: MONO }}>{profileForm.email}</p>
                    </>
                  ) : (
                    <div style={{ maxWidth: 400 }}>
                      <label style={{ fontSize: 12, fontWeight: 500, color: textSecondary }}>Full name</label>
                      <input
                        type="text"
                        value={profileForm.name}
                        onChange={e => setProfileForm(prev => ({ ...prev, name: e.target.value }))}
                        style={sx.input(darkMode)}
                      />
                      <label style={{ fontSize: 12, fontWeight: 500, color: textSecondary }}>Email address</label>
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
                      <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: `1px solid ${lineColor}` }}>
                        <span style={{ color: textSecondary }}>{label}</span>
                        <span style={{ fontWeight: 600, fontFamily: MONO }}>{val}</span>
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
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><FaCog size={13} /> Application settings</span>
            </div>
            <div style={{ padding: 28 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>

                {/* General */}
                <div>
                  <h3 style={{ fontSize: 12, fontWeight: 700, color: textSecondary, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 14 }}>General</h3>
                  <SettingRow label="Dark mode" desc="Toggle dark theme" dark={darkMode} lineColor={lineColor}>
                    <label style={{ position: 'relative', display: 'inline-block', width: 40, height: 22 }}>
                      <input type="checkbox" checked={darkMode} onChange={toggleDark} style={{ opacity: 0, width: 0, height: 0 }} />
                      <span style={{
                        position: 'absolute', inset: 0, background: darkMode ? YELLOW : '#c9c3b3',
                        transition: 'background 0.2s', cursor: 'pointer',
                      }}>
                        <span style={{
                          position: 'absolute', top: 3, left: darkMode ? 21 : 3,
                          width: 16, height: 16, background: darkMode ? '#17181a' : '#fff', transition: 'left 0.2s',
                        }} />
                      </span>
                    </label>
                  </SettingRow>
                  <SettingRow label="Measurement units" dark={darkMode} lineColor={lineColor}>
                    <select defaultValue="metric" style={{
                      padding: '5px 10px', fontSize: 12,
                      border: `1px solid ${lineColor}`,
                      background: 'transparent',
                      color: textPrimary,
                    }}>
                      <option value="metric">Metric (kg, cm)</option>
                      <option value="imperial">Imperial (lbs, in)</option>
                    </select>
                  </SettingRow>
                </div>

                {/* Notifications */}
                <div>
                  <h3 style={{ fontSize: 12, fontWeight: 700, color: textSecondary, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 14 }}>Notifications</h3>
                  {['Daily workout reminder', 'Streak alerts', 'Progress milestones'].map(label => (
                    <SettingRow key={label} label={label} dark={darkMode} lineColor={lineColor}>
                      <Toggle defaultChecked accent={YELLOW} dark={darkMode} />
                    </SettingRow>
                  ))}
                </div>
              </div>

              {/* Security */}
              <div style={{ marginTop: 32 }}>
                <h3 style={{ fontSize: 12, fontWeight: 700, color: textSecondary, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 14 }}>Privacy &amp; security</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 32px' }}>
                  <SettingRow label="Two-factor authentication" dark={darkMode} lineColor={lineColor} icon={<FaLock size={12} />}>
                    <button style={{
                      padding: '5px 14px', fontSize: 12,
                      border: `1px solid ${YELLOW}`, background: 'transparent', color: darkMode ? YELLOW : '#8a6d00', cursor: 'pointer',
                    }}>Enable</button>
                  </SettingRow>
                  <SettingRow label="Export my data" dark={darkMode} lineColor={lineColor}>
                    <button style={{
                      padding: '5px 14px', fontSize: 12,
                      border: `1px solid ${lineColor}`,
                      background: 'transparent', color: textPrimary, cursor: 'pointer',
                    }}>Download</button>
                  </SettingRow>
                </div>
              </div>

              <div style={{ marginTop: 32, textAlign: 'right' }}>
                <button style={{
                  padding: '10px 28px', border: 'none',
                  background: YELLOW, color: '#17181a', fontSize: 13, fontWeight: 700, cursor: 'pointer',
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

function SettingRow({ label, desc, children, dark, icon, lineColor }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '11px 0',
      borderBottom: `1px solid ${lineColor}`,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        {icon}
        <div>
          <p style={{ fontSize: 13, fontWeight: 500, margin: 0 }}>{label}</p>
          {desc && <p style={{ fontSize: 11, color: dark ? 'rgba(236,231,218,0.35)' : 'rgba(23,24,26,0.45)', marginTop: 1, marginBottom: 0 }}>{desc}</p>}
        </div>
      </div>
      {children}
    </div>
  );
}

function Toggle({ defaultChecked, accent, dark }) {
  const [on, setOn] = useState(defaultChecked ?? false);
  return (
    <label style={{ position: 'relative', display: 'inline-block', width: 40, height: 22, cursor: 'pointer' }}>
      <input type="checkbox" checked={on} onChange={() => setOn(v => !v)} style={{ opacity: 0, width: 0, height: 0 }} />
      <span style={{ position: 'absolute', inset: 0, background: on ? accent : (dark ? 'rgba(236,231,218,0.15)' : '#c9c3b3'), transition: 'background 0.2s' }}>
        <span style={{
          position: 'absolute', top: 3, left: on ? 21 : 3,
          width: 16, height: 16, background: on ? '#17181a' : '#fff', transition: 'left 0.2s',
        }} />
      </span>
    </label>
  );
}

export default Dashboard;