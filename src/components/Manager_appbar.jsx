import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import '../css/Manager_appbar.css';

const ManagerAppbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [reportAnchorEl, setReportAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setReportAnchorEl(null);
  };

  const handleGenerateReportClick = (event) => {
    setReportAnchorEl(event.currentTarget);
  };

  const handleCustomReportClick = () => {
    handleMenuClose();
    navigate('/custom-report');
  };

  const handleOverallReportClick = () => {
    handleMenuClose();
    navigate('/over-all-report');
  };

  const handleViewRequestsClick = () => {
    handleMenuClose();
    navigate('/view-requests');
  };

  const handleSignOutClick = () => {
    handleMenuClose();
    navigate('/employee_leave_management');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="relative" className="manager-appbar">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleMenuClick}
            className="manager-icon-button"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} className="appbar-title">
            Manager Portal
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
        className="manager-menu"
      >
        <MenuItem onClick={handleGenerateReportClick} className="manager-menu-item">
          Generate Report
          <Menu
            id="report-menu"
            anchorEl={reportAnchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={Boolean(reportAnchorEl)}
            onClose={handleMenuClose}
            className="report-menu"
          >
            <MenuItem onClick={handleCustomReportClick} className="report-menu-item">
              Custom Report
            </MenuItem>
            <MenuItem onClick={handleOverallReportClick} className="report-menu-item">
              Overall Report
            </MenuItem>
          </Menu>
        </MenuItem>
        <MenuItem onClick={handleViewRequestsClick} className="manager-menu-item">
          View Requests Received
        </MenuItem>
        <MenuItem onClick={handleSignOutClick} className="manager-menu-item">
          Sign Out
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default ManagerAppbar;
