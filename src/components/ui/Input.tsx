/**
 * Suvidha AI - Input Component
 * 
 * Phone number and OTP input fields.
 * Clean, functional design without decoration.
 */

import React, { useState, useRef } from 'react';
import {
    TextInput,
    View,
    StyleSheet,
    TextInputProps,
    ViewStyle,
    Pressable,
} from 'react-native';
import { colors } from '@theme/colors';
import { spacing, borderRadius } from '@theme/spacing';
import { typography, fonts } from '@theme/typography';
import { Text } from './Text';

interface InputProps extends Omit<TextInputProps, 'style'> {
    label?: string;
    error?: string;
    hint?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    containerStyle?: ViewStyle;
}

export const Input: React.FC<InputProps> = ({
    label,
    error,
    hint,
    leftIcon,
    rightIcon,
    containerStyle,
    ...props
}) => {
    const [isFocused, setIsFocused] = useState(false);

    const getBorderColor = () => {
        if (error) return colors.error.main;
        if (isFocused) return colors.primary.main;
        return colors.neutral.border;
    };

    return (
        <View style={containerStyle}>
            {label && (
                <Text variant="label" color="secondary" style={styles.label}>
                    {label}
                </Text>
            )}
            <View
                style={[
                    styles.inputContainer,
                    { borderColor: getBorderColor() },
                    isFocused && styles.inputFocused,
                    error && styles.inputError,
                ]}
            >
                {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
                <TextInput
                    style={[
                        styles.input,
                        leftIcon && styles.inputWithLeftIcon,
                        rightIcon && styles.inputWithRightIcon,
                    ]}
                    placeholderTextColor={colors.neutral.textTertiary}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    {...props}
                />
                {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
            </View>
            {error && (
                <Text variant="caption" color="error" style={styles.error}>
                    {error}
                </Text>
            )}
            {hint && !error && (
                <Text variant="caption" color="tertiary" style={styles.hint}>
                    {hint}
                </Text>
            )}
        </View>
    );
};

// OTP Input Component
interface OTPInputProps {
    length?: number;
    value: string;
    onChange: (value: string) => void;
    error?: string;
}

export const OTPInput: React.FC<OTPInputProps> = ({
    length = 6,
    value,
    onChange,
    error,
}) => {
    const inputRefs = useRef<TextInput[]>([]);

    const handleChange = (text: string, index: number) => {
        const newValue = value.split('');
        newValue[index] = text;
        const finalValue = newValue.join('').slice(0, length);
        onChange(finalValue);

        // Auto-focus next input
        if (text && index < length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyPress = (e: any, index: number) => {
        if (e.nativeEvent.key === 'Backspace' && !value[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    return (
        <View>
            <View style={styles.otpContainer}>
                {Array.from({ length }).map((_, index) => (
                    <TextInput
                        key={index}
                        ref={(ref) => {
                            if (ref) inputRefs.current[index] = ref;
                        }}
                        style={[
                            styles.otpInput,
                            value[index] && styles.otpInputFilled,
                            error && styles.otpInputError,
                        ]}
                        value={value[index] || ''}
                        onChangeText={(text) => handleChange(text, index)}
                        onKeyPress={(e) => handleKeyPress(e, index)}
                        keyboardType="number-pad"
                        maxLength={1}
                        selectTextOnFocus
                    />
                ))}
            </View>
            {error && (
                <Text variant="caption" color="error" style={styles.otpError}>
                    {error}
                </Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    label: {
        marginBottom: spacing.xs,
        textTransform: 'uppercase',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.neutral.surface,
        borderWidth: 1,
        borderColor: colors.neutral.border,
        borderRadius: borderRadius.md,
        paddingHorizontal: spacing.md,
    },
    inputFocused: {
        borderColor: colors.primary.main,
        backgroundColor: colors.neutral.surfaceElevated,
    },
    inputError: {
        borderColor: colors.error.main,
        backgroundColor: colors.error.background,
    },
    input: {
        flex: 1,
        paddingVertical: spacing.md,
        fontFamily: fonts.primary.regular,
        fontSize: 16,
        color: colors.neutral.text,
    },
    inputWithLeftIcon: {
        paddingLeft: spacing.sm,
    },
    inputWithRightIcon: {
        paddingRight: spacing.sm,
    },
    leftIcon: {
        marginRight: spacing.sm,
    },
    rightIcon: {
        marginLeft: spacing.sm,
    },
    error: {
        marginTop: spacing.xs,
    },
    hint: {
        marginTop: spacing.xs,
    },
    // OTP Styles
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: spacing.sm,
    },
    otpInput: {
        width: 48,
        height: 56,
        backgroundColor: colors.neutral.surface,
        borderWidth: 1,
        borderColor: colors.neutral.border,
        borderRadius: borderRadius.md,
        fontSize: 24,
        fontFamily: fonts.primary.semibold,
        color: colors.neutral.text,
        textAlign: 'center',
    },
    otpInputFilled: {
        borderColor: colors.primary.main,
        backgroundColor: colors.neutral.surfaceElevated,
    },
    otpInputError: {
        borderColor: colors.error.main,
        backgroundColor: colors.error.background,
    },
    otpError: {
        marginTop: spacing.sm,
        textAlign: 'center',
    },
});

export default Input;
