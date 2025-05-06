import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DistrictProvider } from './DistrictContext';
import DistrictSelection from './DistrictSelection';
import Dashboard from './pages/Dashboard';
import DashboardLayout from './pages/DashboardLayout';
import LatestReports from './pages/LatestReports';
import AcceptedReports from './pages/AcceptedReports';
import DoneReports from './pages/DoneReports';
import ReportDetails from './pages/ReportDetails';
import AcceptedReportDetail from './pages/AcceptedReportDetail';
import DoneReportDetail from './pages/DoneReportDetail'; // ✅ NEW import

const App = () => {
  return (
    <DistrictProvider>
      <div className="app-container">
        <Router>
          <Routes>
            <Route path="/" element={<DistrictSelection />} />

            {/* Dashboard wrapper with layout inside */}
            <Route path="/dashboard" element={<Dashboard />}>
              <Route index element={<DashboardLayout />} />
              <Route path="latest" element={<LatestReports />} />
              <Route path="accepted" element={<AcceptedReports />} />
              <Route path="done" element={<DoneReports />} />
            </Route>

            {/* ✅ Individual report details */}
            <Route path="/report/:id" element={<ReportDetails />} />
            <Route path="/accepted/:id" element={<AcceptedReportDetail />} />
            <Route path="/done/:id" element={<DoneReportDetail />} /> {/* ✅ DONE */}
          </Routes>
        </Router>
      </div>
    </DistrictProvider>
  );
};

export default App;
