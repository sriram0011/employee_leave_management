import React, { useEffect, useState } from 'react';
import {  useLocation } from 'react-router-dom';
const Employee_report = () => {
  const location = useLocation();
    const { id } = location.state || {};
  const [report, setReport] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await fetch(`http://localhost:8080/over-all-report/${id}`);
        if (!response.ok) {
          const errorText = await response.text();
          console.error(`Error: ${response.status} ${response.statusText} - ${errorText}`);
          throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setReport(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchReport();
  }, [id]);

  return (
    <div className="leave-container">
      <h2>Leave Requests</h2>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <table className="leave-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>ID</th>
              <th>Type of Leave</th>
              <th>From Date</th>
              <th>To Date</th>
              <th>Days</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {report.map((request) => (
              <tr key={request.req_id}>
                <td>{request.employee_name}</td>
                <td>{request.employee_id}</td>
                <td>{request.type_of_leave}</td>
                <td>{request.from_date}</td>
                <td>{request.to_date}</td>
                <td>{request.day}</td>
                <td>{request.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
        
      )}
    </div>
  );
};

export default Employee_report;
