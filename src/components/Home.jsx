
import React from 'react';
import { Container, Paper, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../css/Home.css';

const Home = () => {
  const navigate = useNavigate();

  function click() {
    navigate('/Employee_login');
  }

  function click2() {
    navigate('/Manager_login');
  }

  return (
    <div className='main-container'>
      <Container>
        <Paper elevation={5} className="login-paper">
          <Typography variant="h4" className="login-title">
            Login As
          </Typography>
          <Button variant="contained" color="primary" className="login-button" onClick={click}>
            Employee
          </Button>
          <br />
          <br />
          <Button variant="contained" color="secondary" className="login-button" onClick={click2}>
            Manager
          </Button>
        </Paper>
      </Container>
    </div>
  );
};

export default Home;
