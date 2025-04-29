import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFileAlt, FaCheckCircle, FaRegCheckCircle } from 'react-icons/fa'; // Font Awesome icons
import './Home.css';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="home-container">
            <h1 className="dashboard-heading">Dashboard</h1>
            <div className="dashboard-boxes">
                <div className="dashboard-box" onClick={() => navigate('/latest')}>
                    <div className="title-row">
                    <h2>Latest Reports</h2>
                    <p>More</p>
                    </div>
                    <FaFileAlt size={50}  /> {/* Icon for latest reports */}
                    <p>View newly submitted reports</p>
                </div>

                <div className="dashboard-box" onClick={() => navigate('/accepted')}>
                    <div className="title-row">
                    <h2>Accepted Reports</h2>
                    <p>/100</p>
                    </div>
                    <FaCheckCircle size={50}  /> {/* Icon for accepted reports */}
                    <p>Reports currently being worked on</p>
                </div>
                <div className="dashboard-box" onClick={() => navigate('/done')}>
                 <div className="title-row">
                 <h2>Done Reports</h2>
                 <p>....</p>
                 </div>
                    <FaRegCheckCircle size={50} color="#4CAF50" /> {/* Icon for done reports */}
                    <p>Reports that have been solved</p>
                </div>
            </div>
        </div>
    );
};

export default Home;
