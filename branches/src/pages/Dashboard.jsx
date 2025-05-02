// src/pages/Dashboard.jsx
import React from 'react';
import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <Outlet /> {/* This will render DashboardLayout or other nested routes */}
    </div>
  );
};

export default Dashboard;
