import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import { FaEye, FaEyeSlash, FaDumbbell, FaTrophy } from 'react-icons/fa';
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

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const getStrength = (p) => {
    let s = 0;
    if (p.length >= 6) s++;
    if (p.length >= 10) s++;
    if (/[A-Z]/.test(p)) s++;
    if (/[^a-zA-Z0-9]/.test(p)) s++;
    return s;
  };

  const strength = getStrength(password);
  const strengthColors = ['#c1272d', '#f5c400', '#f5c400', YELLOW];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) return setError('Passwords do not match');
    if (password.length < 6) return setError('Password must be at least 6 characters');
    if (!agreed) return setError('Please accept the terms');
    setLoading(true);
    try {
      const response = await API.post('/auth/register', { name, email, password });
      login(response.data.user, response.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
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
        {/* LEFT PANEL */}
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
          <FaDumbbell size={48} color={YELLOW} style={{ marginBottom: '1.5rem' }} />
          <h2 style={{ fontSize: '2rem', textTransform: 'uppercase', fontFamily: "'Anton', sans-serif", marginBottom: '1rem' }}>
            Start Forging
          </h2>
          <p style={{ color: TEXT_DIM, maxWidth: 260 }}>
            One log. No limits.<br />Completely free.
          </p>
        </div>

        {/* RIGHT PANEL - Form */}
        <div style={{ background: BG, padding: '3.5rem 3rem' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.4rem', textTransform: 'uppercase', fontFamily: "'Anton', sans-serif" }}>
            Create Account
          </h2>
          <p style={{ color: TEXT_DIM, marginBottom: '2rem' }}>Begin tracking real progress</p>

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
            <div style={{ marginBottom: '1.4rem' }}>
              <label style={{ display: 'block', fontSize: 12, color: TEXT_DIM, marginBottom: 8, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                Full Name
              </label>
              <input type="text" style={inputStyle} value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" required />
            </div>

            <div style={{ marginBottom: '1.4rem' }}>
              <label style={{ display: 'block', fontSize: 12, color: TEXT_DIM, marginBottom: 8, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                Email
              </label>
              <input type="email" style={inputStyle} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
            </div>

            <div style={{ marginBottom: '1.4rem' }}>
              <label style={{ display: 'block', fontSize: 12, color: TEXT_DIM, marginBottom: 8, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  style={{ ...inputStyle, paddingRight: 50 }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min. 6 characters"
                  required
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: TEXT_DIM }}>
                  {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                </button>
              </div>

              {password.length > 0 && (
                <div style={{ marginTop: 10, display: 'flex', gap: 4 }}>
                  {[0,1,2,3].map(i => (
                    <div key={i} style={{ flex: 1, height: 4, background: i < strength ? strengthColors[strength-1] : LINE, borderRadius: 2 }} />
                  ))}
                </div>
              )}
            </div>

            <div style={{ marginBottom: '1.4rem' }}>
              <label style={{ display: 'block', fontSize: 12, color: TEXT_DIM, marginBottom: 8, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                Confirm Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  style={{ ...inputStyle, paddingRight: 50 }}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat password"
                  required
                />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: TEXT_DIM }}>
                  {showConfirmPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: '1.8rem' }}>
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                style={{ marginTop: 4, accentColor: YELLOW }}
              />
              <label style={{ fontSize: 13.5, color: TEXT_DIM, lineHeight: 1.5, cursor: 'pointer' }}>
                I agree to the Terms and Privacy Policy
              </label>
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
              }}
            >
              {loading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
            </motion.button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '2rem', color: TEXT_DIM, fontSize: 14 }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: YELLOW, fontWeight: 600, textDecoration: 'none' }}>
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;