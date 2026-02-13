/**
 * Suvidha AI - Auth Navigator
 * 
 * Phone OTP authentication flow + Demo mode entry
 */

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthStackParamList } from './types';

// Screens
import PhoneScreen from '@screens/auth/PhoneScreen';
import OTPScreen from '@screens/auth/OTPScreen';

const Stack = createStackNavigator<AuthStackParamList>();

export const AuthNavigator: React.FC = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                cardStyle: { backgroundColor: '#0F0F0F' },
            }}
        >
            <Stack.Screen name="Phone" component={PhoneScreen} />
            <Stack.Screen name="OTP" component={OTPScreen} />
        </Stack.Navigator>
    );
};

export default AuthNavigator;
