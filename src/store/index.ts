/**
 * Suvidha AI - Redux Store
 * 
 * Central store configuration with strict slice separation
 */

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

// Import slices
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';
import earningsReducer from './slices/earningsSlice';
import forecastReducer from './slices/forecastSlice';
import biasReducer from './slices/biasSlice';
import strikesReducer from './slices/strikesSlice';
import demoReducer from './slices/demoSlice';

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    earnings: earningsReducer,
    forecast: forecastReducer,
    bias: biasReducer,
    strikes: strikesReducer,
    demo: demoReducer, // ISOLATED - never touches real reducers
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore these paths in the state
                ignoredActions: ['auth/setAuthTokens'],
            },
        }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Typed hooks
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
