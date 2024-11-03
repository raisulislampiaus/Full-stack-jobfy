// src/App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CssBaseline, Box, useMediaQuery, Drawer, IconButton, CircularProgress, Backdrop } from '@mui/material';
import { useSelector } from 'react-redux';
import Login from './components/auth/Login';
import Dashboard from './pages/Dashboard';
import CompanyManagement from './pages/CompanyManagement';
import AdminManagement from './pages/AdminManagement';
import JobPage from './pages/JobPage';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import ProtectedRoute from './ProtectedRoute';
import MenuIcon from '@mui/icons-material/Menu';
import JobDescriptionGenerator from './pages/JobDescriptionGenerator';

const App = () => {
    const { isAuthenticated, isLoading } = useSelector((state) => state.auth); // Assuming isLoading is part of auth state
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));
    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    return (
        <Router>
            <CssBaseline />

            {/* Global Loader */}
            <Backdrop open={isLoading} style={{ zIndex: 1301, color: '#fff' }}>
                <CircularProgress color="inherit" />
            </Backdrop>

            {isAuthenticated && (
                <>
                    {/* Navbar at the top */}
                    <Navbar />

                    {/* Sidebar toggle button only on mobile */}
                    {isMobile && (
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={toggleDrawer}
                            sx={{ position: 'fixed', top: 16, left: 16, zIndex: 1300 }}
                        >
                            <MenuIcon />
                        </IconButton>
                    )}

                    {/* Sidebar as a Drawer on mobile, permanent on desktop */}
                    <Drawer
                        anchor="left"
                        open={drawerOpen}
                        onClose={toggleDrawer}
                        variant={isMobile ? "temporary" : "permanent"}
                        sx={{
                            display: { xs: 'block', md: 'none' }, // Show Drawer only on mobile
                            '& .MuiDrawer-paper': { width: 240, marginTop: '64px' } // Adjusts for navbar height on mobile
                        }}
                    >
                        <Box sx={{ mt: '16px' }}> {/* Margin Top for mobile Drawer */}
                            <Sidebar />
                        </Box>
                    </Drawer>

                    {/* Permanent sidebar below navbar on larger screens with margin */}
                    {!isMobile && (
                        <Box sx={{ width: 240, flexShrink: 0, mt: '64px', ml: '16px' }}> {/* Margin Top for desktop Sidebar */}
                            <Sidebar />
                        </Box>
                    )}
                </>
            )}

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    marginLeft: isAuthenticated && !isMobile ? '240px' : 0,
                    marginTop: isAuthenticated && isMobile ? '64px' : 0, // Adjusts for navbar height on mobile
                }}
            >
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<Login />} />
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/companies"
                        element={
                            <ProtectedRoute>
                                <CompanyManagement />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/jobs"
                        element={
                            <ProtectedRoute>
                                <JobPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/superAdmin"
                        element={
                            <ProtectedRoute>
                                <AdminManagement />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/chats"
                        element={
                            <ProtectedRoute>
                                <JobDescriptionGenerator />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </Box>
        </Router>
    );
};

export default App;
