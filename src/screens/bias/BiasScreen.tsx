/**
 * Suvidha AI - Fairness (Bias) Screen
 * 
 * Simplified for gig workers.
 * Features:
 * - Simple language
 * - Peer comparison
 */

import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import { Text, Card, EmptyState, LoadingState, DemoBadge } from '@components/ui';
import { BiasIcon, AlertIcon, CheckIcon } from '@components/ui/Icons';
import { ComparisonBar, StatCard } from '@components/ui/Graph';
import { colors } from '@theme/colors';
import { spacing } from '@theme/spacing';
import { useAppSelector } from '@store/index';

const BiasScreen: React.FC = () => {
    const isDemo = useAppSelector((state) => state.demo.isActive);
    const demoBias = useAppSelector((state) => state.demo.bias);
    const realBias = useAppSelector((state) => state.bias);

    const bias = isDemo ? demoBias : realBias.bias;
    const isLoading = !isDemo && realBias.isLoading;
    const hasInsufficientData = !isDemo && realBias.hasInsufficientData;

    if (isLoading) {
        return <LoadingState message="Checking fairness..." />;
    }

    const hasData = !!bias;

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {/* Header */}
                <Animated.View entering={FadeIn.duration(500)} style={styles.header}>
                    <View style={styles.titleRow}>
                        <BiasIcon size={28} color={colors.accent.purple} />
                        <Text variant="h2" color="default" style={styles.title}>Fairness Check</Text>
                    </View>
                    {/* Removed duplicate DemoBadge */}
                </Animated.View>

                {/* Warning */}
                {hasInsufficientData && !isDemo && (
                    <Animated.View entering={FadeInDown.springify()}>
                        <Card variant="warning" style={styles.warningCard}>
                            <View style={styles.warningRow}>
                                <AlertIcon size={20} color={colors.warning.main} />
                                <Text variant="body" color="warning" style={styles.warningTitle}>
                                    Needs More Data
                                </Text>
                            </View>
                            <Text variant="bodySmall" color="secondary">
                                Complete at least 50 orders to check if you are being treated fairly.
                            </Text>
                        </Card>
                    </Animated.View>
                )}

                {hasData ? (
                    <>
                        {/* Summary Status */}
                        <Animated.View entering={FadeInDown.delay(100).springify()}>
                            <Card variant={bias.status === 'fair' ? 'success' : bias.status === 'unfair' ? 'error' : 'warning'} style={styles.statusCard}>
                                <View style={styles.statusHeader}>
                                    <View style={styles.statusIconBg}>
                                        {bias.status === 'fair' ? (
                                            <CheckIcon size={32} color={colors.success.main} />
                                        ) : (
                                            <AlertIcon size={32} color={colors.error.main} />
                                        )}
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <Text variant="h3" color="default" style={{ fontWeight: '700' }}>
                                            {bias.status === 'fair' ? 'FAIR' : bias.status === 'unfair' ? 'UNFAIR' : 'BORDERLINE'}
                                        </Text>
                                        <Text variant="body" color="secondary">
                                            {bias.status === 'fair'
                                                ? 'Your earnings are good compared to others.'
                                                : 'You are earning less than others for same work.'}
                                        </Text>
                                    </View>
                                </View>
                            </Card>
                        </Animated.View>

                        {/* Comparison Visual */}
                        <Animated.View entering={FadeInDown.delay(200).springify()} style={{ marginVertical: spacing.lg }}>
                            <Text variant="h4" color="default" style={styles.sectionTitle}>
                                vs Others
                            </Text>
                            <Card variant="default" style={styles.comparisonCard}>
                                <ComparisonBar
                                    label="Hourly Earnings"
                                    yourValue={bias.peerComparison.yourAvg}
                                    peerValue={bias.peerComparison.peerAvg}
                                    formatValue={(v) => `₹${v.toFixed(0)}`}
                                />
                                <Text variant="caption" color="tertiary" style={styles.comparisonDesc}>
                                    You earn ₹{bias.peerComparison.difference > 0 ? '+' : ''}{bias.peerComparison.difference.toFixed(0)} than average in your area.
                                </Text>
                            </Card>
                        </Animated.View>

                        {/* Reasons */}
                        <Animated.View entering={FadeInDown.delay(300).springify()}>
                            <Text variant="h4" color="default" style={styles.sectionTitle}>
                                Reasons
                            </Text>
                            {bias.factors.map((factor, i) => (
                                <Card key={i} variant="glass" style={styles.factorCard}>
                                    <View style={styles.factorHeader}>
                                        <Text variant="body" color="default" style={styles.factorName}>
                                            {factor.name}
                                        </Text>
                                        <View style={[
                                            styles.impactBadge,
                                            { backgroundColor: factor.impact === 'positive' ? colors.success.background : factor.impact === 'negative' ? colors.error.background : colors.neutral.surfaceElevated }
                                        ]}>
                                            <Text variant="caption" color={factor.impact === 'positive' ? 'success' : factor.impact === 'negative' ? 'error' : 'secondary'}>
                                                {factor.impact.toUpperCase()}
                                            </Text>
                                        </View>
                                    </View>
                                    <Text variant="bodySmall" color="secondary">
                                        {factor.description}
                                    </Text>
                                </Card>
                            ))}
                        </Animated.View>

                        <Text variant="caption" color="tertiary" align="center" style={{ marginTop: spacing.xl }}>
                            Based on {bias.ordersAnalyzed} orders analyzed.
                        </Text>
                    </>
                ) : !hasInsufficientData && (
                    <EmptyState
                        title="No data yet"
                        message="Start working to generate fairness report."
                        icon={<BiasIcon size={48} color={colors.neutral.textSecondary} />}
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
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        marginLeft: spacing.sm,
    },

    // Warning
    warningCard: {
        padding: spacing.md,
        marginBottom: spacing.lg,
    },
    warningRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.xs,
    },
    warningTitle: {
        marginLeft: spacing.sm,
        fontWeight: '600',
    },

    // Status
    statusCard: {
        padding: spacing.lg,
        marginBottom: spacing.md,
    },
    statusHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statusIconBg: {
        width: 60, height: 60,
        borderRadius: 30,
        backgroundColor: colors.neutral.surfaceElevated,
        alignItems: 'center', justifyContent: 'center',
        marginRight: spacing.lg,
    },

    // Comparison
    sectionTitle: {
        marginBottom: spacing.md,
    },
    comparisonCard: {
        padding: spacing.lg,
    },
    comparisonDesc: {
        marginTop: spacing.md,
        textAlign: 'center',
    },

    // Factor
    factorCard: {
        padding: spacing.md,
        marginBottom: spacing.sm,
    },
    factorHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.xs,
    },
    factorName: {
        fontWeight: '600',
    },
    impactBadge: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
    },
});

export default BiasScreen;
