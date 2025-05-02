// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DistrictProvider } from './DistrictContext';
import DistrictSelection from './DistrictSelection';
import Dashboard from './pages/Dashboard'; // ✅ new component
import DashboardLayout from './pages/DashboardLayout';
import LatestReports from './pages/LatestReports';
import AcceptedReports from './pages/AcceptedReports';
import DoneReports from './pages/DoneReports';

const App = () => {
  return (
    <DistrictProvider>
      <div className="app-container">
        <Router>
          <Routes>
            <Route path="/" element={<DistrictSelection />} />

            {/* Dashboard wrapper with layout inside */}
            <Route path="/dashboard" element={<Dashboard />}>
              <Route index element={<DashboardLayout />} /> {/* Default dashboard */}
              <Route path="latest" element={<LatestReports />} />
              <Route path="accepted" element={<AcceptedReports />} />
              <Route path="done" element={<DoneReports />} />
            </Route>
          </Routes>
        </Router>
      </div>
    </DistrictProvider>
  );
};

export default App;
