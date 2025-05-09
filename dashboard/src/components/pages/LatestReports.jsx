import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LatestReports.css';

const LatestReports = () => {
  const [reports, setReports] = useState([]);
  const [selectedReports, setSelectedReports] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/reports');
      const data = await res.json();
      setReports(data);
    } catch (err) {
      console.error('Error fetching reports:', err);
    }
  };

  const handleReportClick = (reportId) => {
    navigate(`/report/${reportId}`);
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: true };
    return `${d.toLocaleTimeString(undefined, timeOptions)} - ${d.toLocaleDateString(undefined, options)}`;
  };

  const handleCheckboxChange = (reportId) => {
    setSelectedReports((prev) =>
      prev.includes(reportId)
        ? prev.filter((id) => id !== reportId)
        : [...prev, reportId]
    );
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete selected reports?')) return;

    for (const reportId of selectedReports) {
      try {
        await fetch(`http://localhost:5000/api/reports/${reportId}`, {
          method: 'DELETE',
        });
      } catch (err) {
        console.error(`Error deleting report ${reportId}:`, err);
      }
    }

    setSelectedReports([]);
    fetchReports();
  };

  const handleAccept = async () => {
    if (!window.confirm('Are you sure you want to accept selected reports?')) return;

    for (const reportId of selectedReports) {
      try {
        await fetch(`http://localhost:5000/api/reports/${reportId}/accept`, {
          method: 'PATCH',
        });
      } catch (err) {
        console.error(`Error accepting report ${reportId}:`, err);
      }
    }

    setSelectedReports([]);
    fetchReports();
  };

  return (
    <div className="all-reports-container">
      <h2 className="reports-heading">All Reports</h2>

      {selectedReports.length > 0 && (
        <div className="action-toolbar">
          <button className="delete-button" onClick={handleDelete}>
            Delete Selected ({selectedReports.length})
          </button>
          <button className="accept-button" onClick={handleAccept}>
            Accept Selected ({selectedReports.length})
          </button>
        </div>
      )}

      <div className="latest-reports">
        {reports.map((report) => (
          <div
            key={report._id}
            className={`report-list-item ${selectedReports.includes(report._id) ? 'selected' : ''}`}
          >
            <input
              type="checkbox"
              checked={selectedReports.includes(report._id)}
              onChange={() => handleCheckboxChange(report._id)}
              onClick={(e) => e.stopPropagation()}
            />

            <div onClick={() => handleReportClick(report._id)} className="report-main">
              <div className="report-title">{report.description}</div>

              <div className="report-meta">
                <span>{report.district}, {report.sector}, {report.cell}</span>
                <span className="report-type">{report.crimeType}</span>
                <div className="report-time">{formatDate(report.dateTime)}</div>
              </div>
            </div>

            {report.isAccepted && (
              <div className="accepted-badge">
                <span className='accepted-word'>Accepted</span>
                {report.completed && <span className="solved-badge">Solved</span>}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestReports;
