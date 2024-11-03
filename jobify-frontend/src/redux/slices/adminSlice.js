import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utills/api';

export const fetchAdmins = createAsyncThunk('admins/fetchAll', async () => {
  const response = await api.get('/admins');
  return response.data;
});

export const createAdmin = createAsyncThunk('admins/create', async (adminData) => {
  const response = await api.post('/admins/create', adminData);
  return response.data;
});

export const updateAdmin = createAsyncThunk('admins/update', async ({ id, adminData }) => {
  const response = await api.put(`/admins/${id}`, adminData);
  return response.data;
});

export const deleteAdmin = createAsyncThunk('admins/delete', async (id) => {
  await api.delete(`/admins/${id}`);
  return id;
});

const adminSlice = createSlice({
  name: 'admins',
  initialState: { items: [], status: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdmins.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAdmins.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchAdmins.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(createAdmin.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateAdmin.fulfilled, (state, action) => {
        const index = state.items.findIndex((admin) => admin._id === action.payload._id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteAdmin.fulfilled, (state, action) => {
        state.items = state.items.filter((admin) => admin._id !== action.payload);
      });
  },
});

export default adminSlice.reducer;
