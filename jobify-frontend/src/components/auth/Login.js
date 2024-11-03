// src/components/auth/Login.js

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/slices/authSlice';
import { TextField, Button, Typography, Box, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, error, isAuthenticated } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard'); // Redirect to dashboard on successful login
        }
    }, [isAuthenticated, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser({ email, password }));
    };

    // Helper function to display error messages
    const getErrorMessage = (error) => {
        if (typeof error === 'string') {
            return error;
        } else if (error && error.message) {
            return error.message;
        } else if (error && Array.isArray(error)) {
            return error.join(', '); // Join array of messages into a single string
        }
        return 'An unknown error occurred';
    };

    return (
        <Box 
            display="flex" 
            justifyContent="center" 
            alignItems="center" 
            height="100vh" 
            // Light gray background for the whole page
        >
            <Paper elevation={3} style={{ padding: '20px', width: '400px' }}>
                <Typography variant="h5" align="center" gutterBottom>
                    Login
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Box marginBottom={2}>
                        <TextField 
                            label="Email" 
                            variant="outlined" 
                            fullWidth 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                        />
                    </Box>
                    <Box marginBottom={2}>
                        <TextField 
                            label="Password" 
                            type="password" 
                            variant="outlined" 
                            fullWidth 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                    </Box>
                    <Button 
                        type="submit" 
                        variant="contained" 
                        color="primary" 
                        fullWidth 
                        disabled={isLoading}
                    >
                        {isLoading ? 'Logging in...' : 'Login'}
                    </Button>
                    {error && (
                        <Typography color="error" align="center" style={{ marginTop: '10px' }}>
                            {getErrorMessage(error)}
                        </Typography>
                    )}
                </form>
            </Paper>
        </Box>
    );
};

export default Login;
