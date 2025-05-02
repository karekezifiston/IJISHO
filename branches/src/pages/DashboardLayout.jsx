// src/pages/DashboardLayout.jsx
import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import './DashboardLayout.css';

const DashboardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isLatestReports = location.pathname === '/dashboard/latest';
  const isAcceptedReports = location.pathname === '/dashboard/accepted';
  const isDoneReports = location.pathname === '/dashboard/done';

  return (
    <div style={{ flex: 1, padding: '1rem' }}>
      <h2>Dashboard</h2>

      {!isLatestReports && !isAcceptedReports && !isDoneReports && (
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
          <div className="nav-box" onClick={() => navigate('/dashboard/latest')}>
            Latest Reports
          </div>
          <div className="nav-box" onClick={() => navigate('/dashboard/accepted')}>
            Accepted Reports
          </div>
          <div className="nav-box" onClick={() => navigate('/dashboard/done')}>
            Done Reports
          </div>
        </div>
      )}

      <Outlet />
    </div>
  );
};

export default DashboardLayout;
