import React, { useEffect, useState } from 'react';
import { useDistrict } from '../DistrictContext';

const LatestReports = () => {
  const { district } = useDistrict();
  const [reports, setReports] = useState([]);

  useEffect(() => {
    if (district) {
      fetch(`/api/reports?district=${district}`)
        .then((response) => response.json())
        .then((data) => setReports(data))
        .catch((error) => console.error('Error fetching reports:', error));
    }
  }, [district]);

  return (
    <div>
      <h3>Latest Reports for {district}</h3>
      {reports.length > 0 ? (
        <ul>
          {reports.map((report, index) => (
            <li key={index}>{report.title}</li>
          ))}
        </ul>
      ) : (
        <p>No reports available for this district.</p>
      )}
    </div>
  );
};

export default LatestReports;
