import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AcceptedReports.css';
import { useDistrict } from '../DistrictContext';

const AcceptedReports = () => {
  const [reports, setReports] = useState([]);
  const [selectedReports, setSelectedReports] = useState([]);
  const navigate = useNavigate();
  const { district } = useDistrict();

  useEffect(() => {
    fetch('http://localhost:5000/api/accepted-reports')
      .then(res => res.json())
      .then(data => setReports(data))
      .catch(err => console.error('Failed to fetch accepted reports:', err));
  }, []);

  const filteredReports = reports.filter(report => report.district === district);

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
      const updatedReports = reports.filter((report) => !selectedReports.includes(report._id));
      setReports(updatedReports);
      setSelectedReports([]);
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

      const updatedReports = reports.map((report) =>
        selectedReports.includes(report._id)
          ? { ...report, completed: true }
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
        {filteredReports.length === 0 ? (
          <p>No accepted reports available for this district.</p>
        ) : (
          filteredReports.map((report) => (
            <div
              key={report._id}
              className={`report-list-item ${selectedReports.includes(report._id) ? 'selected' : ''} ${report.completed ? 'completed' : ''}`}
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
              {report.completed && <span className="completed-status">Solved</span>} {/* Changed from "Done" to "Solved" */}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AcceptedReports;
