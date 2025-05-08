import React, { useEffect, useState } from 'react';
import { FaListAlt, FaTasks, FaCheckDouble } from 'react-icons/fa';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import { useDistrict } from '../DistrictContext';
import './Statistics.css';

const Statistics = () => {
  const { filteredReports, loading } = useDistrict();
  const [stats, setStats] = useState({
    total: 0,
    accepted: 0,
    done: 0,
  });

  useEffect(() => {
    if (!loading) {
      const total = filteredReports.length;
      const accepted = filteredReports.filter((r) => r.isAccepted === true).length;
      const done = filteredReports.filter((r) => r.completed === true).length;

      setStats({ total, accepted, done });
    }
  }, [filteredReports, loading]);

  if (loading) return <p>Loading statistics...</p>;

  const getPercentage = (value) =>
    stats.total > 0 ? `${((value / stats.total) * 100).toFixed(1)}%` : '0%';

  const statItems = [
    {
      label: 'Total Reports',
      value: stats.total,
      icon: <FaListAlt size={50} color="#2196F3" />,
      description: 'All submitted reports',
      percentage: '100%',
    },
    {
      label: 'Accepted',
      value: stats.accepted,
      icon: <FaTasks size={50} color="#00BCD4" />,
      description: 'Being handled by staff',
      percentage: getPercentage(stats.accepted),
    },
    {
      label: 'Done',
      value: stats.done,
      icon: <FaCheckDouble size={50} color="#4CAF50" />,
      description: 'Resolved reports',
      percentage: getPercentage(stats.done),
    },
  ];

  // Chart data and configurations
  const chartColors = {
    backgroundColor: ['#2196F3', '#00BCD4', '#4CAF50'],
    hoverBackgroundColor: ['#1976D2', '#0097A7', '#388E3C'],
    borderColor: ['#0D47A1', '#006064', '#1B5E20'],
  };

  const barChartData = {
    labels: ['Total', 'Accepted', 'Done'],
    datasets: [
      {
        label: 'Report Count',
        data: [stats.total, stats.accepted, stats.done],
        backgroundColor: chartColors.backgroundColor,
        hoverBackgroundColor: chartColors.hoverBackgroundColor,
        borderColor: chartColors.borderColor,
        borderWidth: 1,
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1000,
      easing: 'easeOutQuart',
    },
    plugins: {
      legend: { display: false },
      title: { display: true, text: 'Reports Overview (Bar Chart)' },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
      },
    },
  };

  return (
    <div className="home-container">
      <h1 className="dashboard-heading">Statistics Overview</h1>

      <div className="chart-boxes">
        {statItems.map((item, index) => (
          <div key={index} className="chart-box">
            <div className="chart-box-icon">{item.icon}</div>
            <h3>{item.label}</h3>
            <p>{item.value}</p>
            <p className="percentage">{item.percentage}</p>
            <p>{item.description}</p>
          </div>
        ))}
      </div>

      <div className="bar-chart-container">
        <Bar data={barChartData} options={barChartOptions} height={400} />
      </div>
    </div>
  );
};

export default Statistics;
