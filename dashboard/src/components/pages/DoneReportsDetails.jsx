import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './DoneReportDetail.css'; // new CSS file

const ReportDetail = () => {
  const { id } = useParams();
  const [report, setReport] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/done-reports/${id}`)
      .then((res) => res.json())
      .then((data) => setReport(data))
      .catch((err) => console.error('Failed to fetch report details:', err));
  }, [id]);

  if (!report) return <div className="loading">Loading report information...</div>;

  return (
    <div className="done-report-container">
      <div className="done-report-main">
        <div className="done-header">
          <h1 className="done-crime-type">{report.crimeType}</h1>
          <p className="done-date">{new Date(report.dateTime).toLocaleString()}</p>
        </div>

        <div className="done-location">
          <h4>Location Info</h4>
          <p><strong>District:</strong> {report.district}</p>
          <p><strong>Sector:</strong> {report.sector}</p>
          <p><strong>Cell:</strong> {report.cell}</p>
        </div>

        <div className="done-description">
          <h4>Incident Description</h4>
          <p>{report.description}</p>
        </div>

        <div className="done-meta">
          <h4>Contact</h4>
          <p><strong>Contact:</strong> {report.contact || 'N/A'}</p>
        </div>

        {report.audio && (
          <div className="done-audio">
            <h4>Audio Evidence</h4>
            <audio controls src={`http://localhost:5000/${report.audio}`} />
          </div>
        )}

        {report.media && (
          <div className="done-media">
            <h4>Attached Image</h4>
            <img
              src={`http://localhost:5000/${report.media}`}
              alt="Report visual"
              className="done-image"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportDetail;
