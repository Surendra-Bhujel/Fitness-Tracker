import React, { createContext, useState, useEffect } from 'react';
import API from '../services/api';

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const adminData = localStorage.getItem('admin');

    if (token && adminData) {
      try {
        const parsedAdmin = JSON.parse(adminData);
        setAdmin(parsedAdmin);
        API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      } catch (error) {
        console.error('Error loading admin data:', error);
        localStorage.removeItem('adminToken');
        localStorage.removeItem('admin');
      }
    }
    setLoading(false);
  }, []); 

  const login = (adminData, token) => {
    setAdmin(adminData);
    localStorage.setItem('token', token);
    localStorage.setItem('admin', JSON.stringify(adminData));
    API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  };

  const logout = () => {
    setAdmin(null);
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
    delete API.defaults.headers.common['Authorization'];
  };

  return (
    <AdminContext.Provider value={{ admin, loading, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminProvider;