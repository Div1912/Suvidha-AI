/**
 * Suvidha AI - Demo Badge Component
 * 
 * Visible on ALL screens when in demo mode.
 * Clearly labeled: "Demo Mode — Sample Data"
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '@theme/colors';
import { spacing, borderRadius } from '@theme/spacing';
import { Text } from './Text';

interface DemoBadgeProps {
    variant?: 'inline' | 'fixed';
}

export const DemoBadge: React.FC<DemoBadgeProps> = ({ variant = 'inline' }) => {
    return (
        <View style={[styles.container, variant === 'fixed' && styles.fixed]}>
            <View style={styles.badge}>
                <View style={styles.dot} />
                <Text variant="caption" style={styles.text}>
                    Demo Mode — Sample Data
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    fixed: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
    },
    badge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.demo.background,
        borderWidth: 1,
        borderColor: colors.demo.border,
        borderRadius: borderRadius.full,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.xs,
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: colors.demo.badge,
        marginRight: spacing.sm,
    },
    text: {
        color: colors.demo.badge,
        fontWeight: '500',
    },
});

export default DemoBadge;
