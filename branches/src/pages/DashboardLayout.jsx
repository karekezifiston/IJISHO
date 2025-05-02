// src/pages/DashboardLayout.jsx
import React from 'react';
import Sidebar from '../components/Sidebar';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

const DashboardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location (URL)

  // Check if the current path matches any of the report pages
  const isLatestReports = location.pathname === '/dashboard/latest';
  const isAcceptedReports = location.pathname === '/dashboard/accepted';
  const isDoneReports = location.pathname === '/dashboard/done';

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ flex: 1, padding: '1rem' }}>
        <h2>Dashboard</h2>

        {/* Conditionally render buttons */}
        {!isLatestReports && !isAcceptedReports && !isDoneReports && (
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
            <button onClick={() => navigate('/dashboard/latest')}>Latest Reports</button>
            <button onClick={() => navigate('/dashboard/accepted')}>Accepted Reports</button>
            <button onClick={() => navigate('/dashboard/done')}>Done Reports</button>
          </div>
        )}

        {/* This is where nested routes will render */}
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
