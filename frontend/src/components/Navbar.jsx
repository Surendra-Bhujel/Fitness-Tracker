import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import {
  FaDumbbell,
  FaUserCircle,
  FaSignOutAlt,
  FaHome,
} from "react-icons/fa";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav
      className="navbar navbar-expand-lg shadow-lg"
      style={{
        background: "linear-gradient(135deg, #111827, #6d28d9)",
        backdropFilter: "blur(15px)",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      <div className="container">
        {/* Logo */}
        <Link
          className="navbar-brand d-flex align-items-center fw-bold fs-3 text-white"
          to="/dashboard"
        >
          <FaDumbbell className="text-warning me-2" />
          Fitness Tracker
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">

            {/* Dashboard */}
            <li className="nav-item mx-3">
              <Link
                className="nav-link text-light fw-semibold"
                to="/dashboard"
              >
                <FaHome className="me-2 text-info" />
                Dashboard
              </Link>
            </li>

            {/* Profile */}
            <li className="nav-item mx-3">
              <Link
                className="nav-link text-light fw-semibold"
                to="/profile"
              >
                <FaUserCircle className="me-2 text-warning" />
                Profile
              </Link>
            </li>

            {/* User Profile Picture + Name */}
            <li className="nav-item mx-3">
              <div
                className="d-flex align-items-center px-3 py-2 rounded-pill"
                style={{
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "white",
                }}
              >
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt="Profile"
                    className="rounded-circle me-2"
                    style={{ width: '32px', height: '32px', objectFit: 'cover' }}
                  />
                ) : (
                  <FaUserCircle className="me-2 text-warning fs-5" />
                )}
                <span>{user?.name}</span>
              </div>
            </li>

            {/* Logout */}
            <li className="nav-item">
              <button
                onClick={handleLogout}
                className="btn rounded-pill px-4 fw-bold"
                style={{
                  background: "linear-gradient(135deg, #f59e0b, #ef4444)",
                  color: "white",
                  border: "none",
                  boxShadow: "0px 5px 15px rgba(239,68,68,0.4)",
                }}
              >
                <FaSignOutAlt className="me-2" />
                Logout
              </button>
            </li>

          </ul>
        </div> 
      </div>
    </nav>
  );
};

export default Navbar;