import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AdminContext } from '../context/AdminContext';
import { FaChartBar, FaUsers, FaCog, FaSignOutAlt } from 'react-icons/fa';

const AdminNavbar = () => {
  const { admin, logout } = useContext(AdminContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/admin/dashboard">
          🛡️ Admin Panel
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
            <li className="nav-item">
              <span className="nav-link text-light">
                👋 {admin?.name}
              </span>
            </li>
            <li className="nav-item">
              <button
                className="btn btn-outline-light btn-sm ms-2"
                onClick={handleLogout}
              >
                <FaSignOutAlt className="me-1" /> Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;