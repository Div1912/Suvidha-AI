/**
 * Suvidha AI - Bias Slice
 * 
 * Anomaly detection state from Isolation Forest
 * Explicit "no bias detected" state
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BiasResult } from '@types/index';

interface BiasState {
    bias: BiasResult | null;
    isLoading: boolean;
    error: string | null;
    hasInsufficientData: boolean;
    minimumOrdersRequired: number;
    currentOrders: number;
}

const initialState: BiasState = {
    bias: null,
    isLoading: false,
    error: null,
    hasInsufficientData: false,
    minimumOrdersRequired: 20,
    currentOrders: 0,
};

const biasSlice = createSlice({
    name: 'bias',
    initialState,
    reducers: {
        setBias: (state, action: PayloadAction<BiasResult>) => {
            state.bias = action.payload;
            state.hasInsufficientData = false;
            state.error = null;
        },
        setInsufficientData: (state, action: PayloadAction<{ currentOrders: number; minimumOrdersRequired: number }>) => {
            state.hasInsufficientData = true;
            state.currentOrders = action.payload.currentOrders;
            state.minimumOrdersRequired = action.payload.minimumOrdersRequired;
            state.bias = null;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        clearBias: (state) => {
            state.bias = null;
            state.error = null;
            state.hasInsufficientData = false;
        },
    },
});

export const {
    setBias,
    setInsufficientData,
    setLoading,
    setError,
    clearBias,
} = biasSlice.actions;

export default biasSlice.reducer;
