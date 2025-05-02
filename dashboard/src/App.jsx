import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './components/pages/Home';
import Statistics from './components/pages/Statistics';
import LatestReports from './components/pages/LatestReports';
import DoneReports from './components/pages/DoneReports';
import ReportDetail from './components/pages/ReportDetail';
import AcceptedReportDetail from './components/pages/AcceptedReportDetail';
import AcceptedReports from './components/pages/AcceptedReports';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route path="/latest" element={<LatestReports />} />
            <Route path="/done" element={<DoneReports />} />
            <Route path="/report/:id" element={<ReportDetail />} />
            <Route path="/accepted/:id" element={<AcceptedReportDetail />} />
            <Route path="/accepted-reports" element={<AcceptedReports />} />
            <Route path="/accepted" element={<AcceptedReports />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
