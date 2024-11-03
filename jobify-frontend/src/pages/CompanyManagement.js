import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCompanies, createCompany, updateCompany, deleteCompany } from '../redux/slices/companySlice';
import {
    Button,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel,
    TablePagination,
    IconButton,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    CircularProgress,
    Snackbar,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MuiAlert from '@mui/material/Alert';

const CompanyManagement = () => {
    const dispatch = useDispatch();
    const companies = useSelector((state) => state.companies.items);
    const isLoading = useSelector((state) => state.companies.status === 'loading');
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const user = useSelector((state) => state.auth.user);

    const [localCompanies, setLocalCompanies] = useState(companies);
    const [companyName, setCompanyName] = useState('');
    const [companyDescription, setCompanyDescription] = useState('');
    const [editingCompanyId, setEditingCompanyId] = useState(null);
    const [logo, setLogo] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [loading, setLoading] = useState(false);

    // Pagination state
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        dispatch(fetchCompanies());
    }, [dispatch]);

    useEffect(() => {
        setLocalCompanies(companies);
    }, [companies]);

    const handleAddOrUpdate = async () => {
        if (!companyName || !companyDescription) {
            setSnackbarMessage('Please fill in all fields.');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
            return;
        }

        const formData = new FormData(); // Create a new FormData instance
        formData.append('name', companyName);
        formData.append('description', companyDescription);
        if (logo) {
            formData.append('logo', logo); // Append the logo file if it exists
        }

        setLoading(true);
        try {
            if (editingCompanyId) {
                await dispatch(updateCompany({ id: editingCompanyId, companyData: formData }));
                setSnackbarMessage('Company updated successfully.');
            } else {
                await dispatch(createCompany(formData));
                setSnackbarMessage('Company created successfully.');
            }
            resetForm();
        } catch (error) {
            setSnackbarMessage('Error processing your request.');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (company) => {
        setCompanyName(company.name);
        setCompanyDescription(company.description);
        setLogo(null);
        setEditingCompanyId(company._id);
        setOpenDialog(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this company?')) {
            setLoading(true);
            try {
                await dispatch(deleteCompany(id));
                setLocalCompanies((prev) => prev.filter(company => company._id !== id));
                setSnackbarMessage('Company deleted successfully.');
            } catch (error) {
                setSnackbarMessage('Error deleting company.');
                setSnackbarSeverity('error');
            } finally {
                setLoading(false);
            }
        }
    };

    const resetForm = () => {
        setCompanyName('');
        setCompanyDescription('');
        setLogo(null);
        setEditingCompanyId(null);
        setOpenDialog(false);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    // Handle changes in pagination
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <div>
            <h2>Company Management</h2>
            {(isAuthenticated && (user.role === 'admin' || user.role === 'super-admin')) && (
                <Button variant="outlined" onClick={() => setOpenDialog(true)}>
                    Add Company
                </Button>
            )}
            <Dialog open={openDialog} onClose={resetForm}>
                <DialogTitle>{editingCompanyId ? 'Edit Company' : 'Add Company'}</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Company Name"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Description"
                        value={companyDescription}
                        onChange={(e) => setCompanyDescription(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <input
                        type="file"
                        onChange={(e) => setLogo(e.target.files[0])}
                        accept="image/*"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={resetForm}>Cancel</Button>
                    <Button onClick={handleAddOrUpdate} disabled={loading || isLoading}>
                        {editingCompanyId ? 'Update' : 'Add'}
                    </Button>
                </DialogActions>
            </Dialog>

            {loading || isLoading ? (
                <CircularProgress />
            ) : (
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Logo</TableCell>
                                <TableCell>Company Name</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {localCompanies.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((company) => (
                                <TableRow key={company._id}>
                                    <TableCell>
                                        <img src={company.logoUrl} alt={company.name} style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                                    </TableCell>
                                    <TableCell>{company.name}</TableCell>
                                    <TableCell>{company.description}</TableCell>
                                    <TableCell>
                                        {isAuthenticated && (user.role === 'admin' || user.role === 'super-admin') && (
                                            <>
                                                <IconButton onClick={() => handleEdit(company)}>
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton onClick={() => handleDelete(company._id)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={localCompanies.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </TableContainer>
            )}

            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <MuiAlert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </MuiAlert>
            </Snackbar>
        </div>
    );
};

export default CompanyManagement;
