/**
 * Suvidha AI - Custom Geometric Icon Components
 * 
 * Clean, modern geometric icons built with React Native Views.
 * No external dependencies. Professional design.
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '@theme/colors';

interface IconProps {
    size?: number;
    color?: string;
}

// ─── Navigation Icons ───────────────────────────────────────────

export const HomeIcon: React.FC<IconProps> = ({ size = 24, color = colors.neutral.text }) => (
    <View style={[styles.iconBase, { width: size, height: size }]}>
        {/* House roof (triangle) */}
        <View style={{
            width: 0, height: 0,
            borderLeftWidth: size * 0.45, borderRightWidth: size * 0.45,
            borderBottomWidth: size * 0.35,
            borderLeftColor: 'transparent', borderRightColor: 'transparent',
            borderBottomColor: color,
            marginBottom: -1,
        }} />
        {/* House body */}
        <View style={{
            width: size * 0.7, height: size * 0.4,
            backgroundColor: 'transparent',
            borderWidth: 2, borderColor: color, borderTopWidth: 0,
            borderBottomLeftRadius: 3, borderBottomRightRadius: 3,
        }}>
            {/* Door */}
            <View style={{
                width: size * 0.22, height: size * 0.25,
                backgroundColor: color, borderTopLeftRadius: 2, borderTopRightRadius: 2,
                position: 'absolute', bottom: 0, alignSelf: 'center',
            }} />
        </View>
    </View>
);

export const ForecastIcon: React.FC<IconProps> = ({ size = 24, color = colors.neutral.text }) => (
    <View style={[styles.iconBase, { width: size, height: size, flexDirection: 'row', alignItems: 'flex-end', gap: size * 0.06 }]}>
        <View style={{ width: size * 0.15, height: size * 0.3, backgroundColor: color, borderRadius: 2, opacity: 0.4 }} />
        <View style={{ width: size * 0.15, height: size * 0.55, backgroundColor: color, borderRadius: 2, opacity: 0.6 }} />
        <View style={{ width: size * 0.15, height: size * 0.4, backgroundColor: color, borderRadius: 2, opacity: 0.8 }} />
        <View style={{ width: size * 0.15, height: size * 0.75, backgroundColor: color, borderRadius: 2 }} />
        {/* Arrow up */}
        <View style={{ position: 'absolute', top: size * 0.08, right: size * 0.05 }}>
            <View style={{
                width: 0, height: 0,
                borderLeftWidth: size * 0.08, borderRightWidth: size * 0.08,
                borderBottomWidth: size * 0.12,
                borderLeftColor: 'transparent', borderRightColor: 'transparent',
                borderBottomColor: color,
            }} />
        </View>
    </View>
);

export const BiasIcon: React.FC<IconProps> = ({ size = 24, color = colors.neutral.text }) => (
    <View style={[styles.iconBase, { width: size, height: size }]}>
        {/* Scale pivot */}
        <View style={{
            width: 0, height: 0,
            borderLeftWidth: size * 0.15, borderRightWidth: size * 0.15,
            borderBottomWidth: size * 0.15,
            borderLeftColor: 'transparent', borderRightColor: 'transparent',
            borderBottomColor: color,
        }} />
        {/* Beam */}
        <View style={{ width: size * 0.8, height: 2.5, backgroundColor: color, borderRadius: 1 }} />
        {/* Left pan */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: size * 0.8, marginTop: 1 }}>
            <View style={{ alignItems: 'center' }}>
                <View style={{ width: 1.5, height: size * 0.2, backgroundColor: color }} />
                <View style={{ width: size * 0.25, height: size * 0.1, backgroundColor: color, borderBottomLeftRadius: size * 0.12, borderBottomRightRadius: size * 0.12, opacity: 0.7 }} />
            </View>
            <View style={{ alignItems: 'center' }}>
                <View style={{ width: 1.5, height: size * 0.2, backgroundColor: color }} />
                <View style={{ width: size * 0.25, height: size * 0.1, backgroundColor: color, borderBottomLeftRadius: size * 0.12, borderBottomRightRadius: size * 0.12, opacity: 0.7 }} />
            </View>
        </View>
    </View>
);

