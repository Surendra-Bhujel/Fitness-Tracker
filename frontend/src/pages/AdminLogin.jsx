import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { AdminContext } from '../../context/AdminContext';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AdminContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/admin/login', { email, password });
      login(response.data.admin, response.data.token);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-dark">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="card p-4 shadow-lg"
        style={{ width: '400px' }}
      >
        <h2 className="text-center mb-4">Admin Portal</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input type="email" className="form-control mb-3" placeholder="Admin Email"
            value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" className="form-control mb-3" placeholder="Password"
            value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit" className="btn btn-dark w-100">Login as Admin</button>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminLogin;