/**
 * Suvidha AI - Card Component (Glassmorphism)
 * 
 * Modern cards with frosted glass effect,
 * subtle border glow, and depth.
 */

import React, { useCallback } from 'react';
import { View, StyleSheet, ViewStyle, TouchableOpacity } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
} from 'react-native-reanimated';
import { colors } from '@theme/colors';
import { spacing, borderRadius } from '@theme/spacing';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

interface CardProps {
    children: React.ReactNode;
    variant?: 'default' | 'elevated' | 'outlined' | 'glass' | 'success' | 'error' | 'warning';
    padding?: 'none' | 'sm' | 'md' | 'lg';
    onPress?: () => void;
    style?: ViewStyle;
}

export const Card: React.FC<CardProps> = ({
    children,
    variant = 'default',
    padding = 'md',
    onPress,
    style,
}) => {
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    const handlePressIn = useCallback(() => {
        if (onPress) {
            scale.value = withSpring(0.985, { damping: 15, stiffness: 400 });
        }
    }, [onPress, scale]);

    const handlePressOut = useCallback(() => {
        if (onPress) {
            scale.value = withSpring(1, { damping: 15, stiffness: 400 });
        }
    }, [onPress, scale]);

    const getVariantStyles = (): ViewStyle => {
        switch (variant) {
            case 'elevated':
                return {
                    backgroundColor: colors.neutral.surfaceElevated,
                    borderWidth: 1,
                    borderColor: colors.neutral.glassBorder,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 8 },
                    shadowOpacity: 0.25,
                    shadowRadius: 16,
                    elevation: 8,
                };
            case 'glass':
                return {
                    backgroundColor: colors.neutral.glass,
                    borderWidth: 1,
                    borderColor: colors.neutral.glassBorder,
                };
            case 'outlined':
                return {
                    backgroundColor: 'transparent',
                    borderWidth: 1,
                    borderColor: colors.neutral.border,
                };
            case 'success':
                return {
                    backgroundColor: colors.success.background,
                    borderWidth: 1,
                    borderColor: `${colors.success.main}40`,
                };
            case 'error':
                return {
                    backgroundColor: colors.error.background,
                    borderWidth: 1,
                    borderColor: `${colors.error.main}40`,
                };
            case 'warning':
                return {
                    backgroundColor: colors.warning.background,
                    borderWidth: 1,
                    borderColor: `${colors.warning.main}40`,
                };
            default:
                return {
                    backgroundColor: colors.neutral.surface,
                    borderWidth: 1,
                    borderColor: colors.neutral.glassBorder,
                };
        }
    };

    const getPadding = (): number => {
        switch (padding) {
            case 'none': return 0;
            case 'sm': return spacing.sm;
            case 'lg': return spacing.lg;
            default: return spacing.base;
        }
    };

    const cardStyle = [
        styles.base,
        getVariantStyles(),
        { padding: getPadding() },
        style,
    ];

    if (onPress) {
        return (
            <AnimatedTouchable
                activeOpacity={0.85}
                onPress={onPress}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                style={[animatedStyle, ...cardStyle]}
            >
                {children}
            </AnimatedTouchable>
        );
    }

    return <Animated.View style={[animatedStyle, ...cardStyle]}>{children}</Animated.View>;
};

const styles = StyleSheet.create({
    base: {
        borderRadius: borderRadius.xl,
        overflow: 'hidden',
    },
});

export default Card;
