import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/reports'); // Fetch reports
        const data = await response.json();

        // Sort by newest first
        const sortedData = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setReports(sortedData);
      } catch (error) {
        console.error('Error fetching reports:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  return (
    <div className="dashboard" style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h2>Reports Dashboard</h2>

      {loading ? (
        <p>Loading reports...</p>
      ) : reports.length === 0 ? (
        <p>No reports found.</p>
      ) : (
        reports.map((report) => (
          <div
            key={report._id}
            style={{
              border: '1px solid #ccc',
              padding: '20px',
              marginBottom: '15px',
              borderRadius: '10px',
              background: '#f9f9f9',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
          >
            <h4 style={{ margin: '0 0 10px' }}>{report.description}</h4>
            <p>
              <strong>Location:</strong> {report.district}, {report.sector}, {report.cell}
            </p>
            <p>
              <strong>Date & Time:</strong> {new Date(report.dateTime).toLocaleString()}
            </p>
            {report.audio && (
              <div>
                <strong>Audio Report:</strong>
                <audio controls style={{ width: '100%', marginTop: '10px' }}>
                  <source
                    src={`data:audio/webm;base64,${report.audio}`} 
                    type="audio/webm" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            )}
            <p><strong>Contact:</strong> {report.contact || 'N/A'}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Dashboard;
