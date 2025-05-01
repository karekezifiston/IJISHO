import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ReportDetail.css';

const ReportDetail = () => {
  const { id } = useParams();
  const [report, setReport] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/api/reports/${id}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);  // Log the data to check if all fields are present
        setReport(data);
      })
      .catch(err => console.error('Failed to fetch report:', err));
  }, [id]);

  if (!report) return <div>Loading...</div>;

  // Toggle full-screen mode
  const handleImageClick = () => {
    setIsFullScreen(true);
  };

  // Close the full-screen mode
  const handleCloseFullScreen = () => {
    setIsFullScreen(false);
  };

  // Accept report handler
  const handleAcceptReport = () => {
    fetch(`http://localhost:5000/api/reports/${id}/accept`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        if (res.ok) {
          alert('Report accepted successfully!');
        } else {
          throw new Error('Failed to accept the report.');
        }
      })
      .catch(err => {
        console.error(err);
        alert('An error occurred while accepting the report.');
      });
  };

  return (
    <div className="report-detail-container">
      <div className="report-right">
        <div className="crime-header">
          <h1 className="crime-type">Crime: {report.crimeType}</h1>
          {/* Accept Button next to crime type */}
          <button className="accept-button" onClick={handleAcceptReport}>
            Accept
          </button>
        </div>
        <div className="report-header">
          <p className="report-date">{new Date(report.dateTime).toLocaleString()}</p>
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

      {/* Full-Screen Modal */}
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
