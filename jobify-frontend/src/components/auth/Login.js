import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/slices/authSlice';
import { TextField, Button, Typography, Box, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
    email: yup.string().email('Enter a valid email').required('Email is required'),
    password: yup.string().min(6, 'Password should be of minimum 6 characters length').required('Password is required')
});

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, error, isAuthenticated } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard');
        }
    }, [isAuthenticated, navigate]);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            dispatch(loginUser(values));
        },
    });

    const getErrorMessage = (error) => {
        if (typeof error === 'string') {
            return error;
        } else if (error && error.message) {
            return error.message;
        } else if (error && Array.isArray(error)) {
            return error.join(', ');
        }
        return 'An unknown error occurred';
    };

    return (
        <Box 
            display="flex" 
            justifyContent="center" 
            alignItems="center" 
            height="100vh"
        >
            <Paper elevation={3} style={{ padding: '20px', width: '400px' }}>
                <Typography variant="h5" align="center" gutterBottom>
                    Login
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                    <Box marginBottom={2}>
                        <TextField 
                            label="Email" 
                            variant="outlined" 
                            fullWidth 
                            id="email"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                            required
                        />
                    </Box>
                    <Box marginBottom={2}>
                        <TextField 
                            label="Password" 
                            type="password" 
                            variant="outlined" 
                            fullWidth 
                            id="password"
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
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
