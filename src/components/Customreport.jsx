import React, { useState } from 'react';
import '../css/Customreport.css'; 
import { useNavigate } from 'react-router-dom';

const Customreport = () => {
  const [employee_id, setEmployeeId] = useState('');
  const [employee_name, setEmployeeName] = useState('');
  const [from_date, setFromDate] = useState('');
  const [to_date, setToDate] = useState('');
  const [status, setStatus] = useState('');
  const [result, setResult] = useState([]);
  const [error, setError] = useState('');
 const navigate=useNavigate();
  const getReport = async (e) => {
    e.preventDefault();
    const reportData = {
      employee_id,
      employee_name,
      from_date,
      to_date,
      status,
    };

    try {
      const response = await fetch('http://localhost:8080/custom-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reportData),
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      const data = await response.json();
      setResult(data);
      setError('');
    } catch (error) {
      console.error('Error fetching report:', error);
      setError(error.message);
    }
  };

  return (
    <div className="custom-report-container">
      <h2>Create Custom Report</h2>
      <form className="custom-report-form" onSubmit={getReport}>
        <div className="form-group">
          <label htmlFor="employeeId">Employee ID:</label>
          <input
            type="text"
            id="employeeId"
            value={employee_id}
            onChange={(e) => setEmployeeId(e.target.value)}
            required
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label htmlFor="employeeName">Employee Name:</label>
          <input
            type="text"
            id="employeeName"
            value={employee_name}
            onChange={(e) => setEmployeeName(e.target.value)}
            required
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label htmlFor="fromDate">From Date:</label>
          <input
            type="date"
            id="fromDate"
            value={from_date}
            onChange={(e) => setFromDate(e.target.value)}
            required
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label htmlFor="toDate">To Date:</label>
          <input
            type="date"
            id="toDate"
            value={to_date}
            onChange={(e) => setToDate(e.target.value)}
            required
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label htmlFor="status">Status:</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
            className="select-field"
          >
            <option value="">Select status</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
        <button type="submit" className="submit-button">Submit</button>
      </form>

      {error && <p className="error-message">Error: {error}</p>}

      {result.length > 0 && (
        <div className="report-result">
          <h3>Report Results</h3>
          <table className="result-table">
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Employee Name</th>
                <th>From Date</th>
                <th>To Date</th>
                <th>Days</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {result.map((item, index) => (
                <tr key={index}>
                  <td>{item.employee_id}</td>
                  <td>{item.employee_name}</td>
                  <td>{item.from_date}</td>
                  <td>{item.to_date}</td>
                  <td>{item.day}</td>
                  <td>{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="return-button" onClick={()=>{navigate("/Manager")}}>Return</button>
        </div>
      )}
    </div>
  );
};

export default Customreport;
