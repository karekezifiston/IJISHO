import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ReportDetails.css'; // Optional for styling

const ReportDetails = () => {
  const { id } = useParams(); // Get report ID from URL
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/reports/${id}`);
        const data = await res.json();
        setReport(data);
      } catch (error) {
        console.error('Error fetching report:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [id]);

  const handleImageClick = () => setIsFullScreen(true);
  const handleCloseFullScreen = () => setIsFullScreen(false);

  if (loading) {
    return <p>Loading...</p>; // Simple loading message instead of spinner
  }

  if (!report) return <p>Report not found or an error occurred.</p>;

  return (
    <div className="report-detail-container">
      <div className="report-right">
        <h2 className="crime-type">Report Details</h2>

        <div className="report-header">
          <p><strong>Status:</strong> {report.status}</p>
          <p><strong>Date & Time:</strong> {new Date(report.dateTime).toLocaleString()}</p>
        </div>

        <div className="location-container">
          <p><strong>Type:</strong> {report.crimeType}</p>
          <p><strong>District:</strong> {report.district}</p>
          <p><strong>Sector:</strong> {report.sector}</p>
          <p><strong>Cell:</strong> {report.cell}</p>
        </div>

        <div className="report-description">
          <p><strong>Description:</strong> {report.description}</p>
        </div>

        {report.audio && (
          <div className="audio-container">
            <strong>Audio:</strong>
            <audio controls src={`http://localhost:5000/${report.audio}`} />
          </div>
        )}

        {report.image && (
          <div>
            <strong>Image:</strong><br />
            <img
              src={`http://localhost:5000/${report.image}`}
              alt="Report"
              width="400"
              onClick={handleImageClick}
              className="report-image"
            />
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

export default ReportDetails;
