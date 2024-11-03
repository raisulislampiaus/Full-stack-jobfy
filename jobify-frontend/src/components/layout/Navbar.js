import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/slices/authSlice';

const Navbar = () => {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logoutUser());
    };

    return (
        <AppBar position="fixed"> {/* Changed from "static" to "fixed" */}
            <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    Jobify
                </Typography>
                <Button color="inherit" onClick={handleLogout}>
                    Logout
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
