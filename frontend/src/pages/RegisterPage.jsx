import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import { FaEye, FaEyeSlash, FaDumbbell } from 'react-icons/fa';
import API from '../services/api';

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

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#0a0a0a', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      padding: '20px', 
      color: '#e8e8e8' 
    }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          width: '100%',
          maxWidth: 1000,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 16,
          overflow: 'hidden',
          boxShadow: '0 25px 60px rgba(0,0,0,0.7)',
        }}
      >
        {/* Left Panel */}
        <div style={{
          background: '#121212',
          padding: '60px 50px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }} className="d-none d-lg-flex">
          <FaDumbbell size={62} color="#f5c400" />
          <h2 style={{ 
            fontFamily: "'Anton', sans-serif", 
            fontSize: '2.6rem', 
            marginTop: 32, 
            textTransform: 'uppercase' 
          }}>
            Start Forging
          </h2>
          <p style={{ color: '#999', maxWidth: 280, marginTop: 20 }}>
            One log. No limits.<br />Completely free.
          </p>
        </div>

        {/* Register Form */}
        <div style={{ background: '#0a0a0a', padding: '60px 55px' }}>
          <h2 style={{ 
            fontSize: '2.1rem', 
            fontWeight: 700, 
            fontFamily: "'Anton', sans-serif", 
            textTransform: 'uppercase',
            marginBottom: 8 
          }}>
            Create Account
          </h2>
          <p style={{ color: '#999', marginBottom: 32 }}>Begin tracking real progress</p>

          {error && (
            <div style={{
              background: 'rgba(193,39,45,0.2)',
              border: '1px solid #c1272d',
              color: '#ff9b9b',
              padding: '14px 18px',
              borderRadius: 8,
              marginBottom: 24
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1.6rem' }}>
              <label style={{ display: 'block', fontSize: 13, color: '#aaa', marginBottom: 8 }}>FULL NAME</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" required
                style={{ width: '100%', background: '#1a1a1a', border: '1px solid #333', borderRadius: 8, padding: '16px', color: '#fff' }} />
            </div>

            <div style={{ marginBottom: '1.6rem' }}>
              <label style={{ display: 'block', fontSize: 13, color: '#aaa', marginBottom: 8 }}>EMAIL</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required
                style={{ width: '100%', background: '#1a1a1a', border: '1px solid #333', borderRadius: 8, padding: '16px', color: '#fff' }} />
            </div>

            <div style={{ marginBottom: '1.6rem' }}>
              <label style={{ display: 'block', fontSize: 13, color: '#aaa', marginBottom: 8 }}>PASSWORD</label>
              <div style={{ position: 'relative' }}>
                <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Min. 6 characters" required
                  style={{ width: '100%', background: '#1a1a1a', border: '1px solid #333', borderRadius: 8, padding: '16px 50px 16px 16px', color: '#fff' }} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#999' }}>
                  {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                </button>
              </div>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', fontSize: 13, color: '#aaa', marginBottom: 8 }}>CONFIRM PASSWORD</label>
              <div style={{ position: 'relative' }}>
                <input type={showConfirmPassword ? 'text' : 'password'} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Repeat password" required
                  style={{ width: '100%', background: '#1a1a1a', border: '1px solid #333', borderRadius: 8, padding: '16px 50px 16px 16px', color: '#fff' }} />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#999' }}>
                  {showConfirmPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '2rem' }}>
              <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} style={{ accentColor: '#f5c400' }} />
              <label style={{ fontSize: 14, color: '#aaa', cursor: 'pointer' }}>
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
                padding: '16px',
                background: '#f5c400',
                color: '#111',
                fontWeight: 700,
                fontSize: 16,
                border: 'none',
                borderRadius: 8,
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
            </motion.button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '2rem', color: '#999' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#f5c400', fontWeight: 600 }}>Sign in</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;