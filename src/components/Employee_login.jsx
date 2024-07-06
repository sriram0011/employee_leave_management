import { Container, Paper, TextField, Button, Typography, Box, Alert } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import '../css/Employee_login.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

const login = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  function handleSubmit1()
  {
    if(id=='1234' && password=='12345')
    {
      navigate('/Employee');
    }
  }
  const handleSubmit = () => {
    const data = { id, password };
    fetch("", {                
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((res) => {
        if (res) {
          navigate("/home");
        } else {
          setError(res.message || "Invalid ID or password. Please try again.");
        }
      })
      .catch((error) => {
        setError("An error occurred while trying to log in. Please try again later.");
        console.error("Error during login:", error);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="login-container">
        <Container maxWidth="sm">
          <Paper elevation={10} className="login-paper">
            <Typography variant="h4" align="center" gutterBottom>
              Employee Login
            </Typography>
            <Box display="flex" flexDirection="column" alignItems="center">
              {error && (
                <Alert severity="error" onClose={() => setError("")} className="error-alert">
                  {error}
                </Alert>
              )}
              <TextField
                className="textfield"
                label="ID"
                variant="outlined"
                fullWidth
                margin="normal"
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
              <TextField
                className="textfield"
                label="Password"
                variant="outlined"
                fullWidth
                type="password"
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                variant="contained"
                color="primary"
                size="large"
                className="login-btn"
                onClick={handleSubmit1}
                fullWidth
              >
                Login
              </Button>
            </Box>
          </Paper>
        </Container>
      </div>
    </ThemeProvider>
  );
};

export default login;
