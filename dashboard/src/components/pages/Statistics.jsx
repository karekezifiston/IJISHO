import React, { useEffect, useState } from 'react'; 
import { FaListAlt, FaCheckDouble, FaTasks } from 'react-icons/fa';
import { Bar } from 'react-chartjs-2';
import './Statistics.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import './Home.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ChartBox = ({ label, value, icon, description, percentage }) => (
  <div className="chart-box">
    <div className="title-row">
      <h2>{label}</h2>
      <p>{value}</p>
    </div>
    <div className="icon">{icon}</div>
    <p>{description}</p>
    <p className="percentage">{percentage}</p>
  </div>
);

const Statistics = () => {
  const [stats, setStats] = useState({
    total: 0,
    accepted: 0,
    done: 0,
  });

  const fetchStatistics = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/reports/statistics');
      const data = await response.json();
      setStats({
        total: data.totalReports || 0,
        accepted: data.acceptedReports || 0,
        done: data.doneReports || 0,
      });
    } catch (err) {
      console.error('Failed to fetch statistics:', err);
    }
  };

  useEffect(() => {
    fetchStatistics();
  }, []);

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

  // ✅ Centralized chart color configuration
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
          <ChartBox
            key={index}
            label={item.label}
            value={item.value}
            icon={item.icon}
            description={item.description}
            percentage={item.percentage}
          />
        ))}
      </div>

      <div className="bar-chart-container">
        <Bar data={barChartData} options={barChartOptions} height={400} />
      </div>
    </div>
  );
};

export default Statistics;
