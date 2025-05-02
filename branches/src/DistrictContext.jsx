// src/DistrictContext.js

import React, { createContext, useContext, useState } from 'react';

// Create the context
const DistrictContext = createContext();

// Create a provider to wrap your app with
export const DistrictProvider = ({ children }) => {
  const [district, setDistrict] = useState(localStorage.getItem('district') || '');  // Initialize from localStorage

  // Save selected district to localStorage
  const selectDistrict = (district) => {
    setDistrict(district);
    localStorage.setItem('district', district);  // Save to localStorage so it persists across reloads
  };

  return (
    <DistrictContext.Provider value={{ district, selectDistrict }}>
      {children}
    </DistrictContext.Provider>
  );
};

// Custom hook to access the district context
export const useDistrict = () => {
  return useContext(DistrictContext);
};
