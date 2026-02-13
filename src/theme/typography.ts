/**
 * Suvidha AI - Typography System
 * 
 * Uses system fonts for reliable rendering on all devices.
 * Platform-specific defaults ensure native feel.
 */

import { Platform, StyleSheet, TextStyle } from 'react-native';

// System font families — no custom fonts needed
export const fonts = {
    primary: {
        regular: Platform.select({ ios: 'System', android: 'Roboto' }) || 'System',
        medium: Platform.select({ ios: 'System', android: 'Roboto' }) || 'System',
        semibold: Platform.select({ ios: 'System', android: 'Roboto' }) || 'System',
        bold: Platform.select({ ios: 'System', android: 'Roboto' }) || 'System',
    },
    mono: {
        regular: Platform.select({ ios: 'Menlo', android: 'monospace' }) || 'monospace',
        medium: Platform.select({ ios: 'Menlo', android: 'monospace' }) || 'monospace',
    },
} as const;

// Font sizes
export const fontSizes = {
    xs: 11,
    sm: 13,
    base: 15,
    md: 16,
    lg: 18,
    xl: 22,
    '2xl': 26,
    '3xl': 32,
    '4xl': 40,
} as const;

// Line heights
export const lineHeights = {
    tight: 1.2,
    normal: 1.45,
    relaxed: 1.6,
} as const;

// Letter spacing
export const letterSpacing = {
    tight: -0.5,
    normal: 0,
    wide: 0.8,
    wider: 1.5,
} as const;

// Pre-defined text styles — uses fontWeight instead of custom fontFamily
export const typography = StyleSheet.create({
    // Headings
    h1: {
        fontSize: fontSizes['3xl'],
        lineHeight: fontSizes['3xl'] * lineHeights.tight,
        letterSpacing: letterSpacing.tight,
        fontWeight: '800',
    } as TextStyle,

    h2: {
        fontSize: fontSizes['2xl'],
        lineHeight: fontSizes['2xl'] * lineHeights.tight,
        letterSpacing: letterSpacing.tight,
        fontWeight: '700',
    } as TextStyle,

    h3: {
        fontSize: fontSizes.xl,
        lineHeight: fontSizes.xl * lineHeights.tight,
        fontWeight: '600',
    } as TextStyle,

    h4: {
        fontSize: fontSizes.lg,
        lineHeight: fontSizes.lg * lineHeights.normal,
        fontWeight: '600',
    } as TextStyle,

    // Body text
    body: {
        fontSize: fontSizes.base,
        lineHeight: fontSizes.base * lineHeights.normal,
        fontWeight: '400',
    } as TextStyle,

    bodySmall: {
        fontSize: fontSizes.sm,
        lineHeight: fontSizes.sm * lineHeights.normal,
        fontWeight: '400',
    } as TextStyle,

    // Captions and metadata
    caption: {
        fontSize: fontSizes.xs,
        lineHeight: fontSizes.xs * lineHeights.normal,
        fontWeight: '400',
    } as TextStyle,

    // Labels
    label: {
        fontSize: fontSizes.sm,
        lineHeight: fontSizes.sm * lineHeights.normal,
        letterSpacing: letterSpacing.wider,
        fontWeight: '600',
        textTransform: 'uppercase',
    } as TextStyle,

    // Numbers (earnings, stats)
    number: {
        fontSize: fontSizes.lg,
        lineHeight: fontSizes.lg * lineHeights.tight,
        fontWeight: '700',
        fontVariant: ['tabular-nums'],
    } as TextStyle,

    numberLarge: {
        fontSize: fontSizes['3xl'],
        lineHeight: fontSizes['3xl'] * lineHeights.tight,
        fontWeight: '800',
        fontVariant: ['tabular-nums'],
    } as TextStyle,

    // Currency
    currency: {
        fontSize: fontSizes.xl,
        lineHeight: fontSizes.xl * lineHeights.tight,
        fontWeight: '700',
        fontVariant: ['tabular-nums'],
    } as TextStyle,

    // Monospace (IDs, hashes)
    mono: {
        fontFamily: Platform.select({ ios: 'Menlo', android: 'monospace' }) || 'monospace',
        fontSize: fontSizes.sm,
        lineHeight: fontSizes.sm * lineHeights.normal,
        fontWeight: '400',
    } as TextStyle,

    monoSmall: {
        fontFamily: Platform.select({ ios: 'Menlo', android: 'monospace' }) || 'monospace',
        fontSize: fontSizes.xs,
        lineHeight: fontSizes.xs * lineHeights.normal,
        fontWeight: '400',
    } as TextStyle,

    // Button text
    button: {
        fontSize: fontSizes.base,
        lineHeight: fontSizes.base * lineHeights.tight,
        letterSpacing: letterSpacing.wide,
        fontWeight: '700',
    } as TextStyle,

    buttonSmall: {
        fontSize: fontSizes.sm,
        lineHeight: fontSizes.sm * lineHeights.tight,
        letterSpacing: letterSpacing.wide,
        fontWeight: '600',
    } as TextStyle,
});

export type Typography = typeof typography;
