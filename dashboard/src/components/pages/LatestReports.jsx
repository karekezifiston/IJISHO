import React from 'react';
import './LatestReports.css'; // Add styles for the component

const LatestReports = () => {
    return (
        <div className="latest-reports">
            <h2>LATESTS REPORTS</h2>

            <div className="report-grid">
                <div className="grid-item">
                    <strong>Location</strong>
                </div>
                <div className="grid-item">
                    <strong>Time</strong>
                </div>
                <div className="grid-item">
                    <strong>Report</strong>
                </div>
                <div className="grid-item">
                    <strong>Crime Type</strong>
                </div>
            </div>
        </div>
    );
};

export default LatestReports;
