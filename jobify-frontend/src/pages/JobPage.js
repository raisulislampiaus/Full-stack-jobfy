// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   fetchJobs,
//   createJob,
//   updateJob,
//   deleteJob,
// } from '../redux/slices/jobSlice.js';
// import {
//   Button,
//   TextField,
//   Typography,
//   Container,
//   Grid,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Modal,
//   TablePagination,
// } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';

// const JobPage = () => {
//   const dispatch = useDispatch();
//   const { items, status, error, totalCount } = useSelector((state) => state.jobs);

//   // State for form inputs and editing
//   const [jobData, setJobData] = useState({
//     title: '',
//     description: '',
//     location: '',
//     salary: '',
//     company: '',
//   });

//   const [editingJobId, setEditingJobId] = useState(null);
//   const [openModal, setOpenModal] = useState(false);

//   // State for filters
//   const [filters, setFilters] = useState({
//     date: '',
//     location: '',
//     minSalary: '',
//     maxSalary: '',
//     company: '',
//     search: '',
//   });

//   // State for pagination
//   const [page, setPage] = useState(0); // Starting from page 0
//   const [rowsPerPage, setRowsPerPage] = useState(10); // Default number of rows per page

//   useEffect(() => {
//     const fetchParams = {
//       ...filters,
//       page: page + 1, // Increment to match API pagination
//       limit: rowsPerPage,
//     };
//     dispatch(fetchJobs(fetchParams));
//   }, [dispatch, filters, page, rowsPerPage]); // Update when filters, page, or rowsPerPage change

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setJobData({ ...jobData, [name]: value });
//   };

//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     setFilters({ ...filters, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (editingJobId) {
//       dispatch(updateJob({ id: editingJobId, jobData }))
//         .unwrap()
//         .then(() => {
//           handleClose();
//         });
//     } else {
//       dispatch(createJob(jobData))
//         .unwrap()
//         .then(() => {
//           handleClose();
//         });
//     }
//   };

//   const handleEditClick = (job) => {
//     setEditingJobId(job._id);
//     setJobData({
//       title: job.title,
//       description: job.description,
//       location: job.location,
//       salary: job.salary,
//       company: job.company ? job.company.name : '', // Safely access company name
//     });
//     setOpenModal(true);
//   };

//   const handleDeleteClick = (id) => {
//     dispatch(deleteJob(id));
//   };

//   const handleClose = () => {
//     setOpenModal(false);
//     setEditingJobId(null);
//     setJobData({ title: '', description: '', location: '', salary: '', company: '' });
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0); // Reset to first page when changing rows per page
//   };

//   return (
//     <Container>
//       <Typography variant="h4" gutterBottom>
//         Job Management
//       </Typography>

//       <Grid container spacing={2}>
//         <Grid item xs={12} md={3}>
//           <TextField
//             fullWidth
//             type="date"
//             label="Filter by Date"
//             name="date"
//             value={filters.date}
//             onChange={handleFilterChange}
//           />
//         </Grid>
//         <Grid item xs={12} md={3}>
//           <TextField
//             fullWidth
//             label="Filter by Location"
//             name="location"
//             value={filters.location}
//             onChange={handleFilterChange}
//           />
//         </Grid>
//         <Grid item xs={12} md={3}>
//           <TextField
//             fullWidth
//             label="Min Salary"
//             name="minSalary"
//             type="number"
//             value={filters.minSalary}
//             onChange={handleFilterChange}
//           />
//         </Grid>
//         <Grid item xs={12} md={3}>
//           <TextField
//             fullWidth
//             label="Max Salary"
//             name="maxSalary"
//             type="number"
//             value={filters.maxSalary}
//             onChange={handleFilterChange}
//           />
//         </Grid>
//         <Grid item xs={12} md={3}>
//           <TextField
//             fullWidth
//             label="Filter by Company"
//             name="company"
//             value={filters.company}
//             onChange={handleFilterChange}
//           />
//         </Grid>
//         <Grid item xs={12} md={3}>
//           <TextField
//             fullWidth
//             label="Search"
//             name="search"
//             value={filters.search}
//             onChange={handleFilterChange}
//           />
//         </Grid>
//       </Grid>

//       <Button variant="contained" color="primary" onClick={() => setOpenModal(true)} style={{ marginTop: '16px' }}>
//         Create Job
//       </Button>

