/**
 * Suvidha AI - Premium Button Component
 * 
 * Modern buttons with press animations, glow effects,
 * and smooth transitions.
 */

import React, { useCallback } from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    ViewStyle,
    ActivityIndicator,
    View,
} from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withTiming,
} from 'react-native-reanimated';
import { colors } from '@theme/colors';
import { spacing, borderRadius } from '@theme/spacing';
import { Text } from './Text';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
    title: string;
    onPress: () => void;
    variant?: ButtonVariant;
    size?: ButtonSize;
    disabled?: boolean;
    loading?: boolean;
    fullWidth?: boolean;
    icon?: React.ReactNode;
    iconPosition?: 'left' | 'right';
    style?: ViewStyle;
}

export const Button: React.FC<ButtonProps> = ({
    title,
    onPress,
    variant = 'primary',
    size = 'md',
    disabled = false,
    loading = false,
    fullWidth = false,
    icon,
    iconPosition = 'left',
    style,
}) => {
    const isDisabled = disabled || loading;
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    const handlePressIn = useCallback(() => {
        scale.value = withSpring(0.96, { damping: 15, stiffness: 400 });
    }, [scale]);

    const handlePressOut = useCallback(() => {
        scale.value = withSpring(1, { damping: 15, stiffness: 400 });
    }, [scale]);

    const getSizeStyles = (): ViewStyle => {
        switch (size) {
            case 'sm':
                return { paddingVertical: spacing.sm, paddingHorizontal: spacing.md, minHeight: 36 };
            case 'lg':
                return { paddingVertical: spacing.base, paddingHorizontal: spacing.xl, minHeight: 56 };
            default:
                return { paddingVertical: spacing.md, paddingHorizontal: spacing.lg, minHeight: 48 };
        }
    };

    const getVariantStyles = (): ViewStyle => {
        switch (variant) {
            case 'primary':
                return {
                    backgroundColor: colors.primary.main,
                    shadowColor: colors.primary.main,
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.35,
                    shadowRadius: 12,
                    elevation: 6,
                };
            case 'secondary':
                return {
                    backgroundColor: colors.neutral.surfaceElevated,
                    borderWidth: 1,
                    borderColor: colors.neutral.glassBorder,
                };
            case 'outline':
                return {
                    backgroundColor: 'transparent',
                    borderWidth: 1.5,
                    borderColor: colors.neutral.borderLight,
                };
            case 'ghost':
                return {
                    backgroundColor: 'transparent',
                };
            case 'danger':
                return {
                    backgroundColor: colors.error.main,
                    shadowColor: colors.error.main,
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.3,
                    shadowRadius: 12,
                    elevation: 6,
                };
            default:
                return {};
        }
    };

    const getTextColor = () => {
        if (isDisabled) return 'disabled';
        switch (variant) {
            case 'ghost':
                return 'primary';
            case 'outline':
                return 'default';
            default:
                return 'default';
        }
    };

    const renderContent = () => (
        <View style={styles.content}>
            {loading ? (
                <ActivityIndicator
                    color={variant === 'primary' ? '#FFFFFF' : colors.primary.main}
                    size="small"
                />
            ) : (
                <>
                    {icon && iconPosition === 'left' && (
                        <View style={styles.iconLeft}>{icon}</View>
                    )}
                    <Text
                        variant={size === 'sm' ? 'buttonSmall' : 'button'}
                        color={getTextColor()}
                    >
                        {title}
                    </Text>
                    {icon && iconPosition === 'right' && (
                        <View style={styles.iconRight}>{icon}</View>
                    )}
                </>
            )}
        </View>
    );

    return (
        <AnimatedTouchable
            onPress={onPress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            disabled={isDisabled}
            activeOpacity={0.85}
            style={[
                animatedStyle,
                styles.base,
                getSizeStyles(),
                getVariantStyles(),
                isDisabled && styles.disabled,
                fullWidth && styles.fullWidth,
                style,
            ]}
        >
            {renderContent()}
        </AnimatedTouchable>
    );
};

const styles = StyleSheet.create({
    base: {
        borderRadius: borderRadius.lg,
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    disabled: {
        opacity: 0.45,
    },
    fullWidth: {
        width: '100%',
    },
    iconLeft: {
        marginRight: spacing.sm,
    },
    iconRight: {
        marginLeft: spacing.sm,
    },
});

export default Button;
