/**
 * Suvidha AI - Types
 * 
 * Core type definitions for the application
 */

// User Types
export interface Worker {
    id: string;
    phone: string;
    name?: string;
    platform: PlatformType;
    profileImage?: string;
    passportHash?: string;
    verificationStatus: 'pending' | 'verified' | 'unverified';
    createdAt: string;
    updatedAt: string;
}

export type PlatformType = 'swiggy' | 'zomato' | 'uber' | 'ola' | 'other';

// Earnings Types
export interface EarningsData {
    date: string;
    totalEarnings: number;
    ordersCompleted: number;
    hoursWorked: number;
    avgPerHour: number;
    avgPerOrder: number;
}

export interface TodayEarnings {
    earnings: number;
    orders: number;
    hoursActive: number;
    avgPerHour: number;
    lastUpdated: string;
}

// Order Analysis (Truth Lens)
export interface OrderAnalysis {
    id: string;
    platform: PlatformType;
    platformOffer: number;
    distance: number;
    estimatedTime: number;
    fuelCost: number;
    netEarnings: number;
    verdict: 'accept' | 'decline' | 'borderline';
    verdictReason: string;
    timestamp: string;
    analyzed: boolean;
}

// Forecast Types
export interface ForecastData {
    date: string;
    predicted: number;
    confidenceLow: number;
    confidenceHigh: number;
}

export interface ForecastResult {
    predictions: ForecastData[];
    weeklyTotal: number;
    weeklyConfidenceLow: number;
    weeklyConfidenceHigh: number;
    lastUpdated: string;
    dataPointsUsed: number;
}

// Bias Detection Types
export interface BiasResult {
    score: number; // -1 to 1, negative = unfair, positive = fair
    status: 'fair' | 'borderline' | 'unfair' | 'unknown';
    peerComparison: {
        yourAvg: number;
        peerAvg: number;
        difference: number;
    };
    factors: BiassFactor[];
    lastUpdated: string;
    ordersAnalyzed: number;
}

export interface BiassFactor {
    name: string;
    impact: 'positive' | 'negative' | 'neutral';
    description: string;
}

// Collective/Strike Types
export interface Strike {
    id: string;
    title: string;
    description: string;
    platform: PlatformType | 'all';
    status: 'active' | 'upcoming' | 'completed';
    startTime: string;
    endTime: string;
    participants: number;
    targetParticipants: number;
    region: string;
    createdBy: string;
}

export interface StrikeParticipation {
    strikeId: string;
    joinedAt: string;
    status: 'joined' | 'left';
}

// API Response Types
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}

// Auth Types
export interface AuthState {
    isAuthenticated: boolean;
    isLoading: boolean;
    token: string | null;
    refreshToken: string | null;
    error: string | null;
    phone: string | null;
}

// Demo Types
export interface DemoState {
    isActive: boolean;
    worker: Worker | null;
    todayEarnings: TodayEarnings | null;
    earnings: EarningsData[];
    forecast: ForecastResult | null;
    bias: BiasResult | null;
    strikes: Strike[];
    orderAnalyses: OrderAnalysis[];
}
