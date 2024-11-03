import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdmins, createAdmin, updateAdmin, deleteAdmin } from '../redux/slices/adminSlice';
import {
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const AdminManagement = () => {
  const dispatch = useDispatch();
  const admins = useSelector((state) => state.admins.items);
  const isLoading = useSelector((state) => state.admins.status === 'loading');

  const [openDialog, setOpenDialog] = useState(false);
  const [editingAdminId, setEditingAdminId] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    dispatch(fetchAdmins());
  }, [dispatch]);

  const handleOpenDialog = () => setOpenDialog(true);

  const handleCloseDialog = () => {
    setOpenDialog(false);
    resetForm();
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setEditingAdminId(null);
  };

  const handleAddOrUpdateAdmin = () => {
    const adminData = { email, password };

    if (editingAdminId) {
      dispatch(updateAdmin({ id: editingAdminId, adminData })).then(() => {
        dispatch(fetchAdmins()); // Refresh data after updating
      });
    } else {
      dispatch(createAdmin(adminData)).then(() => {
        dispatch(fetchAdmins()); // Refresh data after creating
      });
    }

    handleCloseDialog();
  };

  const handleEditAdmin = (admin) => {
    setEmail(admin.email);
    setEditingAdminId(admin._id); // Assuming the id field is '_id'
    setOpenDialog(true);
  };

  const handleDeleteAdmin = (id) => {
    dispatch(deleteAdmin(id)).then(() => {
      dispatch(fetchAdmins()); // Refresh data after deleting
    });
  };

  return (
    <div>
      <h2>Admin Management</h2>
      <Button variant="contained" onClick={handleOpenDialog}>
        Add Admin
      </Button>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{editingAdminId ? 'Edit Admin' : 'Add Admin'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleAddOrUpdateAdmin} disabled={isLoading}>
            {editingAdminId ? 'Update Admin' : 'Add Admin'}
          </Button>
        </DialogActions>
      </Dialog>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <TableContainer component={Paper} style={{ marginTop: '20px' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Email</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {admins.map((admin) => (
                <TableRow key={admin._id}>
                  <TableCell>{admin.email}</TableCell>
                  <TableCell align="right">
                    <IconButton edge="end" onClick={() => handleEditAdmin(admin)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton edge="end" onClick={() => handleDeleteAdmin(admin._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default AdminManagement;
