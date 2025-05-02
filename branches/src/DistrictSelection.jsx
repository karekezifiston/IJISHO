// src/DistrictSelection.js

import React, { useState } from 'react';
import { useDistrict } from './DistrictContext';
import { useNavigate } from 'react-router-dom';

const DistrictSelection = () => {
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const { selectDistrict } = useDistrict();
  const navigate = useNavigate();

  const handleDistrictChange = (e) => {
    setSelectedDistrict(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedDistrict) {
      selectDistrict(selectedDistrict);  // Set the selected district in the context
      navigate('/dashboard');  // Navigate to the dashboard page
    }
  };

  return (
    <div>
      <h2>Select a District</h2>
      <form onSubmit={handleSubmit}>
        <select value={selectedDistrict} onChange={handleDistrictChange}>
          <option value="">Select District</option>
          <option value="Kicukiro">Kicukiro</option>
          <option value="Gasabo">Gasabo</option>
          <option value="Nyarugenge">Nyarugenge</option>
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default DistrictSelection;
