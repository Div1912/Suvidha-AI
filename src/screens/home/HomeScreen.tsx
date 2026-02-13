/**
 * Suvidha AI - Home Screen
 * 
 * Premium dashboard with animated earnings,
 * sparkline graphs, stat cards, and modern layout.
 */

import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
    FadeInDown,
    FadeIn,
    useSharedValue,
    withTiming,
    Easing,
} from 'react-native-reanimated';
import { Text, Card, Button, EmptyState, LoadingState, DemoBadge } from '@components/ui';
import { StatCard, Sparkline, BarChart, ProgressBar } from '@components/ui/Graph';
import {
    EarningsIcon, OrderIcon, TimeIcon, TruthLensIcon,
    BiasIcon, CheckIcon, ForecastIcon, CloseIcon,
} from '@components/ui/Icons';
import { colors } from '@theme/colors';
import { spacing } from '@theme/spacing';
import { useAppSelector, useAppDispatch } from '@store/index';

// ─── Animated Counter ───────────────────────────────────────────

const AnimatedEarnings: React.FC<{ value: number }> = ({ value }) => {
    const [display, setDisplay] = React.useState('₹0');

    useEffect(() => {
        let frame: number;
        const start = Date.now();
        const duration = 1500;
        const animate = () => {
            const elapsed = Date.now() - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(eased * value);
            setDisplay(`₹${current.toLocaleString('en-IN')}`);
            if (progress < 1) {
                frame = requestAnimationFrame(animate);
            }
        };
        animate();
        return () => cancelAnimationFrame(frame);
    }, [value]);

    return (
        <Text variant="numberLarge" color="success" style={homeStyles.earningsValue}>
            {display}
        </Text>
    );
};

// ─── Main Screen ────────────────────────────────────────────────

