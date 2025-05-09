import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ReportDetails.css';

const ReportDetail = () => {
  const { id } = useParams();
  const [report, setReport] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/api/reports/${id}`)
      .then(res => res.json())
      .then(data => setReport(data))
      .catch(err => console.error('Failed to fetch report:', err));
  }, [id]);

  const handleImageClick = () => setIsFullScreen(true);
  const handleCloseFullScreen = () => setIsFullScreen(false);

  const handleAcceptReport = () => {
    fetch(`http://localhost:5000/api/reports/${id}/accept`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => {
        if (res.ok) {
          alert('Report accepted successfully!');
          setReport(prev => ({ ...prev, isAccepted: true, completed: true }));
        } else {
          throw new Error('Failed to accept the report.');
        }
      })
      .catch(err => {
        console.error(err);
        alert('An error occurred while accepting the report.');
      });
  };

  if (!report) return <div>Loading...</div>;

  return (
    <div className="report-detail-container">
      <div className="report-right">
        <div className="crime-header">
          <h1 className="crime-type">Crime: {report.crimeType}</h1>

          {/* Show "Accepted" and "Solved" if the report is accepted and completed */}
          {report.isAccepted && report.completed && (
            <div className="status-tags">
              <span className="accepted-status">Accepted</span>
              <span className="solved-status">Solved</span>
            </div>
          )}

          {report.completed ? (
            <button className="done-button" disabled>✅ solved</button>
          ) : (
            <button className="accept-button" onClick={handleAcceptReport}>Accept</button>
          )}
        </div>

        <div className="report-header">
          <p className="report-date">{new Date(report.dateTime.$date).toLocaleString()}</p>
        </div>

        <div className="location-container">
          <h4>Location</h4>
          <p><strong>District:</strong> {report.district}</p>
          <p><strong>Sector:</strong> {report.sector}</p>
          <p><strong>Cell:</strong> {report.cell}</p>
        </div>

        <div className="report-description">
          <h4>Description:</h4>
          <p>{report.description}</p>
        </div>

        <div className="contact-info">
          <h4>Contact Information:</h4>
          <p><strong>Contact:</strong> {report.contact}</p>
        </div>

        {report.audio && (
          <div className="audio-container">
            <strong>Audio:</strong>
            <audio controls src={`http://localhost:5000/${report.audio}`} />
          </div>
        )}
      </div>

      <div className="report-left">
        <div className="media-container">
          {report.media ? (
            <img
              src={`http://localhost:5000/${report.media}`}
              alt="crime report"
              className="report-image"
              onClick={handleImageClick}
            />
          ) : (
            <p>No image or video provided</p>
          )}
        </div>
      </div>

      {isFullScreen && report.media && (
        <div className="full-screen-modal" onClick={handleCloseFullScreen}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-button" onClick={handleCloseFullScreen}>X</button>
            <img
              src={`http://localhost:5000/${report.media}`}
              alt="crime report"
              className="full-screen-image"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportDetail;
