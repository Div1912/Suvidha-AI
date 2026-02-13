/**
 * Suvidha AI - Navigation Types
 */

import { NavigatorScreenParams } from '@react-navigation/native';

// Auth Stack
export type AuthStackParamList = {
    Phone: undefined;
    OTP: { phone: string };
    Demo: undefined;
};

// Onboarding Stack
export type OnboardingStackParamList = {
    TruthLensIntro: undefined;
    ForecastIntro: undefined;
    BiasIntro: undefined;
    CollectiveIntro: undefined;
};

// Main Tab Navigator
export type MainTabParamList = {
    HomeTab: undefined;
    ForecastTab: undefined;
    BiasTab: undefined;
    UniteTab: undefined;
    ProfileTab: undefined;
};

// Home Stack
export type HomeStackParamList = {
    Home: undefined;
    TruthLens: undefined;
    OrderHistory: undefined;
};

// Root Navigator
export type RootStackParamList = {
    Auth: NavigatorScreenParams<AuthStackParamList>;
    Onboarding: NavigatorScreenParams<OnboardingStackParamList>;
    Main: NavigatorScreenParams<MainTabParamList>;
};

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList { }
    }
}
