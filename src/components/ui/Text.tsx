/**
 * Suvidha AI - Text Component
 * 
 * Typography wrapper with pre-defined variants.
 * Uses Inter font family with semantic styling.
 */

import React from 'react';
import { Text as RNText, TextProps as RNTextProps, StyleSheet } from 'react-native';
import { colors } from '@theme/colors';
import { typography } from '@theme/typography';

export type TextVariant =
    | 'h1' | 'h2' | 'h3' | 'h4'
    | 'body' | 'bodySmall'
    | 'caption' | 'label'
    | 'number' | 'numberLarge' | 'currency'
    | 'mono' | 'monoSmall'
    | 'button' | 'buttonSmall';

export type TextColor =
    | 'default' | 'secondary' | 'tertiary' | 'disabled'
    | 'success' | 'error' | 'warning' | 'primary';

interface TextProps extends RNTextProps {
    variant?: TextVariant;
    color?: TextColor;
    align?: 'left' | 'center' | 'right';
    children: React.ReactNode;
}

const colorMap: Record<TextColor, string> = {
    default: colors.neutral.text,
    secondary: colors.neutral.textSecondary,
    tertiary: colors.neutral.textTertiary,
    disabled: colors.neutral.textDisabled,
    success: colors.success.main,
    error: colors.error.main,
    warning: colors.warning.main,
    primary: colors.primary.main,
};

export const Text: React.FC<TextProps> = ({
    variant = 'body',
    color = 'default',
    align = 'left',
    style,
    children,
    ...props
}) => {
    return (
        <RNText
            style={[
                typography[variant],
                { color: colorMap[color] },
                { textAlign: align },
                style,
            ]}
            {...props}
        >
            {children}
        </RNText>
    );
};

export default Text;
