import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LatestReports.css';

const LatestReports = () => {
    const [reports, setReports] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:5000/api/reports')
            .then((res) => res.json())
            .then((data) => setReports(data))
            .catch((err) => console.error('Error fetching reports:', err));
    }, []);

    const handleReportClick = (reportId) => {
        navigate(`/report/${reportId}`);
    };

    return (
        <div className="all-reports-container">
            <h2 className="reports-heading">Latest Reports</h2>

            <div className="latest-reports">
                <div className="report-grid header">
                    <div className="grid-item"><strong>Location</strong></div>
                    <div className="grid-item"><strong>Time</strong></div>
                    <div className="grid-item"><strong>Report</strong></div>
                    <div className="grid-item"><strong>Crime Type</strong></div>
                </div>

                {reports.map((report) => (
                    <div
                        key={report._id}
                        className="report-grid row"
                        onClick={() => handleReportClick(report._id)}
                        style={{ cursor: 'pointer' }}
                    >
                        <div className="grid-item">{`${report.district}, ${report.sector}, ${report.cell}`}</div>
                        <div className="grid-item">{new Date(report.dateTime).toLocaleString()}</div>
                        <div className="grid-item">{report.description}</div>
                        <div className="grid-item">{report.crimeType}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LatestReports;