//       <Typography variant="h6" style={{ marginTop: '16px' }}>Job Listings</Typography>
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Job Title</TableCell>
//               <TableCell>Description</TableCell>
//               <TableCell>Location</TableCell>
//               <TableCell>Salary</TableCell>
//               <TableCell>Company</TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((job) => (
//               <TableRow key={job._id}>
//                 <TableCell>{job.title}</TableCell>
//                 <TableCell>{job.description}</TableCell>
//                 <TableCell>{job.location}</TableCell>
//                 <TableCell>{job.salary}</TableCell>
//                 <TableCell>{job.company ? job.company.name : 'N/A'}</TableCell> {/* Defensive check here */}
//                 <TableCell>
//                   <Button onClick={() => handleEditClick(job)} color="primary" aria-label="edit">
//                     <EditIcon />
//                   </Button>
//                   <Button onClick={() => handleDeleteClick(job._id)} color="secondary" aria-label="delete">
//                     <DeleteIcon />
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <TablePagination
//         rowsPerPageOptions={[5, 10, 25]} // Options for number of rows per page
//         component="div"
//         count={items.length} // Total number of items for pagination
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onPageChange={handleChangePage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//         style={{ marginTop: '16px' }}
//       />

//       <Modal
//         open={openModal}
//         onClose={handleClose}
//         aria-labelledby="modal-title"
//         aria-describedby="modal-description"
//       >
//         <Paper style={{ margin: 'auto', padding: '20px', maxWidth: 400, marginTop: '50px' }}>
//           <Typography id="modal-title" variant="h6">
//             {editingJobId ? 'Edit Job' : 'Create Job'}
//           </Typography>
//           <form onSubmit={handleSubmit}>
//             <Grid container spacing={2}>
//               <Grid item xs={12}>
//                 <TextField
//                   fullWidth
//                   label="Job Title"
//                   name="title"
//                   value={jobData.title}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   fullWidth
//                   label="Description"
//                   name="description"
//                   value={jobData.description}
//                   onChange={handleInputChange}
//                   required
//                   multiline
//                   rows={4}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   fullWidth
//                   label="Location"
//                   name="location"
//                   value={jobData.location}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   fullWidth
//                   type="number"
//                   label="Salary"
//                   name="salary"
//                   value={jobData.salary}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   fullWidth
//                   label="Company"
//                   name="company"
//                   value={jobData.company}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <Button type="submit" variant="contained" color="primary">
//                   {editingJobId ? 'Update Job' : 'Create Job'}
//                 </Button>
//               </Grid>
//             </Grid>
//           </form>
//         </Paper>
//       </Modal>
//     </Container>
//   );
// };

// export default JobPage;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchJobs,
  createJob,
  updateJob,
  deleteJob,
} from "../redux/slices/jobSlice";
import { fetchCompanies } from "../redux/slices/companySlice";
import {
  Button,
  TextField,
  Typography,
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Modal,
  TablePagination,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf"; // Import PDF icon

const JobPage = () => {
  const dispatch = useDispatch();
  const { items: jobs, totalCount } = useSelector((state) => state.jobs);
  const { items: companies } = useSelector((state) => state.companies);

  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    company: "",
    file: null,
  });
  const [editingJobId, setEditingJobId] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [filters, setFilters] = useState({
    date: "",
    location: "",
    minSalary: "",
    maxSalary: "",
    company: "",
    search: "",
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    dispatch(fetchJobs({ ...filters, page: page + 1, limit: rowsPerPage }));
    dispatch(fetchCompanies());
  }, [dispatch, filters, page, rowsPerPage]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJobData({ ...jobData, [name]: value });
  };

  const handleFileChange = (e) => {
    setJobData({ ...jobData, file: e.target.files[0] });
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleClearFilters = () => {
    setFilters({
      date: "",
      location: "",
      minSalary: "",
      maxSalary: "",
      company: "",
      search: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", jobData.title);
    formData.append("description", jobData.description);
    formData.append("location", jobData.location);
    formData.append("salary", jobData.salary);
    formData.append("company", jobData.company);
    if (jobData.file) formData.append("file", jobData.file);

    if (editingJobId) {
      dispatch(updateJob({ id: editingJobId, jobData: formData })).then(() => handleClose());
    } else {
      dispatch(createJob(formData)).then(() => handleClose());
    }
  };

  const handleEditClick = (job) => {
    setEditingJobId(job._id);
    setJobData({
      title: job.title,
      description: job.description,
      location: job.location,
      salary: job.salary,
      company: job.company?._id || "",
      file: null,
    });
    setOpenModal(true);
  };

  const handleDeleteClick = async (id) => {
    try {
      await dispatch(deleteJob(id));
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  const handleClose = () => {
    setOpenModal(false);
    setEditingJobId(null);
    setJobData({
      title: "",
      description: "",
      location: "",
      salary: "",
      company: "",
      file: null,
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Job Management
      </Typography>

      {/* Filter Fields */}
      <Grid container spacing={2}>
        {/* <Grid item xs={12} md={3}>
          <TextField fullWidth type="date" label="" name="date" value={filters.date} onChange={handleFilterChange} />
        </Grid> */}
        <Grid item xs={12} md={3}>
          <TextField fullWidth label="Location" name="location" value={filters.location} onChange={handleFilterChange} />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField fullWidth label="Min Salary" name="minSalary" type="number" value={filters.minSalary} onChange={handleFilterChange} />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField fullWidth label="Max Salary" name="maxSalary" type="number" value={filters.maxSalary} onChange={handleFilterChange} />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField fullWidth label="Company" name="company" value={filters.company} onChange={handleFilterChange} />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField fullWidth label="Search" name="search" value={filters.search} onChange={handleFilterChange} />
        </Grid>
        <Grid item xs={12} md={3}>
          <Button variant="outlined" onClick={handleClearFilters}>
            Clear Filters
          </Button>
        </Grid>
      </Grid>

      {/* Create Job Button */}
      <Button variant="contained" color="primary" onClick={() => setOpenModal(true)} style={{ marginTop: "16px" }}>
        Create Job
      </Button>

      {/* Job Listings Table */}
      <Typography variant="h6" style={{ marginTop: "16px" }}>
        Job Listings
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Salary</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>PDF</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jobs.map((job) => (
              <TableRow key={job._id}>
                <TableCell>{job.title}</TableCell>
                <TableCell>{job.location}</TableCell>
                <TableCell>{job.salary}</TableCell>
                <TableCell>{job.company?.name || "N/A"}</TableCell>
                <TableCell>
                  {job.descriptionPdfUrl ? (
                    <Button
                      component="a"
                      href={job.descriptionPdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      
                    >
                      <PictureAsPdfIcon />
                      
                    </Button>
                  ) : (
                    "N/A"
                  )}
                </TableCell>
                <TableCell>
                  <Button onClick={() => handleEditClick(job)} color="primary"><EditIcon /></Button>
                  <Button onClick={() => handleDeleteClick(job._id)} color="secondary"><DeleteIcon /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={jobs.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        style={{ marginTop: "16px" }}
      />

      {/* Job Modal */}
      <Modal open={openModal} onClose={handleClose} aria-labelledby="modal-title">
        <Paper style={{ margin: "auto", padding: "20px", maxWidth: 400, marginTop: "50px" }}>
          <Typography id="modal-title" variant="h6">
            {editingJobId ? "Edit Job" : "Create Job"}
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}><TextField fullWidth label="Title" name="title" value={jobData.title} onChange={handleInputChange} required /></Grid>
              <Grid item xs={12}><TextField fullWidth label="Description" name="description" value={jobData.description} onChange={handleInputChange} required multiline rows={4} /></Grid>
              <Grid item xs={12}><TextField fullWidth label="Location" name="location" value={jobData.location} onChange={handleInputChange} required /></Grid>
              <Grid item xs={12}><TextField fullWidth type="number" label="Salary" name="salary" value={jobData.salary} onChange={handleInputChange} required /></Grid>
              <Grid item xs={12}><TextField select fullWidth label="Company" name="company" value={jobData.company} onChange={handleInputChange} SelectProps={{ native: true }} required>
                <option value=""></option>
                {companies.map((company) => (<option key={company._id} value={company._id}>{company.name}</option>))}
              </TextField></Grid>
              <Grid item xs={12}><input type="file" onChange={handleFileChange} /></Grid>
            </Grid>
            <Button type="submit" variant="contained" color="primary" style={{ marginTop: "16px" }}>
              {editingJobId ? "Update" : "Create"}
            </Button>
          </form>
        </Paper>
      </Modal>
    </Container>
  );
};

export default JobPage;
