/**
 * Suvidha AI - Strikes Slice
 * 
 * Collective action campaigns state
 * Real counts, real timers
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Strike, StrikeParticipation } from '@types/index';

interface StrikesState {
    strikes: Strike[];
    participations: StrikeParticipation[];
    activeStrikeId: string | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: StrikesState = {
    strikes: [],
    participations: [],
    activeStrikeId: null,
    isLoading: false,
    error: null,
};

const strikesSlice = createSlice({
    name: 'strikes',
    initialState,
    reducers: {
        setStrikes: (state, action: PayloadAction<Strike[]>) => {
            state.strikes = action.payload;
            state.error = null;
        },
        addStrike: (state, action: PayloadAction<Strike>) => {
            state.strikes.unshift(action.payload);
        },
        updateStrike: (state, action: PayloadAction<Strike>) => {
            const index = state.strikes.findIndex(s => s.id === action.payload.id);
            if (index !== -1) {
                state.strikes[index] = action.payload;
            }
        },
        updateParticipantCount: (state, action: PayloadAction<{ strikeId: string; count: number }>) => {
            const strike = state.strikes.find(s => s.id === action.payload.strikeId);
            if (strike) {
                strike.participants = action.payload.count;
            }
        },
        joinStrike: (state, action: PayloadAction<StrikeParticipation>) => {
            state.participations.push(action.payload);
            const strike = state.strikes.find(s => s.id === action.payload.strikeId);
            if (strike) {
                strike.participants += 1;
            }
        },
        leaveStrike: (state, action: PayloadAction<string>) => {
            const index = state.participations.findIndex(p => p.strikeId === action.payload);
            if (index !== -1) {
                state.participations[index].status = 'left';
            }
            const strike = state.strikes.find(s => s.id === action.payload);
            if (strike && strike.participants > 0) {
                strike.participants -= 1;
            }
        },
        setActiveStrike: (state, action: PayloadAction<string | null>) => {
            state.activeStrikeId = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        clearStrikes: (state) => {
            state.strikes = [];
            state.participations = [];
            state.activeStrikeId = null;
            state.error = null;
        },
    },
});

export const {
    setStrikes,
    addStrike,
    updateStrike,
    updateParticipantCount,
    joinStrike,
    leaveStrike,
    setActiveStrike,
    setLoading,
    setError,
    clearStrikes,
} = strikesSlice.actions;

export default strikesSlice.reducer;