export const UniteIcon: React.FC<IconProps> = ({ size = 24, color = colors.neutral.text }) => (
    <View style={[styles.iconBase, { width: size, height: size }]}>
        {/* Three connected circles */}
        <View style={{ flexDirection: 'row', gap: -size * 0.04 }}>
            <View style={{ width: size * 0.3, height: size * 0.3, borderRadius: size * 0.15, borderWidth: 2, borderColor: color }} />
            <View style={{ width: size * 0.3, height: size * 0.3, borderRadius: size * 0.15, borderWidth: 2, borderColor: color, marginTop: -size * 0.05 }} />
            <View style={{ width: size * 0.3, height: size * 0.3, borderRadius: size * 0.15, borderWidth: 2, borderColor: color }} />
        </View>
        {/* Connection bar */}
        <View style={{ width: size * 0.5, height: 2, backgroundColor: color, marginTop: size * 0.06, borderRadius: 1 }} />
        <View style={{ width: size * 0.3, height: 2, backgroundColor: color, marginTop: 3, borderRadius: 1, opacity: 0.5 }} />
    </View>
);

export const ProfileIcon: React.FC<IconProps> = ({ size = 24, color = colors.neutral.text }) => (
    <View style={[styles.iconBase, { width: size, height: size }]}>
        {/* Head */}
        <View style={{
            width: size * 0.35, height: size * 0.35,
            borderRadius: size * 0.175,
            borderWidth: 2, borderColor: color,
        }} />
        {/* Body arc */}
        <View style={{
            width: size * 0.65, height: size * 0.3,
            borderTopLeftRadius: size * 0.35, borderTopRightRadius: size * 0.35,
            borderWidth: 2, borderColor: color, borderBottomWidth: 0,
            marginTop: size * 0.05,
        }} />
    </View>
);

// ─── Feature Icons ──────────────────────────────────────────────

export const TruthLensIcon: React.FC<IconProps> = ({ size = 24, color = colors.neutral.text }) => (
    <View style={[styles.iconBase, { width: size, height: size }]}>
        {/* Magnifying glass circle */}
        <View style={{
            width: size * 0.55, height: size * 0.55,
            borderRadius: size * 0.275,
            borderWidth: 2.5, borderColor: color,
            marginRight: size * 0.1, marginBottom: size * 0.1,
        }}>
            {/* Inner check */}
            <View style={{
                width: size * 0.15, height: size * 0.25,
                borderRightWidth: 2, borderBottomWidth: 2, borderColor: color,
                transform: [{ rotate: '45deg' }],
                alignSelf: 'center', marginTop: size * 0.05,
            }} />
        </View>
        {/* Handle */}
        <View style={{
            width: size * 0.25, height: 2.5,
            backgroundColor: color, borderRadius: 1,
            position: 'absolute', bottom: size * 0.12, right: size * 0.08,
            transform: [{ rotate: '45deg' }],
        }} />
    </View>
);

export const EarningsIcon: React.FC<IconProps> = ({ size = 24, color = colors.neutral.text }) => (
    <View style={[styles.iconBase, { width: size, height: size }]}>
        <View style={{
            width: size * 0.65, height: size * 0.65,
            borderRadius: size * 0.325,
            borderWidth: 2, borderColor: color,
            alignItems: 'center', justifyContent: 'center',
        }}>
            <View style={{
                width: size * 0.08, height: size * 0.35,
                backgroundColor: color, borderRadius: 1,
                position: 'absolute',
            }} />
            <View style={{
                width: size * 0.25, height: 2,
                backgroundColor: color, borderRadius: 1,
                position: 'absolute', top: size * 0.15,
            }} />
            <View style={{
                width: size * 0.25, height: 2,
                backgroundColor: color, borderRadius: 1,
                position: 'absolute', bottom: size * 0.15,
            }} />
        </View>
    </View>
);

export const OrderIcon: React.FC<IconProps> = ({ size = 24, color = colors.neutral.text }) => (
    <View style={[styles.iconBase, { width: size, height: size }]}>
        <View style={{
            width: size * 0.6, height: size * 0.75,
            borderWidth: 2, borderColor: color,
            borderRadius: 4, padding: size * 0.08,
            justifyContent: 'space-evenly',
        }}>
            <View style={{ width: '100%', height: 2, backgroundColor: color, borderRadius: 1 }} />
            <View style={{ width: '70%', height: 2, backgroundColor: color, borderRadius: 1, opacity: 0.6 }} />
            <View style={{ width: '85%', height: 2, backgroundColor: color, borderRadius: 1, opacity: 0.4 }} />
        </View>
    </View>
);

