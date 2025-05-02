import React, { useEffect, useState } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement } from 'chart.js';

// Registering the necessary components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement);

const Statistics = () => {
  const [stats, setStats] = useState({
    total: 0,
    accepted: 0,
    done: 0,
  });

  // Fetch the statistics from the API
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

  // Fetch statistics on mount
  useEffect(() => {
    fetchStatistics();
  }, []);

  // Destructuring stats for easier reference
  const { total, accepted, done } = stats;

  // Calculate percentages
  const totalPercentage = total > 0 ? 100 : 0; // All reports are always 100%
  const acceptedPercentage = total > 0 ? ((accepted / total) * 100).toFixed(2) : 0;
  const donePercentage = total > 0 ? ((done / total) * 100).toFixed(2) : 0;

  // Bar chart data
  const barChartData = {
    labels: ['Total', 'Accepted', 'Done'],
    datasets: [
      {
        label: 'Reports Count',
        data: [total, accepted, done],
        backgroundColor: ['#2196F3', '#00BCD4', '#4CAF50'],
        borderColor: ['#2196F3', '#00BCD4', '#4CAF50'],
        borderWidth: 1,
      },
    ],
  };

  // Line chart data
  const lineChartData = {
    labels: ['Total', 'Accepted', 'Done'],
    datasets: [
      {
        label: 'Reports',
        data: [total, accepted, done],
        fill: false,
        borderColor: '#2196F3',
        tension: 0.1,
      },
    ],
  };

  // Pie chart data
  const pieChartData = {
    labels: ['Accepted', 'Done', 'Pending'],
    datasets: [
      {
        data: [accepted, done, total - accepted - done],
        backgroundColor: ['#00BCD4', '#4CAF50', '#2196F3'],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="home-container">
      <h1 className="dashboard-heading">Statistics Overview</h1>
      <div className="charts-container">
        {/* Bar Chart */}
        <div className="chart-box">
          <h2>Reports Breakdown (Bar Chart)</h2>
          <Bar data={barChartData} options={{ responsive: true }} />
          {/* Displaying the percentages */}
          <h3>All Reports: {totalPercentage}%</h3>
          <h3>Accepted: {acceptedPercentage}%</h3>
          <h3>Done: {donePercentage}%</h3>
        </div>

        {/* Line Chart */}
        <div className="chart-box">
          <h2>Reports Trends (Line Chart)</h2>
          <Line data={lineChartData} options={{ responsive: true }} />
          {/* Displaying the percentages */}
          <h3>All Reports: {totalPercentage}%</h3>
          <h3>Accepted: {acceptedPercentage}%</h3>
          <h3>Done: {donePercentage}%</h3>
        </div>

        {/* Pie Chart */}
        <div className="chart-box">
          <h2>Reports Distribution (Pie Chart)</h2>
          <Pie data={pieChartData} options={{ responsive: true }} />
          {/* Displaying the percentages */}
          <h3>All Reports: {totalPercentage}%</h3>
          <h3>Accepted: {acceptedPercentage}%</h3>
          <h3>Done: {donePercentage}%</h3>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