const HomeScreen: React.FC = () => {
    const dispatch = useAppDispatch();
    const isDemo = useAppSelector((state) => state.demo.isActive);
    const demoData = useAppSelector((state) => state.demo);
    const realEarnings = useAppSelector((state) => state.earnings);
    const user = useAppSelector((state) => state.user.worker);

    const todayEarnings = isDemo ? demoData.todayEarnings : realEarnings.todayEarnings;
    const earnings = isDemo ? demoData.earnings : realEarnings.history;
    const isLoading = !isDemo && realEarnings.isLoading;
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = async () => {
        setRefreshing(true);
        setTimeout(() => setRefreshing(false), 1000);
    };

    const getRecentEarnings = (): number[] => {
        if (!earnings || earnings.length === 0) return [];
        return earnings.slice(0, 7).map((e: any) => e.totalEarnings || e.earnings || 0).reverse();
    };

    if (isLoading) {
        return <LoadingState message="Loading your earnings..." />;
    }

    const sparklineData = getRecentEarnings();
    const earningsBarData = (earnings || []).slice(0, 7).reverse().map((e: any) => ({
        label: new Date(e.date).toLocaleDateString('en-IN', { weekday: 'short' }).slice(0, 2),
        value: e.totalEarnings || 0,
        color: (e.totalEarnings || 0) >= 900 ? colors.success.main : colors.graph.primary,
    }));

    const handleAccept = () => Alert.alert("Accepted", "Order verified and accepted.");
    const handleReject = () => Alert.alert("Rejected", "Order rejected. Feedback sent to Union.");

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        tintColor={colors.primary.main}
                        colors={[colors.primary.main]}
                    />
                }
                showsVerticalScrollIndicator={false}
            >
                {/* ─── Header ─── */}
                <Animated.View entering={FadeIn.duration(500)} style={styles.header}>
                    <View>
                        <Text variant="caption" color="tertiary">
                            {new Date().toLocaleDateString('en-IN', {
                                weekday: 'long', day: 'numeric', month: 'short',
                            })}
                        </Text>
                        <Text variant="h2" color="default" style={styles.greeting}>
                            {isDemo ? 'Demo User' : (user?.name || 'Worker')}
                        </Text>
                    </View>
                    {/* Removed duplicate DemoBadge */}
                </Animated.View>

                {/* ─── Truth Lens (Recent Analysis) - Moved to Top ─── */}
                {isDemo && demoData.orderAnalyses.length > 0 && (
                    <Animated.View entering={FadeInDown.delay(100).springify()}>
                        <View style={styles.sectionHeaderRow}>
                            <TruthLensIcon size={20} color={colors.primary.main} />
                            <Text variant="h4" color="default" style={styles.sectionTitleInline}>
                                Truth Lens Analysis
                            </Text>
                        </View>

                        {/* High Pay Prediction Banner */}
                        <View style={styles.predictionBanner}>
                            <TimeIcon size={16} color={colors.primary.main} />
                            <Text variant="caption" color="default" style={{ marginLeft: 8 }}>
                                Next High Pay Slot: <Text style={{ fontWeight: '700' }}>Today 8:00 PM - 10:00 PM</Text>
                            </Text>
                        </View>

                        {/* Showing only latest 1 for compactness at top, or maybe carousel? User asked for "Recent Analysis" */}
                        {demoData.orderAnalyses.slice(0, 1).map((analysis, idx) => (
                            <Card
                                key={analysis.id}
                                variant={analysis.verdict === 'accept' ? 'success' : 'error'}
                                style={styles.analysisCardTop}
                            >
                                <View style={styles.analysisHeader}>
                                    <View style={styles.analysisPlatform}>
                                        <View style={[
                                            styles.analysisDot,
                                            { backgroundColor: analysis.verdict === 'accept' ? colors.success.main : colors.error.main },
                                        ]} />
                                        <Text variant="body" color="default" style={{ fontWeight: '700' }}>
                                            {analysis.platform.charAt(0).toUpperCase() + analysis.platform.slice(1)} • {analysis.verdict === 'accept' ? 'FAIR PAY' : 'LOW PAY'}
                                        </Text>
                                    </View>
                                    <Text variant="caption" color="tertiary">
                                        Just now
                                    </Text>
                                </View>

                                <View style={styles.analysisMetrics}>
                                    <View style={styles.metric}>
                                        <Text variant="caption" color="tertiary">Offer</Text>
                                        <Text variant="number" color="default">₹{analysis.platformOffer}</Text>
                                    </View>
                                    <View style={styles.metric}>
                                        <Text variant="caption" color="tertiary">Distance</Text>
                                        <Text variant="number" color="default">{analysis.distance}km</Text>
                                    </View>
                                    <View style={styles.metric}>
                                        <Text variant="caption" color="tertiary">Net</Text>
                                        <Text variant="number" color={analysis.verdict === 'accept' ? 'success' : 'error'}>
                                            ₹{analysis.netEarnings}
                                        </Text>
                                    </View>
                                </View>

                                <View style={styles.analysisActions}>
                                    <Button
                                        title="Reject"
                                        onPress={handleReject}
                                        variant="outline"
                                        size="sm"
                                        style={{ flex: 1, marginRight: 8, borderColor: colors.error.main }}
                                    />
                                    <Button
                                        title="Accept"
                                        onPress={handleAccept}
                                        variant="primary"
                                        size="sm"
                                        style={{ flex: 1, backgroundColor: colors.success.main }}
                                    />
                                </View>
                            </Card>
                        ))}
                    </Animated.View>
                )}

                {/* ─── Earnings Card ─── */}
                {todayEarnings ? (
                    <Animated.View entering={FadeInDown.delay(200).springify()}>
                        <Card variant="elevated" style={styles.earningsCard}>
                            <View style={styles.earningsTop}>
                                <View style={{ flex: 1 }}>
                                    <Text variant="label" color="tertiary">
                                        TODAY'S EARNINGS
                                    </Text>
                                    <AnimatedEarnings value={todayEarnings.earnings} />
                                </View>
                                {sparklineData.length > 2 && (
                                    <View style={styles.sparklineContainer}>
                                        <Text variant="caption" color="tertiary" style={{ marginBottom: 4 }}>7-DAY</Text>
                                        <Sparkline
                                            data={sparklineData}
                                            width={70}
                                            height={32}
                                            color={colors.success.main}
                                            showDots
                                        />
                                    </View>
                                )}
                            </View>

                            <View style={styles.statsRow}>
                                <View style={styles.statItem}>
                                    <OrderIcon size={16} color={colors.neutral.textSecondary} />
                                    <Text variant="number" color="default" style={styles.statValue}>
                                        {todayEarnings.orders}
                                    </Text>
                                    <Text variant="caption" color="tertiary">orders</Text>
                                </View>

                                <View style={styles.statDivider} />

                                <View style={styles.statItem}>
                                    <TimeIcon size={16} color={colors.neutral.textSecondary} />
                                    <Text variant="number" color="default" style={styles.statValue}>
                                        {todayEarnings.hoursActive.toFixed(1)}h
                                    </Text>
                                    <Text variant="caption" color="tertiary">active</Text>
                                </View>

                                <View style={styles.statDivider} />

                                <View style={styles.statItem}>
                                    <EarningsIcon size={16} color={colors.neutral.textSecondary} />
                                    <Text variant="number" color="default" style={styles.statValue}>
                                        ₹{Math.round(todayEarnings.avgPerHour)}
                                    </Text>
                                    <Text variant="caption" color="tertiary">/hour</Text>
                                </View>
                            </View>
                        </Card>
                    </Animated.View>
                ) : (
                    <Animated.View entering={FadeInDown.delay(200).springify()}>
                        <Card variant="outlined" style={styles.earningsCard}>
                            <EmptyState
                                title="No orders detected today"
                                message="Order data appears here as you complete deliveries."
                                icon={<OrderIcon size={32} color={colors.neutral.textSecondary} />}
                            />
                        </Card>
                    </Animated.View>
                )}

                {/* ─── Weekly Earnings Chart ─── */}
                {earningsBarData.length > 0 && (
                    <Animated.View entering={FadeInDown.delay(300).springify()}>
                        <Card variant="default" style={styles.chartCard}>
                            <Text variant="label" color="tertiary" style={styles.chartLabel}>
                                WEEKLY EARNINGS
                            </Text>
                            {/* Fix: Added padded container to prevent text clipping */}
                            <View style={styles.chartWrapper}>
                                <BarChart
                                    data={earningsBarData}
                                    height={120}
                                    showLabels
                                    showValues
                                    formatValue={(v) => `₹${v}`}
                                />
                            </View>
                        </Card>
                    </Animated.View>
                )}

                {/* ─── Quick Stats Row ─── */}
                <Animated.View entering={FadeInDown.delay(400).springify()} style={styles.statsGrid}>
                    <StatCard
                        label="WEEKLY AVG"
                        value={`₹${Math.round((earnings || []).reduce((a: number, e: any) => a + (e.totalEarnings || 0), 0) / Math.max((earnings || []).length, 1))}`}
                        trend="up"
                        trendValue="+5%"
                        sparklineData={sparklineData}
                    />
                    <StatCard
                        label="AVG/ORDER"
                        value={todayEarnings ? `₹${Math.round(todayEarnings.earnings / Math.max(todayEarnings.orders, 1))}` : '—'}
                        trend="neutral"
                        trendValue="stable"
                    />
                </Animated.View>

                {/* ─── Section 13 Rights ─── */}
                <Animated.View entering={FadeInDown.delay(500).springify()}>
                    <Card variant="success" style={styles.rightsCard}>
                        <View style={styles.rightsHeader}>
                            <CheckIcon size={18} color={colors.success.main} />
                            <Text variant="body" color="success" style={styles.rightsTitle}>
                                Section 13 Rights Protected
                            </Text>
                        </View>
                        <ProgressBar
                            progress={0.85}
                            height={4}
                            color={colors.success.main}
                            backgroundColor={colors.success.background}
                        />
                        <Text variant="caption" color="tertiary" style={styles.rightsDesc}>
                            Algorithmic transparency compliance: 85%
                        </Text>
                    </Card>
                </Animated.View>

            </ScrollView>
        </SafeAreaView>
    );
};