export const DistanceIcon: React.FC<IconProps> = ({ size = 24, color = colors.neutral.text }) => (
    <View style={[styles.iconBase, { width: size, height: size }]}>
        {/* Pin */}
        <View style={{
            width: size * 0.45, height: size * 0.55,
            borderTopLeftRadius: size * 0.225, borderTopRightRadius: size * 0.225,
            borderWidth: 2, borderColor: color, borderBottomWidth: 0,
        }}>
            <View style={{
                width: size * 0.15, height: size * 0.15,
                borderRadius: size * 0.075,
                backgroundColor: color,
                alignSelf: 'center', marginTop: size * 0.08,
            }} />
        </View>
        {/* Point */}
        <View style={{
            width: 0, height: 0,
            borderLeftWidth: size * 0.225, borderRightWidth: size * 0.225,
            borderTopWidth: size * 0.2,
            borderLeftColor: 'transparent', borderRightColor: 'transparent',
            borderTopColor: color,
            opacity: 0.7,
        }} />
    </View>
);

export const TimeIcon: React.FC<IconProps> = ({ size = 24, color = colors.neutral.text }) => (
    <View style={[styles.iconBase, { width: size, height: size }]}>
        <View style={{
            width: size * 0.7, height: size * 0.7,
            borderRadius: size * 0.35,
            borderWidth: 2, borderColor: color,
            alignItems: 'center',
        }}>
            {/* Hour hand */}
            <View style={{
                width: 2, height: size * 0.18,
                backgroundColor: color, borderRadius: 1,
                position: 'absolute', top: size * 0.12,
            }} />
            {/* Minute hand */}
            <View style={{
                width: size * 0.15, height: 2,
                backgroundColor: color, borderRadius: 1,
                position: 'absolute', top: size * 0.3, left: size * 0.3,
            }} />
        </View>
    </View>
);

export const FuelIcon: React.FC<IconProps> = ({ size = 24, color = colors.neutral.text }) => (
    <View style={[styles.iconBase, { width: size, height: size }]}>
        <View style={{
            width: size * 0.5, height: size * 0.65,
            borderWidth: 2, borderColor: color,
            borderRadius: 4,
        }}>
            {/* Fuel level */}
            <View style={{
                width: '100%', height: '40%',
                backgroundColor: color, opacity: 0.3,
                position: 'absolute', bottom: 0,
                borderBottomLeftRadius: 2, borderBottomRightRadius: 2,
            }} />
        </View>
        {/* Nozzle */}
        <View style={{
            width: size * 0.15, height: 2,
            backgroundColor: color,
            position: 'absolute', top: size * 0.25, right: size * 0.15,
        }} />
    </View>
);

export const CheckIcon: React.FC<IconProps> = ({ size = 24, color = colors.success.main }) => (
    <View style={[styles.iconBase, { width: size, height: size }]}>
        <View style={{
            width: size * 0.6, height: size * 0.6,
            borderRadius: size * 0.3,
            backgroundColor: color,
            alignItems: 'center', justifyContent: 'center',
        }}>
            <View style={{
                width: size * 0.15, height: size * 0.28,
                borderRightWidth: 2.5, borderBottomWidth: 2.5,
                borderColor: '#FFFFFF',
                transform: [{ rotate: '45deg' }],
                marginTop: -size * 0.05,
            }} />
        </View>
    </View>
);

export const CloseIcon: React.FC<IconProps> = ({ size = 24, color = colors.neutral.text }) => (
    <View style={[styles.iconBase, { width: size, height: size }]}>
        <View style={{
            width: size * 0.55, height: 2.5,
            backgroundColor: color, borderRadius: 1,
            transform: [{ rotate: '45deg' }],
            position: 'absolute',
        }} />
        <View style={{
            width: size * 0.55, height: 2.5,
            backgroundColor: color, borderRadius: 1,
            transform: [{ rotate: '-45deg' }],
            position: 'absolute',
        }} />
    </View>
);

export const ChevronRightIcon: React.FC<IconProps> = ({ size = 24, color = colors.neutral.text }) => (
    <View style={[styles.iconBase, { width: size, height: size }]}>
        <View style={{
            width: size * 0.3, height: size * 0.3,
            borderRightWidth: 2.5, borderTopWidth: 2.5,
            borderColor: color,
            transform: [{ rotate: '45deg' }],
            marginLeft: -size * 0.05,
        }} />
    </View>
);

