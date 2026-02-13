/**
 * Suvidha AI - Spacing & Layout System
 * 
 * Data-dense, utilitarian spacing for maximum information density.
 */

// Base spacing unit (4px)
const BASE = 4;

export const spacing = {
    none: 0,
    xs: BASE,           // 4px
    sm: BASE * 2,       // 8px
    md: BASE * 3,       // 12px
    base: BASE * 4,     // 16px
    lg: BASE * 5,       // 20px
    xl: BASE * 6,       // 24px
    '2xl': BASE * 8,    // 32px
    '3xl': BASE * 10,   // 40px
    '4xl': BASE * 12,   // 48px
} as const;

export const borderRadius = {
    none: 0,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
} as const;

export const shadows = {
    none: {
        shadowColor: 'transparent',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0,
        shadowRadius: 0,
        elevation: 0,
    },
    sm: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },
    md: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 4,
    },
    lg: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
} as const;

export const layout = {
    screenPadding: spacing.base,
    cardPadding: spacing.md,
    sectionGap: spacing.xl,
    itemGap: spacing.sm,
} as const;

export type Spacing = typeof spacing;
export type BorderRadius = typeof borderRadius;
