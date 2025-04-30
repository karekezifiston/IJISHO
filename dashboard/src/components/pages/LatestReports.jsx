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

    const formatDate = (date) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: true };
        const formattedDate = new Date(date).toLocaleDateString(undefined, options);
        const formattedTime = new Date(date).toLocaleTimeString(undefined, timeOptions);
        return `${formattedTime} - ${formattedDate}`;
    };

    return (
        <div className="all-reports-container">
            <h2 className="reports-heading">Latest Reports</h2>

            <div className="latest-reports">
                {reports.map((report) => (
                    <div
                        key={report._id}
                        className="report-list-item"
                        onClick={() => handleReportClick(report._id)}
                    >
                        <div className="report-main">
                            <div className="report-title">{report.description}</div>
                            <div className="report-meta">
                                <span>{report.district}, {report.sector}, {report.cell}</span>
                                <span className="report-type">{report.crimeType}</span>
                            </div>
                        </div>
                        <div className="report-time">{formatDate(report.dateTime)}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LatestReports;
