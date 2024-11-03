// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import api from '../../utills/api';

// // Async thunk for fetching jobs with filters
// // export const fetchJobs = createAsyncThunk('jobs/fetchAll', async (filters) => {
// //   const response = await api.get('/jobs', { params: filters });
// //   return response.data;
// // });
// export const fetchJobs = createAsyncThunk('jobs/fetchAll', async (filters) => {
//   try {
//     // Making the API call with filters as query parameters
//     const response = await api.get('/jobs', { params: filters });
//     return response.data; // Return the data received from the response
//   } catch (error) {
//     // Handle any potential errors
//     throw new Error(error.response?.data?.message || 'Failed to fetch jobs');
//   }
// });

// // Async thunk for fetching companies
// export const fetchCompanies = createAsyncThunk('companies/fetchAll', async () => {
//   const response = await api.get('/companies');
//   return response.data;
// });

// // Async thunk for creating a new job
// export const createJob = createAsyncThunk('jobs/create', async (jobData) => {
//   const response = await api.post('/jobs/create', jobData);
//   return response.data;
// });

// // Async thunk for updating an existing job
// export const updateJob = createAsyncThunk('jobs/update', async ({ id, jobData }) => {
//   const response = await api.put(`/jobs/${id}`, jobData);
//   return response.data;
// });

// // Async thunk for deleting a job
// export const deleteJob = createAsyncThunk('jobs/delete', async (id) => {
//   await api.delete(`/jobs/${id}`);
//   return id;
// });

// // Create the job slice
// const jobSlice = createSlice({
//   name: 'jobs',
//   initialState: {
//     items: [],
//     companies: [], // Added to hold company data
//     status: null, // Tracks loading status: 'idle' | 'loading' | 'succeeded' | 'failed'
//     error: null, // Holds error messages
//   },
//   extraReducers: (builder) => {
//     builder
//       // Fetch jobs
//       .addCase(fetchJobs.pending, (state) => {
//         state.status = 'loading';
//         state.error = null; // Reset error state
//       })
//       .addCase(fetchJobs.fulfilled, (state, action) => {
//         state.items = action.payload;
//         state.status = 'succeeded';
//       })
//       .addCase(fetchJobs.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message; // Capture the error message
//       })
//       // Fetch companies
//       .addCase(fetchCompanies.pending, (state) => {
//         state.status = 'loading';
//         state.error = null; // Reset error state
//       })
//       .addCase(fetchCompanies.fulfilled, (state, action) => {
//         state.companies = action.payload; // Store fetched companies
//         state.status = 'succeeded';
//       })
//       .addCase(fetchCompanies.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message; // Capture the error message
//       })
//       // Create job
//       .addCase(createJob.pending, (state) => {
//         state.status = 'loading';
//         state.error = null; // Reset error state
//       })
//       .addCase(createJob.fulfilled, (state, action) => {
//         state.items.push(action.payload);
//         state.status = 'succeeded';
//       })
//       .addCase(createJob.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message; // Capture the error message
//       })
//       // Update job
//       .addCase(updateJob.pending, (state) => {
//         state.status = 'loading';
//         state.error = null; // Reset error state
//       })
//       .addCase(updateJob.fulfilled, (state, action) => {
//         const index = state.items.findIndex((job) => job.id === action.payload.id);
//         if (index !== -1) {
//           state.items[index] = action.payload;
//         }
//         state.status = 'succeeded';
//       })
//       .addCase(updateJob.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message; // Capture the error message
//       })
//       // Delete job
//       .addCase(deleteJob.pending, (state) => {
//         state.status = 'loading';
//         state.error = null; // Reset error state
//       })
//       .addCase(deleteJob.fulfilled, (state, action) => {
//         state.items = state.items.filter((job) => job.id !== action.payload);
//         state.status = 'succeeded';
//       })
//       .addCase(deleteJob.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message; // Capture the error message
//       });
//   },
// });

// // Export the actions and reducer to be used in the store
// export const { resetError } = jobSlice.actions;
// export default jobSlice.reducer;
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utills/api';

// Async thunk for fetching jobs with filters
export const fetchJobs = createAsyncThunk('jobs/fetchAll', async (filters, { rejectWithValue }) => {
  try {
    const response = await api.get('/jobs', { params: filters });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch jobs');
  }
});

// Async thunk for fetching companies
export const fetchCompanies = createAsyncThunk('companies/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/companies');
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch companies');
  }
});

// Async thunk for creating a new job
export const createJob = createAsyncThunk('jobs/create', async (jobData, { rejectWithValue }) => {
  try {
    const response = await api.post('/jobs/create', jobData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to create job');
  }
});

// Async thunk for updating an existing job
export const updateJob = createAsyncThunk('jobs/update', async ({ id, jobData }, { rejectWithValue }) => {
  try {
    const response = await api.put(`/jobs/${id}`, jobData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to update job');
  }
});

// Async thunk for deleting a job
export const deleteJob = createAsyncThunk('jobs/delete', async (id, { rejectWithValue }) => {
  try {
    await api.delete(`/jobs/${id}`);
    return id;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to delete job');
  }
});

// Create the job slice
const jobSlice = createSlice({
  name: 'jobs',
  initialState: {
    items: [],
    companies: [],
    status: 'idle', // Tracks loading status: 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    resetError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch jobs
      .addCase(fetchJobs.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Fetch companies
      .addCase(fetchCompanies.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCompanies.fulfilled, (state, action) => {
        state.companies = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchCompanies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Create job
      .addCase(createJob.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createJob.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.status = 'succeeded';
      })
      .addCase(createJob.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Update job
      .addCase(updateJob.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateJob.fulfilled, (state, action) => {
        const index = state.items.findIndex((job) => job._id === action.payload._id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        state.status = 'succeeded';
      })
      .addCase(updateJob.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Delete job
      .addCase(deleteJob.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(deleteJob.fulfilled, (state, action) => {
        state.items = state.items.filter((job) => job._id !== action.payload);
        state.status = 'succeeded';
      })
      .addCase(deleteJob.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

// Export the actions and reducer to be used in the store
export const { resetError } = jobSlice.actions;
export default jobSlice.reducer;
