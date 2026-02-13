/**
 * Suvidha AI - Onboarding Navigator
 * 
 * First-time user explanation flow
 */

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { OnboardingStackParamList } from './types';

// Screens
import TruthLensIntroScreen from '@screens/onboarding/TruthLensIntroScreen';
import ForecastIntroScreen from '@screens/onboarding/ForecastIntroScreen';
import BiasIntroScreen from '@screens/onboarding/BiasIntroScreen';
import CollectiveIntroScreen from '@screens/onboarding/CollectiveIntroScreen';

const Stack = createStackNavigator<OnboardingStackParamList>();

export const OnboardingNavigator: React.FC = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                cardStyle: { backgroundColor: '#0F0F0F' },
            }}
        >
            <Stack.Screen name="TruthLensIntro" component={TruthLensIntroScreen} />
            <Stack.Screen name="ForecastIntro" component={ForecastIntroScreen} />
            <Stack.Screen name="BiasIntro" component={BiasIntroScreen} />
            <Stack.Screen name="CollectiveIntro" component={CollectiveIntroScreen} />
        </Stack.Navigator>
    );
};

export default OnboardingNavigator;