export const AlertIcon: React.FC<IconProps> = ({ size = 24, color = colors.warning.main }) => (
    <View style={[styles.iconBase, { width: size, height: size }]}>
        {/* Triangle */}
        <View style={{
            width: 0, height: 0,
            borderLeftWidth: size * 0.4, borderRightWidth: size * 0.4,
            borderBottomWidth: size * 0.65,
            borderLeftColor: 'transparent', borderRightColor: 'transparent',
            borderBottomColor: color, opacity: 0.2,
            borderRadius: 3,
        }} />
        {/* Exclamation */}
        <View style={{ position: 'absolute', top: size * 0.3, alignItems: 'center' }}>
            <View style={{ width: 2.5, height: size * 0.2, backgroundColor: color, borderRadius: 1 }} />
            <View style={{ width: 3, height: 3, backgroundColor: color, borderRadius: 1.5, marginTop: 3 }} />
        </View>
    </View>
);

export const QRCodeIcon: React.FC<IconProps> = ({ size = 24, color = colors.neutral.text }) => (
    <View style={[styles.iconBase, { width: size, height: size, flexDirection: 'row', flexWrap: 'wrap', gap: size * 0.04 }]}>
        <View style={{ width: size * 0.35, height: size * 0.35, borderWidth: 2, borderColor: color, borderRadius: 2 }}>
            <View style={{ width: size * 0.12, height: size * 0.12, backgroundColor: color, margin: size * 0.05 }} />
        </View>
        <View style={{ width: size * 0.35, height: size * 0.35, borderWidth: 2, borderColor: color, borderRadius: 2 }}>
            <View style={{ width: size * 0.12, height: size * 0.12, backgroundColor: color, margin: size * 0.05 }} />
        </View>
        <View style={{ width: size * 0.35, height: size * 0.35, borderWidth: 2, borderColor: color, borderRadius: 2 }}>
            <View style={{ width: size * 0.12, height: size * 0.12, backgroundColor: color, margin: size * 0.05 }} />
        </View>
        <View style={{ width: size * 0.35, height: size * 0.35, opacity: 0.5 }}>
            <View style={{ width: size * 0.15, height: size * 0.15, backgroundColor: color, borderRadius: 1 }} />
        </View>
    </View>
);

// ─── Platform Icons ─────────────────────────────────────────────

const PlatformIcon: React.FC<{ size: number; bg: string; letter: string }> = ({ size, bg, letter }) => (
    <View style={{
        width: size, height: size, borderRadius: size * 0.3,
        backgroundColor: bg,
        alignItems: 'center', justifyContent: 'center',
        ...Platform.select({
            android: { elevation: 2 },
            ios: { shadowColor: bg, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 4 },
        }),
    }}>
        <View style={{
            width: size * 0.4, height: 2.5,
            backgroundColor: '#FFFFFF',
            borderRadius: 1,
        }} />
        <View style={{
            width: size * 0.25, height: 2.5,
            backgroundColor: '#FFFFFF',
            borderRadius: 1,
            marginTop: size * 0.08,
            opacity: 0.7,
        }} />
    </View>
);

// Need Platform import
import { Platform } from 'react-native';

export const SwiggyIcon: React.FC<IconProps> = ({ size = 24 }) => (
    <PlatformIcon size={size} bg={colors.platforms.swiggy} letter="S" />
);

export const ZomatoIcon: React.FC<IconProps> = ({ size = 24 }) => (
    <PlatformIcon size={size} bg={colors.platforms.zomato} letter="Z" />
);

export const UberIcon: React.FC<IconProps> = ({ size = 24 }) => (
    <PlatformIcon size={size} bg={colors.platforms.uber} letter="U" />
);

export const OlaIcon: React.FC<IconProps> = ({ size = 24 }) => (
    <PlatformIcon size={size} bg={colors.platforms.ola} letter="O" />
);

