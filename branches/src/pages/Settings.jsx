import React from 'react';
import Sidebar from '../components/Sidebar';

const Settings = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ flex: 1, padding: '1rem' }}>
        <h2>Settings</h2>
        <p>Settings content goes here.</p>
      </div>
    </div>
  );
};

export default Settings;
