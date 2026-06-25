import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AdminContext } from '../context/AdminContext';
import { FaChartBar, FaUsers, FaCog, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';

const AdminNavbar = () => {
  const { admin, logout } = useContext(AdminContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-lg">
      <div className="container-fluid px-4">
        <Link className="navbar-brand fw-bold d-flex align-items-center gap-2" to="/admin/dashboard">
          <FaChartBar className="text-teal" /> Admin Panel
        </Link>
        
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#adminNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="adminNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/admin/dashboard">
                <FaChartBar className="me-1" /> Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/users">
                <FaUsers className="me-1" /> Users
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/settings">
                <FaCog className="me-1" /> Settings
              </Link>
            </li>
            <li className="nav-item dropdown">
              <button 
                className="btn btn-link nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
              >
                <FaUserCircle className="me-1" /> {admin?.name || 'Admin'}
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li><button className="dropdown-item" onClick={handleLogout}>
                  <FaSignOutAlt className="me-2" /> Logout
                </button></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;