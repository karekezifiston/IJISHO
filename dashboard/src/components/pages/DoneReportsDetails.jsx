import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams to get the ID from URL

const ReportDetail = () => {
  const { id } = useParams(); // Get the report ID from the URL
  const [report, setReport] = useState(null);

  useEffect(() => {
    // Fetch the report details based on the ID
    fetch(`http://localhost:5000/api/done-reports/${id}`)
      .then((res) => res.json())
      .then((data) => setReport(data))
      .catch((err) => console.error('Failed to fetch report details:', err));
  }, [id]); // Rerun the fetch when the ID changes

  if (!report) {
    return <p>Loading...</p>;
  }

  return (
    <div className="report-detail">
      <h2>Report Details</h2>
      <div>
        <p><strong>Description:</strong> {report.description}</p>
        <p><strong>District:</strong> {report.district}</p>
        <p><strong>Sector:</strong> {report.sector}</p>
        <p><strong>Cell:</strong> {report.cell}</p>
        <p><strong>Crime Type:</strong> {report.crimeType}</p>
        <p><strong>Time:</strong> {new Date(report.dateTime).toLocaleString()}</p>
        {/* Add any other details you want to display */}
      </div>
    </div>
  );
};

export default ReportDetail;
