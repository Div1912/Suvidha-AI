/**
 * Suvidha AI - Modern Color System
 * 
 * Rich dark theme with deep blues, subtle gradients,
 * glassmorphism support, and vibrant accents.
 */

export const colors = {
    // Primary brand color
    primary: {
        main: '#FF6B35',
        light: '#FF8A5C',
        dark: '#E55A2B',
        gradient: ['#FF6B35', '#FF8A5C'] as const,
        glow: 'rgba(255, 107, 53, 0.3)',
        subtle: 'rgba(255, 107, 53, 0.08)',
    },

    // Accent (for highlights, graphs)
    accent: {
        blue: '#4F8EFF',
        blueLight: '#7AADFF',
        purple: '#8B5CF6',
        purpleLight: '#A78BFA',
        cyan: '#22D3EE',
        pink: '#F472B6',
        gradient: ['#4F8EFF', '#8B5CF6'] as const,
    },

    // Semantic colors
    success: {
        main: '#10B981',
        light: '#34D399',
        dark: '#059669',
        background: 'rgba(16, 185, 129, 0.12)',
        glow: 'rgba(16, 185, 129, 0.25)',
    },

    error: {
        main: '#EF4444',
        light: '#F87171',
        dark: '#DC2626',
        background: 'rgba(239, 68, 68, 0.12)',
        glow: 'rgba(239, 68, 68, 0.25)',
    },

    warning: {
        main: '#F59E0B',
        light: '#FBBF24',
        dark: '#D97706',
        background: 'rgba(245, 158, 11, 0.12)',
        glow: 'rgba(245, 158, 11, 0.25)',
    },

    // Neutral palette - deep blue-tinted dark theme
    neutral: {
        // Backgrounds
        background: '#0A0E1A',
        surface: '#111827',
        surfaceElevated: '#1F2937',

        // Glassmorphism
        glass: 'rgba(17, 24, 39, 0.7)',
        glassLight: 'rgba(31, 41, 55, 0.6)',
        glassBorder: 'rgba(255, 255, 255, 0.08)',

        // Borders
        border: 'rgba(255, 255, 255, 0.1)',
        borderLight: 'rgba(255, 255, 255, 0.15)',

        // Text
        text: '#F9FAFB',
        textSecondary: '#9CA3AF',
        textTertiary: '#6B7280',
        textDisabled: '#4B5563',
    },

    // UI states
    demo: {
        badge: '#8B5CF6',
        background: 'rgba(139, 92, 246, 0.12)',
        border: 'rgba(139, 92, 246, 0.25)',
    },

    // Platform-specific colors
    platforms: {
        swiggy: '#FC8019',
        zomato: '#E23744',
        uber: '#276EF1',
        ola: '#1C8C3C',
    },

    // Graph colors
    graph: {
        primary: '#4F8EFF',
        secondary: '#8B5CF6',
        tertiary: '#22D3EE',
        positive: '#10B981',
        negative: '#EF4444',
        gridLine: 'rgba(255, 255, 255, 0.06)',
        label: '#6B7280',
    },
} as const;

export type ColorScheme = typeof colors;
