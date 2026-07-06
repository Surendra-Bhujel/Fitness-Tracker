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

  const StatCard = ({ icon, value, label }) => (
    <div className="stat-tile text-center p-3">
      <div className="mb-1" style={{ color: '#f5c400' }}>{icon}</div>
      <div className="text-white display-6 fw-bold" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '1.8rem' }}>{value}</div>
      <div className="text-muted small">{label}</div>
    </div>
  );

  return (
    <div className="fitforge-profile min-vh-100">
      <Navbar />

      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <button
                className="btn btn-outline-secondary mb-4 square-btn"
                onClick={() => navigate('/dashboard')}
              >
                <FaArrowLeft className="me-2" /> Back to dashboard
              </button>
            </motion.div>

            {message.text && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`alert-log alert-log-${message.type === 'success' ? 'success' : 'error'} mb-3`}
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
                <div className="card-log">
                  <div className="card-body text-center p-4">
                    <div className="position-relative d-inline-block mb-3">
                      <div
                        className="avatar-frame d-flex align-items-center justify-content-center mx-auto"
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
                        className={`avatar-upload-btn d-flex align-items-center justify-content-center ${uploading ? 'disabled' : ''}`}
                        style={{ cursor: uploading ? 'not-allowed' : 'pointer' }}
                      >
                        {uploading ? '⏳' : <FaCamera size={16} />}
                      </label>
                      <input
                        type="file"
                        id="avatar-upload"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        hidden
                      />
                    </div>

                    <h4 className="text-white" style={{ fontFamily: "'Anton', sans-serif", textTransform: 'uppercase', letterSpacing: '0.02em' }}>{user?.name}</h4>
                    <p className="text-muted small" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{user?.email}</p>

                    <hr className="log-divider my-3" />

                    <div className="row g-2">
                      <div className="col-6">
                        <StatCard icon={<FaDumbbell size={18} />} value={stats.totalWorkouts} label="Workouts" />
                      </div>
                      <div className="col-6">
                        <StatCard icon={<FaFire size={18} />} value={stats.totalCalories} label="Calories" />
                      </div>
                      <div className="col-12 mt-2">
                        <StatCard icon={<FaClock size={18} />} value={`${stats.avgDuration} min`} label="Avg duration" />
                      </div>
                    </div>

                    <hr className="log-divider my-3" />

                    <button
                      className="btn btn-outline-danger w-100 square-btn"
                      onClick={() => setShowDeleteModal(true)}
                    >
                      <FaTrash className="me-2" /> Delete account
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
                <div className="card-log mb-4">
                  <div className="card-log-header d-flex justify-content-between align-items-center">
                    <h5 className="text-white mb-0" style={{ fontSize: 15, fontWeight: 600 }}>
                      <FaUser className="me-2" style={{ color: '#f5c400' }} /> Profile information
                    </h5>
                    <button
                      className="btn-log-outline"
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      <FaEdit className="me-1" /> {isEditing ? 'Cancel' : 'Edit'}
                    </button>
                  </div>
                  <div className="card-body">
                    {isEditing ? (
                      <form onSubmit={handleProfileUpdate}>
                        <div className="mb-3">
                          <label className="form-label text-light small">Full name</label>
                          <input
                            type="text"
                            className="form-control log-input"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                          />
                        </div>

                        <div className="mb-3">
                          <label className="form-label text-light small">Email address</label>
                          <input
                            type="email"
                            className="form-control log-input"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                          />
                        </div>

                        <motion.button
                          whileTap={{ scale: 0.98 }}
                          type="submit"
                          className="btn-log-solid w-100"
                          disabled={loading}
                        >
                          <FaSave className="me-2" />
                          {loading ? 'Saving...' : 'Save changes'}
                        </motion.button>
                      </form>
                    ) : (
                      <div>
                        <div className="d-flex justify-content-between py-2 log-row">
                          <span className="text-muted">Name</span>
                          <span className="text-white">{user?.name}</span>
                        </div>
                        <div className="d-flex justify-content-between py-2 log-row">
                          <span className="text-muted">Email</span>
                          <span className="text-white" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{user?.email}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Change Password */}
                <div className="card-log">
                  <div className="card-log-header">
                    <h5 className="text-white mb-0" style={{ fontSize: 15, fontWeight: 600 }}>
                      <FaLock className="me-2" style={{ color: '#c1272d' }} /> Change password
                    </h5>
                  </div>
                  <div className="card-body">
                    <form onSubmit={handlePasswordChange}>
                      <div className="mb-3">
                        <label className="form-label text-light small">Current password</label>
                        <div className="input-group">
                          <input
                            type={showCurrentPassword ? "text" : "password"}
                            className="form-control log-input"
                            value={passwordData.currentPassword}
                            onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                            required
                          />
                          <button
                            type="button"
                            className="btn log-input-toggle"
                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          >
                            {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
                          </button>
                        </div>
                      </div>

                      <div className="mb-3">
                        <label className="form-label text-light small">New password</label>
                        <div className="input-group">
                          <input
                            type={showNewPassword ? "text" : "password"}
                            className="form-control log-input"
                            value={passwordData.newPassword}
                            onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                            required
                          />
                          <button
                            type="button"
                            className="btn log-input-toggle"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                          >
                            {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                          </button>
                        </div>
                      </div>

                      <div className="mb-3">
                        <label className="form-label text-light small">Confirm new password</label>
                        <div className="input-group">
                          <input
                            type={showConfirmPassword ? "text" : "password"}
                            className="form-control log-input"
                            value={passwordData.confirmPassword}
                            onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                            required
                          />
                          <button
                            type="button"
                            className="btn log-input-toggle"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          >
                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                          </button>
                        </div>
                      </div>

                      <motion.button
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="btn-log-danger w-100"
                        disabled={loading}
                      >
                        <FaLock className="me-2" />
                        {loading ? 'Updating...' : 'Change password'}
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
          style={{ background: 'rgba(0,0,0,0.7)' }}
          onClick={() => setShowDeleteModal(false)}
        >
          <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content-log">
              <div className="modal-header-log">
                <h5 style={{ color: '#c1272d', fontFamily: "'Anton', sans-serif", textTransform: 'uppercase', fontSize: 18 }}>Delete account</h5>
                <button className="btn-close btn-close-white" onClick={() => setShowDeleteModal(false)} />
              </div>
              <div className="modal-body-log">
                <p>Are you sure you want to delete your account?</p>
                <p className="text-muted small">This action cannot be undone. All your data will be permanently deleted.</p>
              </div>
              <div className="modal-footer-log">
                <button className="btn-log-outline" onClick={() => setShowDeleteModal(false)}>
                  Cancel
                </button>
                <button className="btn-log-danger" onClick={handleDeleteAccount}>
                  <FaTrash className="me-2" /> Delete account
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .fitforge-profile {
          background: #17181a;
        }
        .square-btn {
          border-radius: 0 !important;
        }
        .card-log {
          background: #1e1f21;
          border: 1px solid rgba(236,231,218,0.14);
          border-radius: 0;
          box-shadow: none;
        }
        .card-log-header {
          padding: 14px 20px;
          border-bottom: 1px solid rgba(236,231,218,0.14);
          display: flex;
          align-items: center;
        }
        .log-divider {
          border-color: rgba(236,231,218,0.14);
          opacity: 1;
        }
        .log-row {
          border-bottom: 1px solid rgba(236,231,218,0.1);
        }
        .stat-tile {
          background: rgba(236,231,218,0.04);
          border: 1px solid rgba(236,231,218,0.1);
        }
        .avatar-frame {
          width: 120px;
          height: 120px;
          overflow: hidden;
          border: 2px solid #f5c400;
          background: #111214;
        }
        .avatar-upload-btn {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 38px;
          height: 38px;
          background: #f5c400;
          color: #17181a;
          border: none;
        }
        .log-input {
          background: transparent !important;
          border: 1px solid rgba(236,231,218,0.28) !important;
          border-radius: 0 !important;
          color: #ece7da !important;
          font-family: 'JetBrains Mono', monospace;
        }
        .log-input:focus {
          border-color: #f5c400 !important;
          box-shadow: none !important;
        }
        .log-input-toggle {
          border: 1px solid rgba(236,231,218,0.28) !important;
          border-radius: 0 !important;
          color: #ece7da !important;
        }
        .btn-log-solid {
          background: #f5c400;
          color: #17181a;
          border: none;
          font-weight: 700;
          padding: 11px;
          border-radius: 0;
        }
        .btn-log-solid:hover { background: #ffd633; color: #17181a; }
        .btn-log-danger {
          background: transparent;
          color: #c1272d;
          border: 1px solid #c1272d;
          font-weight: 600;
          padding: 11px;
          border-radius: 0;
        }
        .btn-log-danger:hover { background: #c1272d; color: #ece7da; }
        .btn-log-outline {
          background: transparent;
          color: #ece7da;
          border: 1px solid rgba(236,231,218,0.28);
          border-radius: 0;
          font-size: 13px;
          padding: 6px 14px;
        }
        .btn-log-outline:hover { border-color: #f5c400; color: #f5c400; }
        .alert-log {
          padding: 12px 16px;
          border: 1px solid;
          font-size: 14px;
        }
        .alert-log-success { border-color: #5c7a4f; color: #a8c398; background: rgba(92,122,79,0.12); }
        .alert-log-error { border-color: #c1272d; color: #f3a3a6; background: rgba(193,39,45,0.12); }
        .modal-content-log {
          background: #1e1f21;
          border: 1px solid rgba(236,231,218,0.2);
          border-radius: 0;
          color: #ece7da;
        }
        .modal-header-log, .modal-footer-log {
          padding: 16px 20px;
          border-color: rgba(236,231,218,0.14);
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 10px;
        }
        .modal-header-log { border-bottom: 1px solid rgba(236,231,218,0.14); }
        .modal-footer-log { border-top: 1px solid rgba(236,231,218,0.14); justify-content: flex-end; }
        .modal-body-log { padding: 20px; }
      `}</style>
    </div>
  );
};

export default Profile;