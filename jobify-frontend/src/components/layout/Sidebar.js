// src/components/layout/Sidebar.js

import React from 'react';
import { Drawer, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import { useTheme, useMediaQuery } from '@mui/material';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'; // Import Link for routing
import DashboardIcon from '@mui/icons-material/Dashboard'; // Import Dashboard icon
import WorkIcon from '@mui/icons-material/Work'; // Import Work icon
import BusinessIcon from '@mui/icons-material/Business'; // Import Business icon
import PeopleIcon from '@mui/icons-material/People'; // Import People icon
import ChatIcon from '@mui/icons-material/Chat';

const Sidebar = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    
    // Get the user role from Redux state
    const role = useSelector((state) => state.auth.role);

    return (
        <Drawer
            variant={isMobile ? 'temporary' : 'permanent'}
            anchor="left"
            open
            sx={{
                width: 240,
                '& .MuiDrawer-paper': { width: 240, boxSizing: 'border-box', marginTop: '64px' },
            }}
        >
            <List>
                <ListItem button component={Link} to="/dashboard"> {/* Add Link for Dashboard */}
                    <ListItemIcon>
                        <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                </ListItem>
                <ListItem button component={Link} to="/jobs"> {/* Add Link for Jobs */}
                    <ListItemIcon>
                        <WorkIcon />
                    </ListItemIcon>
                    <ListItemText primary="Jobs" />
                </ListItem>
                <ListItem button component={Link} to="/companies"> {/* Add Link for Companies */}
                    <ListItemIcon>
                        <BusinessIcon />
                    </ListItemIcon>
                    <ListItemText primary="Companies" />
                </ListItem>
                <ListItem button component={Link} to="/Chats"> {/* Add Link for Companies */}
                    <ListItemIcon>
                      <ChatIcon />
                    </ListItemIcon>
                    <ListItemText primary="Chat & AI" />
                </ListItem>
                
                {/* Conditionally render the "Users" list item for super-admins only */}
                {role === 'super-admin' && (
                    <ListItem button component={Link} to="/superAdmin"> {/* Add Link for Users */}
                        <ListItemIcon>
                            <PeopleIcon />
                        </ListItemIcon>
                        <ListItemText primary="Users" />
                    </ListItem>
                )}
            </List>
        </Drawer>
    );
};

export default Sidebar;
