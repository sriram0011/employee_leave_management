import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/Request_leave.css';
import { useNavigate } from 'react-router-dom';

const RequestedLeave = () => {
    const [leaveRequests, setLeaveRequests] = useState([]);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const navigate=useNavigate();

    useEffect(() => {
        fetchLeaveRequests();
    }, []);

    const fetchLeaveRequests = async () => {
        try {
            const response = await axios.get("http://localhost:8080/leave-requested");
            setLeaveRequests(response.data);
        } catch (error) {
            console.error('Error fetching leave requests:', error);
        }
    };

    const handleAccept = async (req_id) => {
        try {
            const response = await axios.put(`http://localhost:8080/update/${req_id}`);
            if (response.data) {
                setMessage(`Leave request ${req_id} has been accepted`);
                setMessageType('success');
                fetchLeaveRequests(); 
            } else {
                setMessage(`Failed to update leave request ${req_id}`);
                setMessageType('error');
            }
        } catch (error) {
            setMessage(`Error: ${error.message}`);
            setMessageType('error');
        }
    };

    const handleReject = async (req_id) => {
        try {
            const response = await axios.put(`http://localhost:8080/byeee/${req_id}`);
            if (response.data) {
                setMessage(`Leave request ${req_id} has been rejected`);
                setMessageType('success');
                fetchLeaveRequests(); // Refresh the leave requests list
            } else {
                setMessage(`Failed to reject leave request ${req_id}`);
                setMessageType('error');
            }
        } catch (error) {
            setMessage(`Error: ${error.message}`);
            setMessageType('error');
        }
    };
    const change=()=>{
        navigate("/Manager");
    }

    return (
        <div className="leave-container">
            <h2>Leave Requests</h2>
            {message && <p className={`message ${messageType}`}>{message}</p>}
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
                    {leaveRequests.map((request) => (
                        <tr key={request.req_id}>
                            <td>{request.employee_name}</td>
                            <td>{request.employee_id}</td>
                            <td>{request.type_of_leave}</td>
                            <td>{request.from_date}</td>
                            <td>{request.to_date}</td>
                            <td>{request.day}</td>
                            <td>
                                <button className="accept-btn" onClick={() => handleAccept(request.req_id)}>Accept</button>
                                <button className="reject-btn" onClick={() => handleReject(request.req_id)}>Reject</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={()=>change()} id='button1'> return </button>
        </div>

    );
}

export default RequestedLeave;

