import React, { useState, useEffect } from 'react';
import { AppBar, Box, Toolbar, Typography, IconButton, Menu, MenuItem, responsiveFontSizes } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/Appbar.css';
const Appbar = ({ id }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [reportAnchorEl, setReportAnchorEl] = useState(null);
  const [name, setName] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`http://localhost:8080/e-login/get/${id}`)
    .then(resp => resp.text()) 
    .then((res) => {
        console.log("Fetched name:", res);
        setName(res); 
    })
    .catch((error) => console.error('Error fetching name:', error));
}, [id]);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleApplyLeaveClick = () => {
    setAnchorEl(null);
    navigate('/Employee_leave_apply', { state: { id, name } });
  };

  const handleSignOut = () => {
    localStorage.removeItem('authToken');
    setAnchorEl(null);
    navigate('/employee_leave_management');
  };

  const handleReportMenuClick = (event) => {
    navigate("/Employee_report",{state:{id}});
    setReportAnchorEl(event.currentTarget);
  };

  const handleReportMenuClose = () => {
    setReportAnchorEl(null);
  };

  const handleOverallReportClick = () => {
    setReportAnchorEl(null);
    navigate('/Overall_report');
  };

  const handleCustomReportClick = () => {
    setReportAnchorEl(null);
    navigate('/Custom_report',{state:{id}});
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="relative" className="custom-appbar">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleMenuClick}
            className="custom-icon-button"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} className="appbar-title">
            Employee Portal
          </Typography>
        </Toolbar>
      </AppBar>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        className="custom-menu"
      >
        <MenuItem onClick={handleReportMenuClick} className="custom-menu-item">
          Generate Report
        </MenuItem>
        <MenuItem onClick={handleApplyLeaveClick} className="custom-menu-item">Apply Leave</MenuItem>
        <MenuItem onClick={handleSignOut} className="custom-menu-item">Sign Out</MenuItem>
      </Menu>
    </Box>
  );
};

export default Appbar;
