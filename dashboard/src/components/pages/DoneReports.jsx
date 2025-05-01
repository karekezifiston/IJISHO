import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const DoneReports = () => {
  const [reports, setReports] = useState([]);
  const [selectedReports, setSelectedReports] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/done-reports')
      .then((res) => res.json())
      .then((data) => setReports(data))
      .catch((err) => console.error('Failed to fetch done reports:', err));
  }, []);

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
    const updatedReports = reports.filter((report) => !selectedReports.includes(report._id));
    setReports(updatedReports);
    setSelectedReports([]);
  };

  const handleMarkUncomplete = () => {
    selectedReports.forEach((reportId) => {
      fetch(`http://localhost:5000/api/reports/${reportId}/done`, {
        method: 'PATCH',
      })
        .then((res) => res.json())
        .then((data) => {
          // Update the reports state after marking uncomplete
          setReports((prevReports) =>
            prevReports.map((report) =>
              report._id === reportId ? { ...report, completed: false } : report
            )
          );
        })
        .catch((err) => console.error('Failed to mark report as uncomplete:', err));
    });
    setSelectedReports([]);
  };

  return (
    <div className="all-reports-container">
      <h2 className="reports-heading">Done Reports</h2>

      {selectedReports.length > 0 && (
        <div className="delete-toolbar">
          <button className="delete-button" onClick={handleDelete}>Delete Selected</button>
          <button className="uncomplete-button" onClick={handleMarkUncomplete}>Mark as Uncomplete</button>
        </div>
      )}

      <div className="done-reports">
        {reports.length === 0 ? (
          <p>No done reports available.</p>
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
              <Link
                to={`/report/${report._id}`}
                style={{ textDecoration: 'none', color: 'inherit', flex: 1 }}
              >
                <div className="report-main">
                  <div className="report-title">{report.description}</div>
                  <div className="report-meta">
                    <span>{report.district}, {report.sector}, {report.cell}</span>
                    <span className="report-type">{report.crimeType}</span>
                  </div>
                </div>
                <div className="report-time">{formatDate(report.dateTime)}</div>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DoneReports;
