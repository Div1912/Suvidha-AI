/**
 * Suvidha AI - Earnings Slice
 * 
 * Real-time earnings data state
 * NO fake data - only real values from API
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EarningsData, TodayEarnings, OrderAnalysis } from '@types/index';

interface EarningsState {
    todayEarnings: TodayEarnings | null;
    history: EarningsData[];
    orderAnalyses: OrderAnalysis[];
    latestAnalysis: OrderAnalysis | null;
    isLoading: boolean;
    error: string | null;
    lastUpdated: string | null;
}

const initialState: EarningsState = {
    todayEarnings: null,
    history: [],
    orderAnalyses: [],
    latestAnalysis: null,
    isLoading: false,
    error: null,
    lastUpdated: null,
};

const earningsSlice = createSlice({
    name: 'earnings',
    initialState,
    reducers: {
        setTodayEarnings: (state, action: PayloadAction<TodayEarnings>) => {
            state.todayEarnings = action.payload;
            state.lastUpdated = new Date().toISOString();
            state.error = null;
        },
        updateTodayEarnings: (state, action: PayloadAction<Partial<TodayEarnings>>) => {
            if (state.todayEarnings) {
                state.todayEarnings = { ...state.todayEarnings, ...action.payload };
                state.lastUpdated = new Date().toISOString();
            }
        },
        setHistory: (state, action: PayloadAction<EarningsData[]>) => {
            state.history = action.payload;
            state.error = null;
        },
        addOrderAnalysis: (state, action: PayloadAction<OrderAnalysis>) => {
            state.orderAnalyses.unshift(action.payload);
            state.latestAnalysis = action.payload;
            // Keep only last 50 analyses
            if (state.orderAnalyses.length > 50) {
                state.orderAnalyses = state.orderAnalyses.slice(0, 50);
            }
        },
        clearLatestAnalysis: (state) => {
            state.latestAnalysis = null;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        clearEarnings: (state) => {
            state.todayEarnings = null;
            state.history = [];
            state.orderAnalyses = [];
            state.latestAnalysis = null;
            state.error = null;
            state.lastUpdated = null;
        },
    },
});

export const {
    setTodayEarnings,
    updateTodayEarnings,
    setHistory,
    addOrderAnalysis,
    clearLatestAnalysis,
    setLoading,
    setError,
    clearEarnings,
} = earningsSlice.actions;

export default earningsSlice.reducer;
