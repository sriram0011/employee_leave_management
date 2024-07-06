import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Container, Paper, TextField, Typography, Button, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import '../css/Manager_login.css';

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


const Manager_login = () => {
  const [manager_id, setId] = useState("");
  const [manager_passwor, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  function click1()
  {
  if(manager_id=='12' && manager_passwor=='pass')
  {
    navigate("/Manager");
  }
  else{
    setError(res.message || "ID or password is incorrect. Please try again.");
  }
  }


  const click = () => {
    const data = { manager_id, manager_passwor };
    fetch("http://localhost:8080/manager_Login_verify", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((res) => {
        if (res) {
          navigate("/Manager");
        } else {
          setError(res.message || "ID or password is incorrect. Please try again.");
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
              Manager Login
            </Typography>
            <Box display="flex" flexDirection="column" alignItems="center">
              {error && (
                <Alert severity="error" onClose={() => setError("")} className="error-alert">
                  {error}
                </Alert>
              )}
              <TextField
                className="textfield"
                label="Manager ID"
                variant="outlined"
                fullWidth
                margin="normal"
                value={manager_id}
                onChange={(e) => setId(e.target.value)}
              />
              <TextField
                className="textfield"
                label="Password"
                variant="outlined"
                fullWidth
                type="password"
                margin="normal"
                value={manager_passwor}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                variant="contained"
                color="primary"
                size="large"
                className="login-btn"
                onClick={click1}
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

export default Manager_login;
