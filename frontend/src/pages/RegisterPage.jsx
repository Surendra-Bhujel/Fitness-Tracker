import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import { FaEye, FaEyeSlash, FaDumbbell, FaUserPlus } from 'react-icons/fa';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        name,
        email,
        password,
      });

      login(response.data.user, response.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center"
         style={{
           background: 'linear-gradient(135deg, #0f172a 0%, #1e2937 100%)',
           color: 'white'
         }}>
      
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="row align-items-center g-0 shadow-2xl rounded-4 overflow-hidden">
              
              {/* Left Side - Visual */}
              <div className="col-lg-6 d-none d-lg-block p-5" 
                   style={{ background: 'linear-gradient(135deg, #14b8a6, #0ea5e9)' }}>
                <div className="h-100 d-flex flex-column justify-content-center text-center text-dark">
                  <motion.div
                    initial={{ scale: 0.8, rotate: -10 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.8, type: "spring" }}
                  >
                    <FaDumbbell size={110} className="mb-4" />
                  </motion.div>
                  <h2 className="display-5 fw-bold">Join the Movement</h2>
                  <p className="lead opacity-90">Start your transformation today</p>
                </div>
              </div>

              {/* Right Side - Form */}
              <div className="col-lg-6 bg-dark p-5">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="text-center mb-5">
                    <div className="d-flex justify-content-center mb-3">
                      <FaUserPlus size={42} className="text-teal" />
                    </div>
                    <h2 className="fw-bold text-teal">Create Account</h2>
                    <p className="text-light">Begin your fitness journey</p>
                  </div>

                  {error && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="alert alert-danger"
                    >
                      {error}
                    </motion.div>
                  )}

                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label className="form-label text-light">Full Name</label>
                      <input
                        type="text"
                        className="form-control form-control-lg bg-dark text-white border-secondary"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder="John Doe"
                      />
                    </div>

                    <div className="mb-4">
                      <label className="form-label text-light">Email Address</label>
                      <input
                        type="email"
                        className="form-control form-control-lg bg-dark text-white border-secondary"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="you@example.com"
                      />
                    </div>

                    {/* Password */}
                    <div className="mb-4 position-relative">
                      <label className="form-label text-light">Password</label>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        className="form-control form-control-lg bg-dark text-white border-secondary pe-5"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <span
                        className="position-absolute top-50 end-0 translate-middle-y me-3 text-muted"
                        style={{ cursor: 'pointer', marginTop: '8px' }}
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                      </span>
                    </div>

                    {/* Confirm Password */}
                    <div className="mb-4 position-relative">
                      <label className="form-label text-light">Confirm Password</label>
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        className="form-control form-control-lg bg-dark text-white border-secondary pe-5"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                      <span
                        className="position-absolute top-50 end-0 translate-middle-y me-3 text-muted"
                        style={{ cursor: 'pointer', marginTop: '8px' }}
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                      </span>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="btn btn-lg w-100 mt-2"
                      style={{
                        background: 'linear-gradient(90deg, #14b8a6, #22d3ee)',
                        color: '#0f172a',
                        fontWeight: 600
                      }}
                      disabled={loading}
                    >
                      {loading ? 'Creating Account...' : 'Create Account'}
                    </motion.button>
                  </form>

                  <p className="text-center mt-4 text-light">
                    Already have an account?{' '}
                    <Link to="/login" className="text-teal text-decoration-none fw-medium">
                      Sign in
                    </Link>
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;