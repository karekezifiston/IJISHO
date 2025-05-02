import React from 'react';
import Sidebar from '../components/Sidebar';

const Statistics = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ flex: 1, padding: '1rem' }}>
        <h2>Statistics</h2>
        <p>Statistics content goes here.</p>
      </div>
    </div>
  );
};

export default Statistics;
