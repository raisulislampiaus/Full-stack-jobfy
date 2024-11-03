// src/redux/slices/authSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}/login`, credentials);
            return response.data; // Expecting { user, token }
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    return null;
});

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: JSON.parse(localStorage.getItem('user')) || null,
        token: localStorage.getItem('token') || null,
        role: JSON.parse(localStorage.getItem('user'))?.role || null,
        error: null,
        isLoading: false,
        isAuthenticated: !!localStorage.getItem('token'), // Check if user is logged in
    },
    reducers: {
        // You can add other synchronous reducers here if needed
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.role = action.payload.user.role; // Store the user's role
                state.isAuthenticated = true;

                // Store data in localStorage
                localStorage.setItem('user', JSON.stringify(action.payload.user));
                localStorage.setItem('token', action.payload.token);
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                state.token = null;
                state.role = null;
                state.isAuthenticated = false;

                // Clear data from localStorage
                localStorage.removeItem('user');
                localStorage.removeItem('token');
            });
    },
});

export default authSlice.reducer;
