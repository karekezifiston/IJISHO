import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDistrict } from '../DistrictContext';
import './LatestReports.css';

const LatestReports = () => {
  const { district, filteredReports } = useDistrict();  // Access the selected district
  const [selectedReports, setSelectedReports] = React.useState([]);
  const navigate = useNavigate();

  const handleReportClick = (reportId) => {
    navigate(`/report/${reportId}`);
  };

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: true };
    const formattedDate = new Date(date).toLocaleDateString(undefined, options);
    const formattedTime = new Date(date).toLocaleTimeString(undefined, timeOptions);
    return `${formattedTime} - ${formattedDate}`;
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
    window.location.reload(); // Refresh to see updated data
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
    window.location.reload();
  };

  return (
    <div className="all-reports-container">
      <h2 className="reports-heading">
        {district ? `${district} Latest Reports` : 'Latest Reports'}
      </h2>

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
        {filteredReports.map((report) => (
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
              </div>
              <div className="report-time">{formatDate(report.dateTime)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestReports;
