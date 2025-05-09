import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDistrict } from '../DistrictContext'; 
import './DoneReports.css';

const DoneReports = () => {
  const [reports, setReports] = useState([]);
  const [selectedReports, setSelectedReports] = useState([]);
  const { district } = useDistrict(); // get selected district

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

  // Filter reports by selected district
  const filteredReports = reports.filter((report) => report.district === district);

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
        {filteredReports.length === 0 ? (
          <p>No done reports available.</p>
        ) : (
          filteredReports.map((report) => (
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
                <div className="report-link-content">
                  <div className="report-main">
                    <div className="report-title">{report.description}</div>
                    <div className="report-meta">
                      <span>{report.district}, {report.sector}, {report.cell}</span>
                      <span className="report-type">{report.crimeType}</span>
                    </div>
                  </div>
                  <div className="report-time">{formatDate(report.dateTime)}</div>
                  <div className="done-label">
                    {report.completed ? 'Solved' : 'Done'} {/* Conditionally render "Solved" or "Done" */}
                  </div>
                </div>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DoneReports;
