/**
 * Suvidha AI - Theme Index
 * 
 * Centralized theme exports
 */

export * from './colors';
export * from './typography';
export * from './spacing';

import { colors } from './colors';
import { typography, fonts, fontSizes } from './typography';
import { spacing, borderRadius, shadows, layout } from './spacing';

export const theme = {
    colors,
    typography,
    fonts,
    fontSizes,
    spacing,
    borderRadius,
    shadows,
    layout,
} as const;

export type Theme = typeof theme;
