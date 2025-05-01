import React, { useEffect, useState } from 'react';

const DoneReports = () => {
  const [doneReports, setDoneReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch done reports from the backend
    fetch('http://localhost:5000/api/reports/done')  // Make sure this endpoint matches your backend
      .then((response) => response.json())
      .then((data) => {
        // Filter the reports where isDone is true
        const doneReports = data.filter(report => report.isDone);
        // Make sure the dateTime is converted to a proper Date object
        const updatedReports = doneReports.map(report => ({
          ...report,
          dateTime: new Date(report.dateTime.$date), // Convert MongoDB date to JavaScript Date object
        }));
        setDoneReports(updatedReports);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching done reports:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Done Reports</h1>
      {doneReports.length === 0 ? (
        <p>No done reports available</p>
      ) : (
        <div>
          {doneReports.map((report) => (
            <div key={report._id} className="report-card">
              <h3>{report.crimeType}</h3>
              <p>{report.district} - {report.sector} - {report.cell}</p>
              <p>{new Date(report.dateTime).toLocaleString()}</p>
              <p>{report.description}</p>
              {/* Display other relevant fields as needed */}
              <button onClick={() => window.location.href = `/report/${report._id}`}>View Details</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DoneReports;
