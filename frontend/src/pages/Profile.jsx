import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import API from '../services/api';
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaSave,
  FaTrash,
  FaCamera,
  FaArrowLeft,
  FaUserCircle,
  FaDumbbell,
  FaFire,
  FaClock,
  FaEdit,
  FaEye,
  FaEyeSlash
} from 'react-icons/fa';

const Profile = () => {
  const { user, logout, updateUser } = useContext(AuthContext);   // ← Added updateUser
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);             // ← Added
  const [message, setMessage] = useState({ type: '', text: '' });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [avatarPreview, setAvatarPreview] = useState(null);

  const [stats, setStats] = useState({
    totalWorkouts: 0,
    totalCalories: 0,
    avgDuration: 0
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || ''
      });
      setAvatarPreview(user.avatar || null);
      fetchUserStats();
    }
  }, [user]);

  const fetchUserStats = async () => {
    try {
      const response = await API.get('/workouts');
      const workouts = response.data;
      const total = workouts.length;
      const totalCal = workouts.reduce((sum, w) => sum + (w.calories || 0), 0);
      const avgDur = total > 0
        ? Math.round(workouts.reduce((sum, w) => sum + (w.duration || 0), 0) / total)
        : 0;

      setStats({
        totalWorkouts: total,
        totalCalories: totalCal,
        avgDuration: avgDur
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setAvatarPreview(previewUrl);
    setUploading(true);

    const formDataUpload = new FormData();
    formDataUpload.append('avatar', file);

    try {
      const response = await API.put('/auth/profile/avatar', formDataUpload, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      // Update context + localStorage so it persists after refresh
      if (updateUser && response.data.avatar) {
        updateUser({ ...user, avatar: response.data.avatar });
      }

      setMessage({ type: 'success', text: 'Profile picture updated successfully!' });
    } catch (error) {
      console.error('Upload error:', error);
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.message || 'Failed to upload profile picture' 
      });
      setAvatarPreview(user?.avatar || null);
    } finally {
      setUploading(false);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      await API.put('/auth/profile', formData);
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      setIsEditing(false);
      setTimeout(() => window.location.reload(), 1500);
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Failed to update profile'
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match' });
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setMessage({ type: 'error', text: 'Password must be at least 6 characters' });
      return;
    }

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      await API.put('/auth/change-password', {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });

      setMessage({ type: 'success', text: 'Password changed successfully!' });
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setShowCurrentPassword(false);
      setShowNewPassword(false);
      setShowConfirmPassword(false);
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Failed to change password'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await API.delete('/auth/account');
      logout();
      navigate('/');
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Failed to delete account'
      });
      setShowDeleteModal(false);
    }
  };

  const StatCard = ({ icon, value, label, color }) => (
    <div className={`bg-dark border border-secondary rounded-3 p-3 text-center`}>
      <div className={`text-${color} mb-1`}>{icon}</div>
      <div className="text-white display-6 fw-bold">{value}</div>
      <div className="text-muted small">{label}</div>
    </div>
  );

  return (
    <div className="bg-dark min-vh-100">
      <Navbar />

      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <button
                className="btn btn-outline-secondary mb-4"
                onClick={() => navigate('/dashboard')}
              >
                <FaArrowLeft className="me-2" /> Back to Dashboard
              </button>
            </motion.div>

            {message.text && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`alert alert-${message.type === 'success' ? 'success' : 'danger'} mb-3`}
              >
                {message.text}
              </motion.div>
            )}

            <div className="row g-4">
              {/* Sidebar */}
              <motion.div
                className="col-lg-4"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <div className="card bg-dark border-secondary shadow-lg">
                  <div className="card-body text-center p-4">
                    <div className="position-relative d-inline-block mb-3">
                      <div
                        className="bg-gradient-teal rounded-circle d-flex align-items-center justify-content-center mx-auto"
                        style={{ width: '120px', height: '120px', overflow: 'hidden', border: '3px solid #14b8a6' }}
                      >
                        {avatarPreview ? (
                          <img 
                            src={avatarPreview} 
                            alt="Profile" 
                            className="w-100 h-100 object-fit-cover" 
                          />
                        ) : (
                          <FaUserCircle size={70} className="text-white" />
                        )}
                      </div>

                      <label
                        htmlFor="avatar-upload"
                        className={`btn btn-dark position-absolute bottom-0 end-0 rounded-circle border border-teal d-flex align-items-center justify-content-center ${uploading ? 'disabled' : ''}`}
                        style={{ width: '40px', height: '40px', cursor: uploading ? 'not-allowed' : 'pointer' }}
                      >
                        {uploading ? '⏳' : <FaCamera size={18} />}
                      </label>
                      <input
                        type="file"
                        id="avatar-upload"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        hidden
                      />
                    </div>

                    <h4 className="text-white">{user?.name}</h4>
                    <p className="text-muted small">{user?.email}</p>

                    <hr className="border-secondary my-3" />

                    <div className="row g-2">
                      <div className="col-6">
                        <StatCard
                          icon={<FaDumbbell size={20} />}
                          value={stats.totalWorkouts}
                          label="Workouts"
                          color="primary"
                        />
                      </div>
                      <div className="col-6">
                        <StatCard
                          icon={<FaFire size={20} />}
                          value={stats.totalCalories}
                          label="Calories"
                          color="danger"
                        />
                      </div>
                      <div className="col-12 mt-2">
                        <StatCard
                          icon={<FaClock size={20} />}
                          value={`${stats.avgDuration} min`}
                          label="Avg Duration"
                          color="info"
                        />
                      </div>
                    </div>

                    <hr className="border-secondary my-3" />

                    <button
                      className="btn btn-outline-danger w-100"
                      onClick={() => setShowDeleteModal(true)}
                    >
                      <FaTrash className="me-2" /> Delete Account
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Main Content - Profile Settings */}
              <motion.div
                className="col-lg-8"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {/* Profile Edit */}
                <div className="card bg-dark border-secondary shadow-lg mb-4">
                  <div className="card-header bg-transparent border-secondary d-flex justify-content-between align-items-center">
                    <h5 className="text-white mb-0">
                      <FaUser className="me-2 text-teal" /> Profile Information
                    </h5>
                    <button
                      className="btn btn-sm btn-outline-teal"
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      <FaEdit className="me-1" /> {isEditing ? 'Cancel' : 'Edit'}
                    </button>
                  </div>
                  <div className="card-body">
                    {isEditing ? (
                      <form onSubmit={handleProfileUpdate}>
                        <div className="mb-3">
                          <label className="form-label text-light small">Full Name</label>
                          <input
                            type="text"
                            className="form-control bg-dark text-white border-secondary"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                          />
                        </div>

                        <div className="mb-3">
                          <label className="form-label text-light small">Email Address</label>
                          <input
                            type="email"
                            className="form-control bg-dark text-white border-secondary"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                          />
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          type="submit"
                          className="btn btn-teal w-100"
                          disabled={loading}
                        >
                          <FaSave className="me-2" />
                          {loading ? 'Saving...' : 'Save Changes'}
                        </motion.button>
                      </form>
                    ) : (
                      <div>
                        <div className="d-flex justify-content-between py-2 border-bottom border-secondary">
                          <span className="text-muted">Name</span>
                          <span className="text-white">{user?.name}</span>
                        </div>
                        <div className="d-flex justify-content-between py-2 border-bottom border-secondary">
                          <span className="text-muted">Email</span>
                          <span className="text-white">{user?.email}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Change Password */}
                <div className="card bg-dark border-secondary shadow-lg">
                  <div className="card-header bg-transparent border-secondary">
                    <h5 className="text-white mb-0">
                      <FaLock className="me-2 text-warning" /> Change Password
                    </h5>
                  </div>
                  <div className="card-body">
                    <form onSubmit={handlePasswordChange}>
                      <div className="mb-3">
                        <label className="form-label text-light small">Current Password</label>
                        <div className="input-group">
                          <input
                            type={showCurrentPassword ? "text" : "password"}
                            className="form-control bg-dark text-white border-secondary"
                            value={passwordData.currentPassword}
                            onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                            required
                          />
                          <button
                            type="button"
                            className="btn btn-outline-secondary border-secondary"
                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          >
                            {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
                          </button>
                        </div>
                      </div>

                      <div className="mb-3">
                        <label className="form-label text-light small">New Password</label>
                        <div className="input-group">
                          <input
                            type={showNewPassword ? "text" : "password"}
                            className="form-control bg-dark text-white border-secondary"
                            value={passwordData.newPassword}
                            onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                            required
                          />
                          <button
                            type="button"
                            className="btn btn-outline-secondary border-secondary"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                          >
                            {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                          </button>
                        </div>
                      </div>

                      <div className="mb-3">
                        <label className="form-label text-light small">Confirm New Password</label>
                        <div className="input-group">
                          <input
                            type={showConfirmPassword ? "text" : "password"}
                            className="form-control bg-dark text-white border-secondary"
                            value={passwordData.confirmPassword}
                            onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                            required
                          />
                          <button
                            type="button"
                            className="btn btn-outline-secondary border-secondary"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          >
                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                          </button>
                        </div>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="btn btn-warning w-100"
                        disabled={loading}
                      >
                        <FaLock className="me-2" />
                        {loading ? 'Updating...' : 'Change Password'}
                      </motion.button>
                    </form>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div
          className="modal show d-block"
          style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}
          onClick={() => setShowDeleteModal(false)}
        >
          <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content bg-dark text-light border-secondary">
              <div className="modal-header border-secondary">
                <h5 className="text-danger">⚠️ Delete Account</h5>
                <button className="btn-close btn-close-white" onClick={() => setShowDeleteModal(false)} />
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete your account?</p>
                <p className="text-muted small">This action cannot be undone. All your data will be permanently deleted.</p>
              </div>
              <div className="modal-footer border-secondary">
                <button className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>
                  Cancel
                </button>
                <button className="btn btn-danger" onClick={handleDeleteAccount}>
                  <FaTrash className="me-2" /> Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .bg-gradient-teal {
          background: linear-gradient(135deg, #14b8a6, #0d9488);
        }
        .btn-teal {
          background: linear-gradient(135deg, #14b8a6, #0d9488);
          color: white;
          border: none;
          font-weight: 600;
        }
        .btn-teal:hover {
          background: linear-gradient(135deg, #0d9488, #0f766e);
          color: white;
        }
        .btn-outline-teal {
          color: #14b8a6;
          border-color: #14b8a6;
        }
        .btn-outline-teal:hover {
          background: #14b8a6;
          color: white;
        }
      `}</style>
    </div>
  );
};

export default Profile;