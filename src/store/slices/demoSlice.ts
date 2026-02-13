/**
 * Suvidha AI - Demo Slice (ISOLATED)
 * 
 * Demo mode state - COMPLETELY ISOLATED from real slices
 * Uses static JSON datasets
 * Never touches Bedrock, SageMaker, or QLDB
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DemoState } from '@types/index';

const initialState: DemoState = {
    isActive: false,
    worker: null,
    todayEarnings: null,
    earnings: [],
    forecast: null,
    bias: null,
    strikes: [],
    orderAnalyses: [],
};

// Demo data - Static JSON (NOT real API calls)
export const DEMO_DATA = {
    worker: {
        id: 'demo-worker-001',
        phone: '+91 98765 43210',
        name: 'Demo User',
        platform: 'swiggy' as const,
        verificationStatus: 'verified' as const,
        passportHash: 'demo-hash-abc123xyz',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-15T00:00:00Z',
    },
    todayEarnings: {
        earnings: 847,
        orders: 12,
        hoursActive: 6.5,
        avgPerHour: 130.31,
        lastUpdated: new Date().toISOString(),
    },
    earnings: [
        { date: '2024-01-15', totalEarnings: 847, ordersCompleted: 12, hoursWorked: 6.5, avgPerHour: 130.31, avgPerOrder: 70.58 },
        { date: '2024-01-14', totalEarnings: 923, ordersCompleted: 14, hoursWorked: 7.0, avgPerHour: 131.86, avgPerOrder: 65.93 },
        { date: '2024-01-13', totalEarnings: 756, ordersCompleted: 10, hoursWorked: 5.5, avgPerHour: 137.45, avgPerOrder: 75.60 },
        { date: '2024-01-12', totalEarnings: 1102, ordersCompleted: 16, hoursWorked: 8.0, avgPerHour: 137.75, avgPerOrder: 68.88 },
        { date: '2024-01-11', totalEarnings: 689, ordersCompleted: 9, hoursWorked: 5.0, avgPerHour: 137.80, avgPerOrder: 76.56 },
        { date: '2024-01-10', totalEarnings: 945, ordersCompleted: 13, hoursWorked: 7.0, avgPerHour: 135.00, avgPerOrder: 72.69 },
        { date: '2024-01-09', totalEarnings: 812, ordersCompleted: 11, hoursWorked: 6.0, avgPerHour: 135.33, avgPerOrder: 73.82 },
    ],
    forecast: {
        predictions: [
            { date: '2024-01-16', predicted: 865, confidenceLow: 720, confidenceHigh: 1010 },
            { date: '2024-01-17', predicted: 890, confidenceLow: 740, confidenceHigh: 1040 },
            { date: '2024-01-18', predicted: 920, confidenceLow: 765, confidenceHigh: 1075 },
            { date: '2024-01-19', predicted: 1050, confidenceLow: 875, confidenceHigh: 1225 },
            { date: '2024-01-20', predicted: 1120, confidenceLow: 935, confidenceHigh: 1305 },
            { date: '2024-01-21', predicted: 1080, confidenceLow: 900, confidenceHigh: 1260 },
            { date: '2024-01-22', predicted: 875, confidenceLow: 730, confidenceHigh: 1020 },
        ],
        weeklyTotal: 6800,
        weeklyConfidenceLow: 5665,
        weeklyConfidenceHigh: 7935,
        lastUpdated: new Date().toISOString(),
        dataPointsUsed: 30,
    },
    bias: {
        score: 0.15,
        status: 'fair' as const,
        peerComparison: {
            yourAvg: 135.50,
            peerAvg: 132.20,
            difference: 3.30,
        },
        factors: [
            { name: 'Distance ratio', impact: 'positive' as const, description: 'Your distance-to-earnings ratio is 8% better than average' },
            { name: 'Peak hours', impact: 'neutral' as const, description: 'You work similar peak hours as your peers' },
            { name: 'Order allocation', impact: 'positive' as const, description: 'Order allocation appears fair based on your location patterns' },
        ],
        lastUpdated: new Date().toISOString(),
        ordersAnalyzed: 156,
    },
    strikes: [
        {
            id: 'demo-strike-001',
            title: 'Fair Pay Campaign',
            description: 'Demanding minimum ₹15/km for all deliveries under Section 13(3)(a) of the Social Security Code.',
            platform: 'all' as const,
            status: 'active' as const,
            startTime: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
            endTime: new Date(Date.now() + 22 * 60 * 60 * 1000).toISOString(),
            participants: 2847,
            targetParticipants: 5000,
            region: 'Bangalore',
            createdBy: 'Karnataka Gig Workers Union',
        },
    ],
    orderAnalyses: [
        {
            id: 'demo-analysis-001',
            platform: 'swiggy' as const,
            platformOffer: 45,
            distance: 3.2,
            estimatedTime: 18,
            fuelCost: 8,
            netEarnings: 37,
            verdict: 'decline' as const,
            verdictReason: 'Low pay (₹11/km). Below your threshold of ₹15/km.',
            timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
            analyzed: true,
        },
        {
            id: 'demo-analysis-002',
            platform: 'zomato' as const,
            platformOffer: 92,
            distance: 5.5,
            estimatedTime: 35,
            fuelCost: 14,
            netEarnings: 78,
            verdict: 'accept' as const,
            verdictReason: 'Excellent pay (₹14/km). High probability of tip.',
            timestamp: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
            analyzed: true,
        },
    ],
};

const demoSlice = createSlice({
    name: 'demo',
    initialState,
    reducers: {
        activateDemo: (state) => {
            state.isActive = true;
            state.worker = DEMO_DATA.worker;
            state.todayEarnings = DEMO_DATA.todayEarnings;
            state.earnings = DEMO_DATA.earnings;
            state.forecast = DEMO_DATA.forecast;
            state.bias = DEMO_DATA.bias;
            state.strikes = DEMO_DATA.strikes;
            state.orderAnalyses = DEMO_DATA.orderAnalyses;
        },
        deactivateDemo: (state) => {
            state.isActive = false;
            state.worker = null;
            state.todayEarnings = null;
            state.earnings = [];
            state.forecast = null;
            state.bias = null;
            state.strikes = [];
            state.orderAnalyses = [];
        },
    },
});

export const { activateDemo, deactivateDemo } = demoSlice.actions;
export default demoSlice.reducer;
