/**
 * Suvidha AI - Future Earnings (Forecast) Screen
 * 
 * Simplified for gig workers.
 * Features:
 * - Simple language
 * - Peak time predictions
 * - Visual cues
 */

import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import { Text, Card, EmptyState, LoadingState, DemoBadge } from '@components/ui';
import { ForecastIcon, AlertIcon, TimeIcon } from '@components/ui/Icons';
import { BarChart, StatCard } from '@components/ui/Graph';
import { colors } from '@theme/colors';
import { spacing } from '@theme/spacing';
import { useAppSelector } from '@store/index';

const ForecastScreen: React.FC = () => {
    const isDemo = useAppSelector((state) => state.demo.isActive);
    const demoForecast = useAppSelector((state) => state.demo.forecast);
    const realForecast = useAppSelector((state) => state.forecast);

    const forecast = isDemo ? demoForecast : realForecast.forecast;
    const isLoading = !isDemo && realForecast.isLoading;
    const hasInsufficientData = !isDemo && realForecast.hasInsufficientData;

    // Helper: Handle undefined/null values
    const formatCurrency = (value?: number | null): string => {
        if (value === undefined || value === null) return '₹0';
        return `₹${value.toLocaleString('en-IN')}`;
    };

    // Helper: Get peak time based on day
    const getPeakTime = (dateStr: string) => {
        const date = new Date(dateStr);
        const day = date.getDay();
        // Weekend: Late dinner peak
        if (day === 0 || day === 6) return "7 PM - 11 PM";
        // Weekday: Lunch & Dinner
        return "1 PM - 3 PM & 8 PM - 10 PM";
    };

    if (isLoading) {
        return <LoadingState message="Calculating earnings..." />; // Simplified
    }

    // Chart Data Preparation
    const hasForecastData = forecast && forecast.predictions && forecast.predictions.length > 0;

    // Calculate daily average dynamically
    const calculatedDailyAverage = hasForecastData
        ? (forecast.weeklyTotal / (forecast.predictions.length || 7))
        : 0;

    const barData = hasForecastData ? forecast.predictions.map(p => ({
        label: new Date(p.date).toLocaleDateString('en-IN', { weekday: 'short' }).slice(0, 2),
        value: p.predicted,
        color: p.predicted >= calculatedDailyAverage ? colors.success.main : colors.graph.secondary,
    })) : [];

    const sparklineData = hasForecastData ? forecast.predictions.map(p => p.predicted) : [];

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {/* Header */}
                <Animated.View entering={FadeIn.duration(500)} style={styles.header}>
                    <View style={styles.titleContainer}>
                        <View style={styles.iconBg}>
                            <ForecastIcon size={24} color={colors.primary.main} />
                        </View>
                        <Text variant="h2" color="default" style={styles.title}>
                            Future Earnings
                        </Text>
                    </View>
                </Animated.View>

                {/* Insufficient Data Warning - Simplified */}
                {hasInsufficientData && !isDemo && (
                    <Animated.View entering={FadeInDown.springify()}>
                        <Card variant="warning" style={styles.warningCard}>
                            <View style={styles.warningHeader}>
                                <AlertIcon size={20} color={colors.warning.main} />
                                <Text variant="body" color="warning" style={styles.warningTitle}>
                                    Needs More Work
                                </Text>
                            </View>
                            <Text variant="bodySmall" color="secondary">
                                Work for a few more days to see your prediction.
                            </Text>
                        </Card>
                    </Animated.View>
                )}

                {/* Forecast Content */}
                {hasForecastData ? (
                    <>
                        {/* Summary & Stats - Simplified Labels */}
                        <Animated.View entering={FadeInDown.delay(100).springify()} style={styles.statsGrid}>
                            <StatCard
                                label="NEXT 7 DAYS"
                                value={formatCurrency(forecast.weeklyTotal)}
                                trend="up"
                                trendValue="Likely"
                                sparklineData={sparklineData}
                            />
                            <StatCard
                                label="DAILY AVG"
                                value={formatCurrency(calculatedDailyAverage)}
                                trend="neutral"
                                trendValue="Expected"
                            />
                        </Animated.View>

                        {/* Chart Visualization */}
                        <Animated.View entering={FadeInDown.delay(200).springify()}>
                            <Card variant="default" style={styles.chartCard}>
                                <Text variant="label" color="tertiary" style={styles.chartLabel}>
                                    YOUR EARNINGS TREND
                                </Text>
                                <View style={styles.chartWrapper}>
                                    <BarChart
                                        data={barData}
                                        height={140}
                                        showLabels
                                        showValues
                                        formatValue={(v) => `₹${v}`}
                                        barColor={colors.accent.blue}
                                    />
                                </View>
                                {/* Simplified Confidence Text */}
                                <Text variant="caption" color="tertiary" style={styles.confidenceText}>
                                    85% Accurate • Based on your past work
                                </Text>
                            </Card>
                        </Animated.View>

                        {/* Daily Details List with Time */}
                        <Animated.View entering={FadeInDown.delay(300).springify()}>
                            <Text variant="h4" color="default" style={styles.sectionTitle}>
                                Daily Breakdown
                            </Text>
                            {forecast.predictions.map((day, i) => {
                                const isPeak = day.predicted === Math.max(...forecast.predictions.map(p => p.predicted));

                                return (
                                    <Card
                                        key={day.date}
                                        variant={isPeak ? 'success' : 'glass'}
                                        style={styles.dayCard}
                                    >
                                        <View style={styles.dayHeader}>
                                            <View>
                                                <Text variant="body" color="default" style={{ fontWeight: '600' }}>
                                                    {new Date(day.date).toLocaleDateString('en-IN', {
                                                        weekday: 'long', month: 'short', day: 'numeric',
                                                    })}
                                                </Text>
                                                <View style={styles.timeRow}>
                                                    <TimeIcon size={12} color={colors.neutral.textSecondary} />
                                                    <Text variant="caption" color="secondary" style={{ marginLeft: 4 }}>
                                                        High Pay: <Text variant="caption" color="default" style={{ fontWeight: '700' }}>{getPeakTime(day.date)}</Text>
                                                    </Text>
                                                </View>
                                            </View>
                                            <View style={{ alignItems: 'flex-end' }}>
                                                <Text variant="number" color={isPeak ? 'success' : 'default'}>
                                                    {formatCurrency(day.predicted)}
                                                </Text>
                                                <Text variant="caption" color="tertiary">
                                                    Min: {formatCurrency(day.confidenceLow)}
                                                </Text>
                                            </View>
                                        </View>
                                    </Card>
                                );
                            })}
                        </Animated.View>
                    </>
                ) : !hasInsufficientData && (
                    <EmptyState
                        title="No predictions yet"
                        message="Complete more orders to unlock future earnings."
                        icon={<ForecastIcon size={48} color={colors.neutral.textSecondary} />}
                    />
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.neutral.background,
    },
    scrollContent: {
        padding: spacing.base,
        paddingBottom: spacing['2xl'],
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.lg,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconBg: {
        width: 40, height: 40,
        borderRadius: 12,
        backgroundColor: colors.neutral.surfaceElevated,
        alignItems: 'center', justifyContent: 'center',
        marginRight: spacing.sm,
    },
    title: {
        fontSize: 24,
    },

    // Stats
    statsGrid: {
        flexDirection: 'row',
        gap: spacing.sm,
        marginBottom: spacing.lg,
    },

    // Chart
    chartCard: {
        padding: spacing.lg,
        marginBottom: spacing.xl,
    },
    chartLabel: {
        marginBottom: spacing.lg,
    },
    chartWrapper: {
        paddingTop: spacing.lg, // Prevent top clipping of values
    },
    confidenceText: {
        marginTop: spacing.lg,
        textAlign: 'center',
    },

    // Warning
    warningCard: {
        padding: spacing.md,
        marginBottom: spacing.lg,
    },
    warningHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.xs,
    },
    warningTitle: {
        marginLeft: spacing.sm,
        fontWeight: '600',
    },

    // Daily List
    sectionTitle: {
        marginBottom: spacing.md,
    },
    dayCard: {
        padding: spacing.md,
        marginBottom: spacing.sm,
    },
    dayHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center', // Align items center vertically
        marginBottom: spacing.sm,
    },
    timeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
});

export default ForecastScreen;
