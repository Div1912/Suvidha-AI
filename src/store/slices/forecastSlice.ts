/**
 * Suvidha AI - Forecast Slice
 * 
 * ML prediction state from SageMaker LSTM
 * Shows warning if insufficient history
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ForecastResult } from '@types/index';

interface ForecastState {
    forecast: ForecastResult | null;
    isLoading: boolean;
    error: string | null;
    hasInsufficientData: boolean;
    minimumDaysRequired: number;
    currentDays: number;
}

const initialState: ForecastState = {
    forecast: null,
    isLoading: false,
    error: null,
    hasInsufficientData: false,
    minimumDaysRequired: 7,
    currentDays: 0,
};

const forecastSlice = createSlice({
    name: 'forecast',
    initialState,
    reducers: {
        setForecast: (state, action: PayloadAction<ForecastResult>) => {
            state.forecast = action.payload;
            state.hasInsufficientData = false;
            state.error = null;
        },
        setInsufficientData: (state, action: PayloadAction<{ currentDays: number; minimumDaysRequired: number }>) => {
            state.hasInsufficientData = true;
            state.currentDays = action.payload.currentDays;
            state.minimumDaysRequired = action.payload.minimumDaysRequired;
            state.forecast = null;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        clearForecast: (state) => {
            state.forecast = null;
            state.error = null;
            state.hasInsufficientData = false;
        },
    },
});

export const {
    setForecast,
    setInsufficientData,
    setLoading,
    setError,
    clearForecast,
} = forecastSlice.actions;

export default forecastSlice.reducer;
