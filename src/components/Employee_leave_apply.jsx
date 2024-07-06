import React, { useState, useEffect } from 'react';
import { Snackbar, Alert, TextField, Button, Select, MenuItem, InputLabel, FormControl, Container, Paper, Typography, Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import '../css/Employee_leave_apply.css';

const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const Employee_leave_apply = () => {
    const location = useLocation();
    const { id ,name} = location.state || {};

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarOpen1, setSnackbarOpen1] = useState(false);
    const navigate = useNavigate();
    const [employeeId, setEmployeeId] = useState(id || '');
    const [employeeName, setEmployeeName] = useState( name ||'');
    const [typeOfLeave, setTypeOfLeave] = useState('');
    const [fromDate, setFromDate] = useState(formatDate(new Date())); 
    const [toDate, setToDate] = useState(formatDate(new Date())); 
    const [day, setDay] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            employee_id: parseInt(employeeId),
            employee_name: employeeName,
            type_of_leave: typeOfLeave,
            from_date: fromDate,
            to_date: toDate,
            day: day,
            status: 'pending'
        };

        fetch('http://localhost:8080/leave', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(res => res.json())
        .then((resp) => {
            if (resp) {
                setSnackbarOpen(true);
                setTimeout(() => {
                    setSnackbarOpen(false);
                    navigate('/Employee');
                }, 2000);
            } else {
                setSnackbarOpen1(true);
                setTimeout(() => {
                    setSnackbarOpen1(false);
                }, 3000);
            }
        });
    };

    const calculateDays = (fromDate, toDate) => {
        const from = new Date(fromDate);
        const to = new Date(toDate);
        const differenceInTime = to.getTime() - from.getTime();
        const differenceInDays = differenceInTime / (1000 * 3600 * 24) + 1;
        return differenceInDays > 0 ? differenceInDays : 0;
    };

    useEffect(() => {
        const days = calculateDays(fromDate, toDate);
        setDay(days);
    }, [fromDate, toDate]);

    return (
        <Container maxWidth="sm" className="form-container">
            <Paper elevation={10} className="form-paper">
                <Typography variant="h4" component="h2" className="form-title">
                    Leave Request Form
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        className="text-field"
                        label="Employee ID"
                        value={employeeId}
                        onChange={(e) => setEmployeeId(e.target.value)}
                        required
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        className="text-field"
                        label="Employee Name"
                        value={employeeName}
                        onChange={(e) => setEmployeeName(e.target.value)}
                        required
                        fullWidth
                        margin="normal"
                    />
                    <FormControl className="text-field" label="type of leave" required fullWidth margin="normal">
                        <InputLabel>Type of Leave</InputLabel>
                        <Select
                            value={typeOfLeave}
                            onChange={(e) => setTypeOfLeave(e.target.value)}
                        >
                            <MenuItem value="Sick Leave">Sick Leave</MenuItem>
                            <MenuItem value="Casual Leave">Casual Leave</MenuItem>
                            <MenuItem value="Maternity Leave">Maternity Leave</MenuItem>
                            <MenuItem value="Paternity Leave">Paternity Leave</MenuItem>
                            <MenuItem value="Annual Leave">Annual Leave</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        className="date-field"
                        type="date"
                        label="From Date"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                        required
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        margin="normal"
                    />
                    <TextField
                        className="date-field"
                        type="date"
                        label="To Date"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                        required
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        margin="normal"
                    />
                    <TextField
                        className="day"
                        type="text"
                        label="No of Days"
                        value={day}
                        onChange={(e) => setDay(e.target.value)}
                        required
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        margin="normal"
                        disabled
                    />
                    <Button type="submit" variant="contained" color="primary" className="submit-button">
                        Submit
                    </Button>
                </form>
            </Paper>
            <Snackbar open={snackbarOpen} autoHideDuration={2000} onClose={() => setSnackbarOpen(false)}>
                <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '100%' }}>
                    Request submitted successfully.
                </Alert>
            </Snackbar>
            <Snackbar open={snackbarOpen1} autoHideDuration={3000} onClose={() => setSnackbarOpen1(false)}>
                <Alert onClose={() => setSnackbarOpen1(false)} severity="warning" sx={{ width: '100%' }}>
                    Request already registered.
                </Alert>
            </Snackbar>
        </Container>
    );
}

export default Employee_leave_apply;
