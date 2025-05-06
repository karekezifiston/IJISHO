import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AcceptedReports.css';

const AcceptedReports = () => {
  const [reports, setReports] = useState([]);
  const [selectedReports, setSelectedReports] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/api/accepted-reports')
      .then(res => res.json())
      .then(data => setReports(data))
      .catch(err => console.error('Failed to fetch accepted reports:', err));
  }, []);

  const handleReportClick = (reportId) => {
    navigate(`/accepted/${reportId}`);
  };

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: true };
    const formattedDate = new Date(date).toLocaleDateString(undefined, options);
    const formattedTime = new Date(date).toLocaleTimeString(undefined, timeOptions);
    return `${formattedTime} - ${formattedDate}`;
  };

  const toggleSelection = (id) => {
    setSelectedReports((prev) =>
      prev.includes(id) ? prev.filter((reportId) => reportId !== id) : [...prev, id]
    );
  };

  const handleDelete = async () => {
    try {
      // Delete from frontend only (for immediate UI update)
      const updatedReports = reports.filter((report) => !selectedReports.includes(report._id));
      setReports(updatedReports);
      setSelectedReports([]);

      // Make API call to delete on the backend
      for (const reportId of selectedReports) {
        await fetch(`http://localhost:5000/api/reports/${reportId}`, { method: 'DELETE' });
      }
    } catch (error) {
      console.error('Failed to delete reports:', error);
    }
  };

  const handleDecline = async () => {
    try {
      for (const reportId of selectedReports) {
        await fetch(`http://localhost:5000/api/reports/${reportId}/unaccept`, {
          method: 'PATCH',
        });
      }

      // Update the local state to reflect the changes
      const updatedReports = reports.map((report) =>
        selectedReports.includes(report._id)
          ? { ...report, isAccepted: false }
          : report
      );
      setReports(updatedReports);
      setSelectedReports([]);
    } catch (error) {
      console.error('Failed to decline the report:', error);
    }
  };

  const handleMarkComplete = async () => {
    try {
      for (const reportId of selectedReports) {
        await fetch(`http://localhost:5000/api/reports/${reportId}/done`, {
          method: 'PATCH',
        });
      }

      // Optionally update state to reflect completion visually
      const updatedReports = reports.map((report) =>
        selectedReports.includes(report._id)
          ? { ...report, completed: true } // Add a new property to mark completion
          : report
      );
      setReports(updatedReports);
      setSelectedReports([]);
    } catch (error) {
      console.error('Failed to mark reports as complete:', error);
    }
  };

  return (
    <div className="all-reports-container">
      <h2 className="reports-heading">Accepted Reports</h2>

      {selectedReports.length > 0 && (
        <div className="delete-toolbar">
          <button className="decline-button" onClick={handleDecline}>Remove</button>
          <button className="complete-button" onClick={handleMarkComplete}>Mark Complete</button>
          <button className="delete-button" onClick={handleDelete}>Delete Selected</button>
        </div>
      )}

      <div className="accepted-reports">
        {reports.length === 0 ? (
          <p>No accepted reports available.</p>
        ) : (
          reports.map((report) => (
            <div
              key={report._id}
              className={`report-list-item ${selectedReports.includes(report._id) ? 'selected' : ''}`}
            >
              <input
                type="checkbox"
                checked={selectedReports.includes(report._id)}
                onChange={() => toggleSelection(report._id)}
              />
              <div className="report-main" onClick={() => handleReportClick(report._id)}>
                <div className="report-title">{report.description}</div>
                <div className="report-meta">
                  <span>{report.district}, {report.sector}, {report.cell}</span>
                  <span className="report-type">{report.crimeType}</span>
                </div>
              </div>
              <div className="report-time">{formatDate(report.dateTime)}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AcceptedReports;
