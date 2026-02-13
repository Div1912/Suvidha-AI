/**
 * Suvidha AI - User Slice
 * 
 * User profile and worker identity state
 */

import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Worker } from '@types/index';

interface UserState {
    worker: Worker | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: UserState = {
    worker: null,
    isLoading: false,
    error: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setWorker: (state, action: PayloadAction<Worker>) => {
            state.worker = action.payload;
            state.error = null;
        },
        updateWorker: (state, action: PayloadAction<Partial<Worker>>) => {
            if (state.worker) {
                state.worker = { ...state.worker, ...action.payload };
            }
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        clearUser: (state) => {
            state.worker = null;
            state.error = null;
        },
    },
});

export const { setWorker, updateWorker, setLoading, setError, clearUser } = userSlice.actions;
export default userSlice.reducer;