const homeStyles = StyleSheet.create({
    earningsValue: {
        marginTop: spacing.sm,
        fontSize: 40,
        fontWeight: '800',
    },
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.neutral.background,
    },
    scrollContent: {
        padding: spacing.base,
        paddingBottom: spacing['3xl'],
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: spacing.lg,
    },
    greeting: {
        marginTop: 2,
    },

    // Earnings
    earningsCard: {
        padding: spacing.lg,
        marginBottom: spacing.md,
    },
    earningsTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: spacing.lg,
    },
    sparklineContainer: {
        alignItems: 'flex-end',
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: spacing.md,
        borderTopWidth: 1,
        borderTopColor: colors.neutral.border,
    },
    statItem: {
        flex: 1,
        alignItems: 'center',
    },
    statValue: {
        marginTop: 4,
    },
    statDivider: {
        width: 1, height: 36,
        backgroundColor: colors.neutral.border,
    },

    // Chart
    chartCard: {
        padding: spacing.base,
        marginBottom: spacing.md,
    },
    chartLabel: {
        marginBottom: spacing.md,
    },
    chartWrapper: {
        paddingHorizontal: spacing.sm,
        paddingTop: spacing.xl, // INCREASED padding to fixing clipping
        height: 160, // Explicit height to ensure space
    },

    // Stats grid
    statsGrid: {
        flexDirection: 'row',
        gap: spacing.sm,
        marginBottom: spacing.lg,
    },

    // Rights
    rightsCard: {
        padding: spacing.md,
        marginBottom: spacing.lg,
    },
    rightsHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.sm,
    },
    rightsTitle: {
        marginLeft: spacing.sm,
        fontWeight: '600',
    },
    rightsDesc: {
        marginTop: spacing.sm,
    },

    // Analysis (Top)
    sectionHeaderRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.sm,
    },
    sectionTitleInline: {
        marginLeft: spacing.sm,
    },
    analysisCardTop: {
        padding: spacing.md,
        marginBottom: spacing.lg,
        borderLeftWidth: 4,
        borderLeftColor: colors.success.main, // default
    },
    analysisHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.md,
    },
    analysisPlatform: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    analysisDot: {
        width: 8, height: 8, borderRadius: 4,
        marginRight: 8,
    },
    analysisMetrics: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: spacing.sm,
    },
    metric: {
        alignItems: 'center',
    },
    analysisActions: {
        flexDirection: 'row',
        marginTop: spacing.md,
    },
    predictionBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.primary.subtle,
        padding: spacing.sm,
        borderRadius: 8,
        marginBottom: spacing.md,
    },
});

export default HomeScreen;
