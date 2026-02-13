/**
 * Suvidha AI - Custom Graph Components
 * 
 * Pure React Native graph/chart components.
 * No external charting library needed.
 * Clean, modern, animated visualizations.
 */

import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withDelay,
    withSpring,
    Easing,
} from 'react-native-reanimated';
import { colors } from '@theme/colors';
import { spacing, borderRadius } from '@theme/spacing';
import { Text } from './Text';

// ─── Bar Chart ──────────────────────────────────────────────────

interface BarChartData {
    label: string;
    value: number;
    color?: string;
}

interface BarChartProps {
    data: BarChartData[];
    height?: number;
    showLabels?: boolean;
    showValues?: boolean;
    formatValue?: (val: number) => string;
    barColor?: string;
    animated?: boolean;
}

const AnimatedBar: React.FC<{
    height: number;
    maxHeight: number;
    color: string;
    delay: number;
    animated: boolean;
}> = ({ height, maxHeight, color, delay, animated }) => {
    const barHeight = useSharedValue(animated ? 0 : height);

    useEffect(() => {
        if (animated) {
            barHeight.value = withDelay(
                delay,
                withSpring(height, { damping: 12, stiffness: 100 })
            );
        }
    }, [height, delay, animated]);

    const animatedStyle = useAnimatedStyle(() => ({
        height: barHeight.value,
    }));

    return (
        <Animated.View
            style={[
                {
                    width: '100%',
                    backgroundColor: color,
                    borderTopLeftRadius: 6,
                    borderTopRightRadius: 6,
                    minHeight: 4,
                },
                animatedStyle,
            ]}
        />
    );
};

export const BarChart: React.FC<BarChartProps> = ({
    data,
    height = 140,
    showLabels = true,
    showValues = true,
    formatValue = (v) => `₹${v}`,
    barColor = colors.graph.primary,
    animated = true,
}) => {
    const maxValue = Math.max(...data.map(d => d.value), 1);

    return (
        <View style={[graphStyles.chartContainer, { height: height + 40 }]}>
            {/* Grid lines */}
            <View style={[graphStyles.gridContainer, { height }]}>
                {[0.25, 0.5, 0.75, 1].map((ratio, i) => (
                    <View
                        key={i}
                        style={[
                            graphStyles.gridLine,
                            { bottom: `${ratio * 100}%` },
                        ]}
                    />
                ))}
            </View>

            {/* Bars */}
            <View style={[graphStyles.barsContainer, { height }]}>
                {data.map((item, index) => {
                    const barHeight = (item.value / maxValue) * height;
                    const itemColor = item.color || barColor;

                    return (
                        <View key={index} style={graphStyles.barColumn}>
                            {showValues && (
                                <Text variant="caption" color="tertiary" style={graphStyles.barValue}>
                                    {formatValue(item.value)}
                                </Text>
                            )}
                            <View style={[graphStyles.barWrapper, { height }]}>
                                <View style={{ flex: 1 }} />
                                <AnimatedBar
                                    height={barHeight}
                                    maxHeight={height}
                                    color={itemColor}
                                    delay={index * 80}
                                    animated={animated}
                                />
                            </View>
                            {showLabels && (
                                <Text variant="caption" color="tertiary" style={graphStyles.barLabel}>
                                    {item.label}
                                </Text>
                            )}
                        </View>
                    );
                })}
            </View>
        </View>
    );
};

// ─── Mini Sparkline ─────────────────────────────────────────────

interface SparklineProps {
    data: number[];
    width?: number;
    height?: number;
    color?: string;
    showDots?: boolean;
}

