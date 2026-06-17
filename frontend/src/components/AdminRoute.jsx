import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AdminContext } from '../context/AdminContext';

const AdminRoute = ({ children }) => {
  const { admin, loading } = useContext(AdminContext);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return admin ? children : <Navigate to="/admin/login" />;
};

export default AdminRoute;