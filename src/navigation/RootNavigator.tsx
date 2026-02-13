/**
 * Suvidha AI - Root Navigator
 * 
 * Controls auth flow: Auth → Onboarding → Main
 * Demo mode skips onboarding and goes straight to Main.
 */

import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList } from './types';
import { useAppSelector, useAppDispatch } from '@store/index';
import { initializeAuth } from '@store/slices/authSlice';
import { LoadingState } from '@components/ui';

// Navigators
import AuthNavigator from './AuthNavigator';
import OnboardingNavigator from './OnboardingNavigator';
import MainNavigator from './MainNavigator';

const Stack = createStackNavigator<RootStackParamList>();

export const RootNavigator: React.FC = () => {
    const dispatch = useAppDispatch();
    const { isAuthenticated } = useAppSelector((state) => state.auth);
    const isDemo = useAppSelector((state) => state.demo.isActive);
    const [hasSeenOnboarding, setHasSeenOnboarding] = useState<boolean>(false);
    const [isInitializing, setIsInitializing] = useState(true);

    useEffect(() => {
        const initialize = async () => {
            try {
                // Check auth state
                await dispatch(initializeAuth());

                // Check onboarding state
                const onboardingComplete = await AsyncStorage.getItem('onboarding_complete');
                setHasSeenOnboarding(onboardingComplete === 'true');
            } catch (error) {
                console.error('Initialization error:', error);
            } finally {
                setIsInitializing(false);
            }
        };

        initialize();
    }, [dispatch]);

    if (isInitializing) {
        return <LoadingState message="Starting Suvidha AI..." />;
    }

    // Demo mode ALWAYS goes straight to Main — skip onboarding
    const isLoggedIn = isAuthenticated || isDemo;
    const shouldShowOnboarding = isLoggedIn && !isDemo && !hasSeenOnboarding;
    const shouldShowMain = isLoggedIn && (isDemo || hasSeenOnboarding);

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    cardStyle: { backgroundColor: '#0A0E1A' },
                    animationEnabled: true,
                    cardStyleInterpolator: ({ current }) => ({
                        cardStyle: {
                            opacity: current.progress,
                        },
                    }),
                }}
            >
                {!isLoggedIn ? (
                    <Stack.Screen name="Auth" component={AuthNavigator} />
                ) : shouldShowOnboarding ? (
                    <Stack.Screen name="Onboarding" component={OnboardingNavigator} />
                ) : (
                    <Stack.Screen name="Main" component={MainNavigator} />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default RootNavigator;
