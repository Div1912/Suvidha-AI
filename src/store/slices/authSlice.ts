/**
 * Suvidha AI - Auth Slice
 * 
 * Authentication state management
 * JWT tokens, phone OTP flow
 */

import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AuthState } from '@types/index';
import EncryptedStorage from 'react-native-encrypted-storage';

const initialState: AuthState = {
    isAuthenticated: false,
    isLoading: false,
    token: null,
    refreshToken: null,
    error: null,
    phone: null,
};

// Async thunks
export const initializeAuth = createAsyncThunk(
    'auth/initialize',
    async (_, { rejectWithValue }) => {
        try {
            const token = await EncryptedStorage.getItem('auth_token');
            const refreshToken = await EncryptedStorage.getItem('refresh_token');
            const phone = await EncryptedStorage.getItem('user_phone');

            if (token) {
                return { token, refreshToken, phone };
            }
            return null;
        } catch (error) {
            return rejectWithValue('Failed to initialize auth');
        }
    }
);

export const logout = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            await EncryptedStorage.removeItem('auth_token');
            await EncryptedStorage.removeItem('refresh_token');
            await EncryptedStorage.removeItem('user_phone');
            return true;
        } catch (error) {
            return rejectWithValue('Failed to logout');
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setPhone: (state, action: PayloadAction<string>) => {
            state.phone = action.payload;
        },
        setAuthTokens: (state, action: PayloadAction<{ token: string; refreshToken: string }>) => {
            state.token = action.payload.token;
            state.refreshToken = action.payload.refreshToken;
            state.isAuthenticated = true;
            state.error = null;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        clearError: (state) => {
            state.error = null;
        },
        resetAuth: (state) => {
            state.isAuthenticated = false;
            state.token = null;
            state.refreshToken = null;
            state.phone = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(initializeAuth.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(initializeAuth.fulfilled, (state, action) => {
                state.isLoading = false;
                if (action.payload) {
                    state.isAuthenticated = true;
                    state.token = action.payload.token;
                    state.refreshToken = action.payload.refreshToken;
                    state.phone = action.payload.phone;
                }
            })
            .addCase(initializeAuth.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            .addCase(logout.fulfilled, (state) => {
                state.isAuthenticated = false;
                state.token = null;
                state.refreshToken = null;
                state.phone = null;
                state.error = null;
            });
    },
});

export const {
    setLoading,
    setPhone,
    setAuthTokens,
    setError,
    clearError,
    resetAuth
} = authSlice.actions;

export default authSlice.reducer;
