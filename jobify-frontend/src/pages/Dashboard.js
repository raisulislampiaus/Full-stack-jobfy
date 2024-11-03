import React from 'react';
import { Typography, Card, CardContent, Grid, CardActions, Button } from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import WorkIcon from '@mui/icons-material/Work';
import PeopleIcon from '@mui/icons-material/People';

// Sample data for totals
const totals = {
    totalCompanies: 10, // Replace with actual data
    totalJobs: 25,      // Replace with actual data
    totalUsers: 100,    // Replace with actual data
};

const Dashboard = () => (
    <div style={{ padding: '20px' }}>
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
                <Card elevation={3} style={{ backgroundColor: '#f5f5f5', textAlign: 'center' }}>
                    <CardContent>
                        <BusinessIcon style={{ fontSize: 35, color: '#3f51b5' }} />
                        <Typography variant="h5">Total Companies</Typography>
                        <Typography variant="h4" style={{ color: '#3f51b5' }}>
                            {totals.totalCompanies}
                        </Typography>
                    </CardContent>
                    
                </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <Card elevation={3} style={{ backgroundColor: '#f5f5f5', textAlign: 'center' }}>
                    <CardContent>
                        <WorkIcon style={{ fontSize: 35, color: '#3f51b5' }} />
                        <Typography variant="h5">Total Jobs</Typography>
                        <Typography variant="h4" style={{ color: '#3f51b5' }}>
                            {totals.totalJobs}
                        </Typography>
                    </CardContent>
                   
                </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <Card elevation={3} style={{ backgroundColor: '#f5f5f5', textAlign: 'center' }}>
                    <CardContent>
                        <PeopleIcon style={{ fontSize: 35, color: '#3f51b5' }} />
                        <Typography variant="h5">Total Users</Typography>
                        <Typography variant="h4" style={{ color: '#3f51b5' }}>
                            {totals.totalUsers}
                        </Typography>
                    </CardContent>
                    
                </Card>
            </Grid>
        </Grid>
    </div>
);

export default Dashboard;
