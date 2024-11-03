import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utills/api';

export const fetchCompanies = createAsyncThunk('companies/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/companies/all');
    return response.data;
  } catch (error) {
    console.error("Fetch companies error:", error);
    return rejectWithValue(error.response?.data || "Failed to fetch companies");
  }
});

export const createCompany = createAsyncThunk('companies/create', async (companyData, { rejectWithValue }) => {
  try {
    const response = await api.post('/companies/create', companyData);
    return response.data;
  } catch (error) {
    console.error("Create company error:", error);
    return rejectWithValue(error.response?.data || "Failed to create company");
  }
});

export const updateCompany = createAsyncThunk('companies/update', async ({ id, companyData }, { rejectWithValue }) => {
  try {
    const response = await api.put(`/companies/${id}`, companyData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    console.error("Update company error:", error);
    return rejectWithValue(error.response?.data || "Failed to update company");
  }
});

export const deleteCompany = createAsyncThunk('companies/delete', async (id, { rejectWithValue }) => {
  try {
    await api.delete(`/companies/${id}`);
    return id;
  } catch (error) {
    console.error("Delete company error:", error);
    return rejectWithValue(error.response?.data || "Failed to delete company");
  }
});

const companySlice = createSlice({
  name: 'companies',
  initialState: { items: [], status: null, error: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanies.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchCompanies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(createCompany.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateCompany.fulfilled, (state, action) => {
        const index = state.items.findIndex((company) => company.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteCompany.fulfilled, (state, action) => {
        state.items = state.items.filter((company) => company.id !== action.payload);
      })
      .addMatcher(
        action => action.type.endsWith('/rejected'),
        (state, action) => {
          state.error = action.payload;
          state.status = 'failed';
        }
      );
  },
});

export default companySlice.reducer;
