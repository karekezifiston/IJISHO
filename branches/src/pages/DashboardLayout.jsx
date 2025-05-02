// src/pages/DashboardLayout.jsx
import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { FaFileAlt, FaCheckCircle, FaRegCheckCircle } from 'react-icons/fa';
import './DashboardLayout.css';

const DashboardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isLatestReports = location.pathname === '/dashboard/latest';
  const isAcceptedReports = location.pathname === '/dashboard/accepted';
  const isDoneReports = location.pathname === '/dashboard/done';

  return (
    <div className="layout-content">
      <h1 className="dashboard-heading">Dashboard</h1>

      {!isLatestReports && !isAcceptedReports && !isDoneReports && (
        <div className="dashboard-boxes">
          <div className="dashboard-box" onClick={() => navigate('/dashboard/latest')}>
            <div className="title-row">
              <h2>Latest Reports</h2>
              <p>More</p>
            </div>
            <FaFileAlt size={50} />
            <p>View newly submitted reports</p>
          </div>

          <div className="dashboard-box" onClick={() => navigate('/dashboard/accepted')}>
            <div className="title-row">
              <h2>Accepted Reports</h2>
              <p>/100</p>
            </div>
            <FaCheckCircle size={50} />
            <p>Reports currently being worked on</p>
          </div>

          <div className="dashboard-box" onClick={() => navigate('/dashboard/done')}>
            <div className="title-row">
              <h2>Done Reports</h2>
              <p>....</p>
            </div>
            <FaRegCheckCircle size={50} color="#4CAF50" />
            <p>Reports that have been solved</p>
          </div>
        </div>
      )}

      <Outlet />
    </div>
  );
};

export default DashboardLayout;
