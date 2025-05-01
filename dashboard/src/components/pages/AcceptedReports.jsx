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

  const handleDelete = () => {
    // Example: Delete from frontend only (you can extend this to delete on the backend)
    const updatedReports = reports.filter((report) => !selectedReports.includes(report._id));
    setReports(updatedReports);
    setSelectedReports([]);
  };

  return (
    <div className="all-reports-container">
      <h2 className="reports-heading">Accepted Reports</h2>

      {selectedReports.length > 0 && (
        <div className="delete-toolbar">
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