export const FireIcon: React.FC<IconProps> = ({ size = 24, color = '#FF4500' }) => (
    <View style={[styles.iconBase, { width: size, height: size }]}>
        <View style={{
            width: size * 0.6, height: size * 0.6,
            backgroundColor: color,
            borderBottomLeftRadius: size * 0.3, borderBottomRightRadius: size * 0.3,
            borderTopLeftRadius: 0, borderTopRightRadius: size * 0.6,
            transform: [{ rotate: '45deg' }],
            marginTop: size * 0.2,
        }} />
        <View style={{
            width: size * 0.4, height: size * 0.4,
            backgroundColor: color,
            borderRadius: size * 0.2,
            position: 'absolute', top: size * 0.1,
            opacity: 0.8,
        }} />
    </View>
);

export const SurgeIcon: React.FC<IconProps> = ({ size = 24, color = colors.neutral.text }) => (
    <View style={[styles.iconBase, { width: size, height: size }]}>
        <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 2 }}>
            <View style={{ width: size * 0.2, height: size * 0.3, backgroundColor: color, borderRadius: 2, opacity: 0.5 }} />
            <View style={{ width: size * 0.2, height: size * 0.5, backgroundColor: color, borderRadius: 2, opacity: 0.7 }} />
            <View style={{ width: size * 0.2, height: size * 0.8, backgroundColor: color, borderRadius: 2 }} />
        </View>
        <View style={{
            width: size * 0.4, height: 2,
            backgroundColor: colors.success.main,
            position: 'absolute', top: size * 0.1, right: 0,
            transform: [{ rotate: '-45deg' }],
        }} />
    </View>
);

export const FistIcon: React.FC<IconProps> = ({ size = 24, color = colors.neutral.text }) => (
    <View style={[styles.iconBase, { width: size, height: size }]}>
        <View style={{
            width: size * 0.5, height: size * 0.6,
            backgroundColor: color,
            borderRadius: size * 0.15,
        }} />
        <View style={{
            width: size * 0.25, height: size * 0.5,
            backgroundColor: color,
            position: 'absolute', left: size * 0.15, bottom: -size * 0.1,
            borderBottomLeftRadius: size * 0.1, borderBottomRightRadius: size * 0.1,
        }} />
    </View>
);

export const PartyIcon: React.FC<IconProps> = ({ size = 24, color = colors.neutral.text }) => (
    <View style={[styles.iconBase, { width: size, height: size }]}>
        <View style={{
            width: 0, height: 0,
            borderLeftWidth: size * 0.25, borderRightWidth: size * 0.25,
            borderBottomWidth: size * 0.4,
            borderLeftColor: 'transparent', borderRightColor: 'transparent',
            borderBottomColor: color,
            transform: [{ rotate: '-15deg' }],
        }} />
        <View style={{
            width: size * 0.1, height: size * 0.1,
            borderRadius: size * 0.05, backgroundColor: colors.accent.blue,
            position: 'absolute', top: 0, left: 0,
        }} />
        <View style={{
            width: size * 0.1, height: size * 0.1,
            borderRadius: size * 0.05, backgroundColor: colors.success.main,
            position: 'absolute', top: size * 0.2, right: 0,
        }} />
        <View style={{
            width: size * 0.1, height: size * 0.1,
            borderRadius: size * 0.05, backgroundColor: colors.primary.main,
            position: 'absolute', top: 0, right: size * 0.3,
        }} />
    </View>
);

export const StarIcon: React.FC<IconProps> = ({ size = 24, color = '#FFD700' }) => (
    <View style={[styles.iconBase, { width: size, height: size }]}>
        <View style={{
            width: 0, height: 0,
            borderLeftWidth: size * 0.15, borderRightWidth: size * 0.15,
            borderBottomWidth: size * 0.5,
            borderLeftColor: 'transparent', borderRightColor: 'transparent',
            borderBottomColor: color,
            marginBottom: size * 0.1,
        }} />
    </View>
);

export const LockIcon: React.FC<IconProps> = ({ size = 24, color = colors.neutral.text }) => (
    <View style={[styles.iconBase, { width: size, height: size }]}>
        <View style={{
            width: size * 0.5, height: size * 0.4,
            borderWidth: 2, borderColor: color,
            borderBottomWidth: 0,
            borderTopLeftRadius: size * 0.25, borderTopRightRadius: size * 0.25,
            marginBottom: -2,
        }} />
        <View style={{
            width: size * 0.6, height: size * 0.45,
            backgroundColor: color,
            borderRadius: 4,
        }} />
    </View>
);

const styles = StyleSheet.create({
    iconBase: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});