export const Sparkline: React.FC<SparklineProps> = ({
    data,
    width = 80,
    height = 30,
    color = colors.graph.positive,
    showDots = false,
}) => {
    const maxValue = Math.max(...data, 1);
    const minValue = Math.min(...data, 0);
    const range = maxValue - minValue || 1;

    return (
        <View style={{ width, height, flexDirection: 'row', alignItems: 'flex-end', gap: 1 }}>
            {data.map((value, index) => {
                const barH = ((value - minValue) / range) * height * 0.9 + height * 0.1;
                return (
                    <View key={index} style={{ flex: 1, height: barH }}>
                        <View
                            style={{
                                flex: 1,
                                backgroundColor: color,
                                borderTopLeftRadius: 2,
                                borderTopRightRadius: 2,
                                opacity: 0.3 + (index / data.length) * 0.7,
                            }}
                        />
                        {showDots && index === data.length - 1 && (
                            <View style={{
                                width: 6, height: 6,
                                borderRadius: 3,
                                backgroundColor: color,
                                position: 'absolute', top: -3,
                                alignSelf: 'center',
                            }} />
                        )}
                    </View>
                );
            })}
        </View>
    );
};

// ─── Progress Ring ──────────────────────────────────────────────

interface ProgressRingProps {
    progress: number; // 0-1
    size?: number;
    strokeWidth?: number;
    color?: string;
    backgroundColor?: string;
    children?: React.ReactNode;
}

export const ProgressRing: React.FC<ProgressRingProps> = ({
    progress,
    size = 80,
    strokeWidth = 6,
    color = colors.primary.main,
    backgroundColor = colors.neutral.glassBorder,
    children,
}) => {
    const clampedProgress = Math.min(Math.max(progress, 0), 1);

    return (
        <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
            {/* Background ring */}
            <View style={{
                width: size, height: size,
                borderRadius: size / 2,
                borderWidth: strokeWidth,
                borderColor: backgroundColor,
                position: 'absolute',
            }} />
            {/* Progress — using clip approach */}
            <View style={{
                width: size, height: size,
                borderRadius: size / 2,
                borderWidth: strokeWidth,
                borderColor: color,
                borderLeftColor: clampedProgress > 0.25 ? color : 'transparent',
                borderBottomColor: clampedProgress > 0.5 ? color : 'transparent',
                borderRightColor: clampedProgress > 0.75 ? color : 'transparent',
                position: 'absolute',
                transform: [{ rotate: '-90deg' }],
            }} />
            {children}
        </View>
    );
};

// ─── Horizontal Progress Bar ────────────────────────────────────

interface ProgressBarProps {
    progress: number;
    height?: number;
    color?: string;
    backgroundColor?: string;
    animated?: boolean;
    showLabel?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
    progress,
    height = 8,
    color = colors.primary.main,
    backgroundColor = colors.neutral.glassBorder,
    animated = true,
    showLabel = false,
}) => {
    const animatedWidth = useSharedValue(animated ? 0 : progress * 100);

    useEffect(() => {
        if (animated) {
            animatedWidth.value = withTiming(progress * 100, {
                duration: 800,
                easing: Easing.out(Easing.cubic),
            });
        }
    }, [progress, animated]);

    const animatedStyle = useAnimatedStyle(() => ({
        width: `${animatedWidth.value}%`,
    }));

    return (
        <View>
            <View style={{
                width: '100%', height,
                backgroundColor,
                borderRadius: height / 2,
                overflow: 'hidden',
            }}>
                <Animated.View
                    style={[
                        {
                            height: '100%',
                            backgroundColor: color,
                            borderRadius: height / 2,
                        },
                        animatedStyle,
                    ]}
                />
            </View>
            {showLabel && (
                <Text variant="caption" color="tertiary" style={{ marginTop: 4, textAlign: 'right' }}>
                    {Math.round(progress * 100)}%
                </Text>
            )}
        </View>
    );
};

// ─── Stat Card ──────────────────────────────────────────────────

interface StatCardProps {
    label: string;
    value: string;
    trend?: 'up' | 'down' | 'neutral';
    trendValue?: string;
    sparklineData?: number[];
}

