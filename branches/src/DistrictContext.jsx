// src/DistrictContext.js

import React, { createContext, useContext, useState, useEffect } from 'react';

const DistrictContext = createContext();

export const DistrictProvider = ({ children }) => {
  const [district, setDistrict] = useState('');
  const [allReports, setAllReports] = useState([]);

  useEffect(() => {
    // Load selected district from localStorage
    const savedDistrict = localStorage.getItem('selectedDistrict');
    if (savedDistrict) {
      setDistrict(savedDistrict);
    }

    // Fetch all reports once
    fetch('http://localhost:5000/api/reports')
      .then((res) => res.json())
      .then((data) => setAllReports(data))
      .catch((err) => console.error('Failed to fetch reports:', err));
  }, []);

  const selectDistrict = (selected) => {
    setDistrict(selected);
    localStorage.setItem('selectedDistrict', selected); // persist it
  };

  // Filter reports based on selected district
  const filteredReports = allReports.filter((report) => report.district === district);

  return (
    <DistrictContext.Provider value={{ district, selectDistrict, filteredReports }}>
      {children}
    </DistrictContext.Provider>
  );
};

export const useDistrict = () => useContext(DistrictContext);
