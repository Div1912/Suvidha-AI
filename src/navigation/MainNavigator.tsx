/**
 * Suvidha AI - Main Tab Navigator
 * 
 * Bottom navigation: Home | Forecast | Bias | Unite | Profile
 * No center-icon gimmicks. No floating nav experiments.
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from './types';
import { colors } from '@theme/colors';
import { fonts } from '@theme/typography';
import { spacing } from '@theme/spacing';
import { useAppSelector } from '@store/index';
import { DemoBadge } from '@components/ui';

// Icons
import {
    HomeIcon,
    ForecastIcon,
    BiasIcon,
    UniteIcon,
    ProfileIcon,
} from '@components/ui/Icons';

// Screens
import HomeScreen from '@screens/home/HomeScreen';
import ForecastScreen from '@screens/forecast/ForecastScreen';
import BiasScreen from '@screens/bias/BiasScreen';
import UniteScreen from '@screens/unite/UniteScreen';
import ProfileScreen from '@screens/profile/ProfileScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();

const TabIcon = ({
    Icon,
    focused
}: {
    Icon: React.FC<{ size: number; color: string }>;
    focused: boolean;
}) => (
    <Icon
        size={24}
        color={focused ? colors.primary.main : colors.neutral.textSecondary}
    />
);

export const MainNavigator: React.FC = () => {
    const isDemo = useAppSelector((state) => state.demo.isActive);

    return (
        <View style={styles.container}>
            {isDemo && <DemoBadge variant="fixed" />}
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarStyle: styles.tabBar,
                    tabBarActiveTintColor: colors.primary.main,
                    tabBarInactiveTintColor: colors.neutral.textSecondary,
                    tabBarLabelStyle: styles.tabLabel,
                }}
            >
                <Tab.Screen
                    name="HomeTab"
                    component={HomeScreen}
                    options={{
                        tabBarLabel: 'Home',
                        tabBarIcon: ({ focused }) => (
                            <TabIcon Icon={HomeIcon} focused={focused} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="ForecastTab"
                    component={ForecastScreen}
                    options={{
                        tabBarLabel: 'Forecast',
                        tabBarIcon: ({ focused }) => (
                            <TabIcon Icon={ForecastIcon} focused={focused} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="BiasTab"
                    component={BiasScreen}
                    options={{
                        tabBarLabel: 'Bias',
                        tabBarIcon: ({ focused }) => (
                            <TabIcon Icon={BiasIcon} focused={focused} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="UniteTab"
                    component={UniteScreen}
                    options={{
                        tabBarLabel: 'Unite',
                        tabBarIcon: ({ focused }) => (
                            <TabIcon Icon={UniteIcon} focused={focused} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="ProfileTab"
                    component={ProfileScreen}
                    options={{
                        tabBarLabel: 'Profile',
                        tabBarIcon: ({ focused }) => (
                            <TabIcon Icon={ProfileIcon} focused={focused} />
                        ),
                    }}
                />
            </Tab.Navigator>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.neutral.background,
    },
    tabBar: {
        backgroundColor: colors.neutral.surface,
        borderTopColor: colors.neutral.border,
        borderTopWidth: 1,
        height: 60,
        paddingTop: spacing.xs,
        paddingBottom: spacing.sm,
    },
    tabLabel: {
        fontFamily: fonts.primary.medium,
        fontSize: 11,
    },
});

export default MainNavigator;
