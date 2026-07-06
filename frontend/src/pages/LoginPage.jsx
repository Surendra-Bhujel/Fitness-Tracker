import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import { FaEye, FaEyeSlash, FaDumbbell } from 'react-icons/fa';
import API from '../services/api';

const BG = '#17181a';
const PAPER = '#ece7da';
const INK = '#17181a';
const YELLOW = '#f5c400';
const RED = '#c1272d';
const TEXT = '#ece7da';
const TEXT_DIM = 'rgba(236,231,218,0.55)';
const LINE = 'rgba(236,231,218,0.14)';
const LINE_STRONG = 'rgba(236,231,218,0.28)';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await API.post('/auth/login', { email, password });
      login(response.data.user, response.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%',
    background: 'rgba(236,231,218,0.08)',
    border: `1px solid ${LINE_STRONG}`,
    borderRadius: 6,
    padding: '13px 16px',
    fontSize: 15,
    color: TEXT,
    outline: 'none',
    fontFamily: "'Inter', system-ui, sans-serif",
  };

  return (
    <div style={{ minHeight: '100vh', background: BG, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', color: TEXT }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          width: '100%',
          maxWidth: 960,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          border: `1px solid ${LINE}`,
          borderRadius: 12,
          overflow: 'hidden',
          boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
        }}
      >
        {/* LEFT PANEL - Branding */}
        <div
          style={{
            background: '#1e1f21',
            padding: '3.5rem 2.8rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            borderRight: `1px solid ${LINE}`,
          }}
          className="d-none d-lg-flex"
        >
          <div style={{ marginBottom: '2.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'center', marginBottom: '1.5rem' }}>
              <FaDumbbell size={42} color={YELLOW} />
              <span style={{ fontSize: 28, fontWeight: 700, letterSpacing: '0.02em' }}>FITFORGE</span>
            </div>
          </div>

          <h2 style={{ fontSize: '1.85rem', lineHeight: 1.1, marginBottom: '1rem', fontFamily: "'Anton', sans-serif", textTransform: 'uppercase' }}>
            Back to the iron.
          </h2>
          <p style={{ color: TEXT_DIM, maxWidth: 260, lineHeight: 1.6 }}>
            Your numbers are waiting. Log in and keep the streak alive.
          </p>

          <div style={{ marginTop: '3rem', width: '100%', maxWidth: 240 }}>
            <div style={{ border: `1px solid ${LINE}`, padding: '1.25rem', textAlign: 'left' }}>
              <div style={{ fontSize: 13, color: YELLOW, marginBottom: 8 }}>LAST SESSION</div>
              <div style={{ fontSize: 15, marginBottom: 4 }}>Bench Press — 4×5 @ 185</div>
              <div style={{ fontSize: 13, color: TEXT_DIM }}>3 days ago</div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL - Form */}
        <div style={{ background: BG, padding: '3.5rem 3rem' }}>
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.5rem', textTransform: 'uppercase', fontFamily: "'Anton', sans-serif" }}>
              Sign In
            </h2>
            <p style={{ color: TEXT_DIM }}>Continue logging your lifts</p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                background: 'rgba(193,39,45,0.15)',
                border: `1px solid ${RED}`,
                color: '#ff9b9b',
                padding: '12px 16px',
                borderRadius: 6,
                marginBottom: '1.5rem',
                fontSize: 14
              }}
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: 12, color: TEXT_DIM, marginBottom: 8, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                Email
              </label>
              <input
                type="email"
                style={inputStyle}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: 12, color: TEXT_DIM, marginBottom: 8, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  style={{ ...inputStyle, paddingRight: 50 }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: 16,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: TEXT_DIM,
                    cursor: 'pointer'
                  }}
                >
                  {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                </button>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '14px',
                background: YELLOW,
                color: INK,
                border: 'none',
                borderRadius: 6,
                fontSize: 15,
                fontWeight: 700,
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.75 : 1,
                marginTop: '0.5rem'
              }}
            >
              {loading ? 'SIGNING IN...' : 'SIGN IN'}
            </motion.button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '2rem', color: TEXT_DIM, fontSize: 14 }}>
            Don't have an account?{' '}
            <Link to="/register" style={{ color: YELLOW, fontWeight: 600, textDecoration: 'none' }}>
              Create one
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;