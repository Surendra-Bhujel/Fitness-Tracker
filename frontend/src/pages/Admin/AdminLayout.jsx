import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';

const AdminLayout = () => {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'sans-serif' }}>
      {/* Sidebar Navigation */}
      <aside style={{ width: '260px', backgroundColor: '#1e293b', color: '#fff', padding: '24px' }}>
        <h3 style={{ margin: '0 0 32px 0', fontSize: '20px', color: '#38bdf8' }}>Control Panel</h3>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Link to="/admin/dashboard" style={{ color: '#cbd5e1', textDecoration: 'none', padding: '10px', borderRadius: '6px' }}>
            📊 Dashboard
          </Link>
          <Link to="/admin/settings" style={{ color: '#cbd5e1', textDecoration: 'none', padding: '10px', borderRadius: '6px' }}>
            ⚙️ Settings
          </Link>
          <button onClick={() => navigate('/admin/login')} style={{ marginTop: '40px', background: 'none', border: '1px solid #ef4444', color: '#ef4444', padding: '8px', borderRadius: '6px', cursor: 'pointer' }}>
            Log Out
          </button>
        </nav>
      </aside>

      {/* Primary Workspace Window */}
      <main style={{ flex: 1, padding: '40px' }}>
        {/* This Outlet displays whatever page child route matches in App.jsx */}
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;