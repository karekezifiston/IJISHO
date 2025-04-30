import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './components/pages/Home';
import Statistics from './components/pages/Statistics';
import Settings from './components/pages/Settings';
import Logout from './components/pages/Logout';
import LatestReports from './components/pages/LatestReports'; // Import the new page
import AcceptedReports from './components/pages/AcceptedReports'; // Import the new page
import DoneReports from './components/pages/DoneReports'; // Import the new page
import ReportDetail from './components/pages/ReportDetail'; // ✅ Add this
import './App.css'; // Add this

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/latest" element={<LatestReports />} />
            <Route path="/accepted" element={<AcceptedReports />} />
            <Route path="/done" element={<DoneReports />} />
            <Route path="/report/:id" element={<ReportDetail />} /> {/* ✅ NEW ROUTE */}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