export const StatCard: React.FC<StatCardProps> = ({
    label,
    value,
    trend,
    trendValue,
    sparklineData,
}) => (
    <View style={graphStyles.statCard}>
        <Text variant="caption" color="tertiary" style={graphStyles.statLabel}>{label}</Text>
        <View style={graphStyles.statRow}>
            <Text variant="h3" color="default">{value}</Text>
            {sparklineData && (
                <Sparkline
                    data={sparklineData}
                    width={50}
                    height={24}
                    color={trend === 'down' ? colors.error.main : colors.success.main}
                />
            )}
        </View>
        {trend && trendValue && (
            <View style={[
                graphStyles.trendBadge,
                { backgroundColor: trend === 'up' ? colors.success.background : trend === 'down' ? colors.error.background : colors.neutral.glass },
            ]}>
                <Text
                    variant="caption"
                    color={trend === 'up' ? 'success' : trend === 'down' ? 'error' : 'tertiary'}
                >
                    {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'} {trendValue}
                </Text>
            </View>
        )}
    </View>
);

// ─── Comparison Bar ─────────────────────────────────────────────

interface ComparisonBarProps {
    label: string;
    yourValue: number;
    peerValue: number;
    formatValue?: (v: number) => string;
}

export const ComparisonBar: React.FC<ComparisonBarProps> = ({
    label,
    yourValue,
    peerValue,
    formatValue = (v) => `₹${v.toFixed(0)}`,
}) => {
    const maxVal = Math.max(yourValue, peerValue, 1);

    return (
        <View style={graphStyles.comparisonContainer}>
            <Text variant="caption" color="tertiary" style={{ marginBottom: 6 }}>{label}</Text>
            <View style={{ gap: 6 }}>
                <View style={graphStyles.comparisonRow}>
                    <Text variant="caption" color="secondary" style={{ width: 40 }}>You</Text>
                    <View style={graphStyles.comparisonBarBg}>
                        <View style={[graphStyles.comparisonBarFill, {
                            width: `${(yourValue / maxVal) * 100}%`,
                            backgroundColor: colors.accent.blue,
                        }]} />
                    </View>
                    <Text variant="caption" color="default" style={{ width: 50, textAlign: 'right' }}>
                        {formatValue(yourValue)}
                    </Text>
                </View>
                <View style={graphStyles.comparisonRow}>
                    <Text variant="caption" color="secondary" style={{ width: 40 }}>Peer</Text>
                    <View style={graphStyles.comparisonBarBg}>
                        <View style={[graphStyles.comparisonBarFill, {
                            width: `${(peerValue / maxVal) * 100}%`,
                            backgroundColor: colors.neutral.textTertiary,
                        }]} />
                    </View>
                    <Text variant="caption" color="secondary" style={{ width: 50, textAlign: 'right' }}>
                        {formatValue(peerValue)}
                    </Text>
                </View>
            </View>
        </View>
    );
};

const graphStyles = StyleSheet.create({
    chartContainer: {
        width: '100%',
        position: 'relative',
    },
    gridContainer: {
        position: 'absolute',
        left: 0, right: 0,
    },
    gridLine: {
        position: 'absolute',
        left: 0, right: 0,
        height: 1,
        backgroundColor: colors.graph.gridLine,
    },
    barsContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        gap: 4,
    },
    barColumn: {
        flex: 1,
        alignItems: 'center',
    },
    barWrapper: {
        width: '100%',
    },
    barValue: {
        marginBottom: 4,
        fontSize: 10,
    },
    barLabel: {
        marginTop: 6,
        fontSize: 10,
        textAlign: 'center',
    },
    statCard: {
        flex: 1,
        backgroundColor: colors.neutral.surface,
        borderRadius: borderRadius.lg,
        borderWidth: 1,
        borderColor: colors.neutral.glassBorder,
        padding: spacing.md,
    },
    statLabel: {
        marginBottom: 4,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    statRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    trendBadge: {
        alignSelf: 'flex-start',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
        marginTop: 6,
    },
    comparisonContainer: {
        marginVertical: spacing.sm,
    },
    comparisonRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    comparisonBarBg: {
        flex: 1,
        height: 8,
        backgroundColor: colors.neutral.glassBorder,
        borderRadius: 4,
        overflow: 'hidden',
    },
    comparisonBarFill: {
        height: '100%',
        borderRadius: 4,
    },
});
