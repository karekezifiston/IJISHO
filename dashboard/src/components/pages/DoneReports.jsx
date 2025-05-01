import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const DoneReports = () => {
  const [reports, setReports] = useState([]);

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

  return (
    <div className="all-reports-container">
      <h2 className="reports-heading">Done Reports</h2>
      <div className="done-reports">
        {reports.length === 0 ? (
          <p>No done reports available.</p>
        ) : (
          reports.map((report) => (
            <Link
              to={`/report/${report._id}`}
              key={report._id}
              className="report-list-item"
              style={{ textDecoration: 'none', color: 'inherit' }}
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
          ))
        )}
      </div>
    </div>
  );
};

export default DoneReports;
