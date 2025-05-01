import React, { useEffect, useState } from 'react';
import { FaListAlt, FaCheckDouble, FaTasks } from 'react-icons/fa';
import './Home.css'; // reuse existing styles

const Statistics = () => {
  const [stats, setStats] = useState({
    total: 0,
    accepted: 0,
    done: 0,
  });

  useEffect(() => {
    fetch()
      .then((res) => res.json())
      .then((data) => {
        setStats({
          total: data.totalReports,
          accepted: data.acceptedReports,
          done: data.doneReports,
        });
      })
      .catch((err) => {
        console.error('Failed to fetch statistics:', err);
      });
  }, []);

  return (
    <div className="home-container">
      <h1 className="dashboard-heading">Statistics Overview</h1>
      <div className="dashboard-boxes">
        <div className="dashboard-box">
          <div className="title-row">
            <h2>Total Reports</h2>
            <p>{stats.total}</p>
          </div>
          <FaListAlt size={50} color="#2196F3" />
          <p>All submitted reports</p>
        </div>

        <div className="dashboard-box">
          <div className="title-row">
            <h2>Accepted</h2>
            <p>{stats.accepted}</p>
          </div>
          <FaTasks size={50} color="#00BCD4" />
          <p>Being handled by staff</p>
        </div>

        <div className="dashboard-box">
          <div className="title-row">
            <h2>Done</h2>
            <p>{stats.done}</p>
          </div>
          <FaCheckDouble size={50} color="#4CAF50" />
          <p>Resolved reports</p>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
