/**
 * Suvidha AI - Onboarding: Forecast Introduction
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Button, Card } from '@components/ui';
import { ForecastIcon } from '@components/ui/Icons';
import { colors } from '@theme/colors';
import { spacing } from '@theme/spacing';
import { OnboardingStackParamList } from '@navigation/types';

type NavigationProp = StackNavigationProp<OnboardingStackParamList, 'ForecastIntro'>;

const ForecastIntroScreen: React.FC = () => {
    const navigation = useNavigation<NavigationProp>();

    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const values = [65, 72, 58, 80, 90, 95, 75];
    const maxValue = Math.max(...values);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                {/* Skip Button */}
                <View style={styles.skipContainer}>
                    <Button
                        title="Skip"
                        onPress={() => navigation.navigate('CollectiveIntro')}
                        variant="ghost"
                        size="sm"
                    />
                </View>

                {/* Page Indicator */}
                <View style={styles.pageIndicator}>
                    <View style={styles.dot} />
                    <View style={[styles.dot, styles.dotActive]} />
                    <View style={styles.dot} />
                    <View style={styles.dot} />
                </View>

                {/* Icon */}
                <View style={styles.iconContainer}>
                    <View style={styles.iconCircle}>
                        <ForecastIcon size={48} color={colors.primary.main} />
                    </View>
                </View>

                {/* Title */}
                <Text variant="h2" align="center" style={styles.title}>
                    7-Day Forecast
                </Text>
                <Text variant="body" color="secondary" align="center" style={styles.description}>
                    AI-powered predictions based on your work patterns, zone data, and market trends.
                </Text>

                {/* Preview Chart */}
                <Card variant="elevated" style={styles.previewCard}>
                    <Text variant="caption" color="tertiary" style={styles.previewLabel}>
                        NEXT WEEK PREDICTION
                    </Text>

                    <View style={styles.chartContainer}>
                        {days.map((day, index) => (
                            <View key={day} style={styles.barContainer}>
                                <View style={styles.barWrapper}>
                                    <View
                                        style={[
                                            styles.bar,
                                            { height: `${(values[index] / maxValue) * 100}%` },
                                            index === 5 && styles.barPeak,
                                        ]}
                                    />
                                </View>
                                <Text variant="caption" color="tertiary" style={styles.dayLabel}>
                                    {day}
                                </Text>
                            </View>
                        ))}
                    </View>

                    <View style={styles.forecastSummary}>
                        <View style={styles.summaryItem}>
                            <Text variant="caption" color="tertiary">
                                Weekly Total
                            </Text>
                            <Text variant="number" color="default">
                                ₹6,800
                            </Text>
                        </View>
                        <View style={styles.summaryItem}>
                            <Text variant="caption" color="tertiary">
                                Best Day
                            </Text>
                            <Text variant="number" color="success">
                                Saturday
                            </Text>
                        </View>
                    </View>
                </Card>

                {/* CTA */}
                <View style={styles.ctaContainer}>
                    <Button
                        title="Next"
                        onPress={() => navigation.navigate('BiasIntro')}
                        fullWidth
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.neutral.background,
    },
    content: {
        flex: 1,
        padding: spacing.xl,
    },
    skipContainer: {
        alignItems: 'flex-end',
    },
    pageIndicator: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: spacing.sm,
        marginTop: spacing.lg,
        marginBottom: spacing['2xl'],
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: colors.neutral.border,
    },
    dotActive: {
        backgroundColor: colors.primary.main,
        width: 24,
    },
    iconContainer: {
        alignItems: 'center',
        marginBottom: spacing.xl,
    },
    iconCircle: {
        width: 96,
        height: 96,
        borderRadius: 48,
        backgroundColor: colors.neutral.surface,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: colors.neutral.border,
    },
    title: {
        marginBottom: spacing.md,
    },
    description: {
        marginBottom: spacing['2xl'],
        paddingHorizontal: spacing.lg,
    },
    previewCard: {
        padding: spacing.lg,
    },
    previewLabel: {
        marginBottom: spacing.lg,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    chartContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 120,
        marginBottom: spacing.lg,
    },
    barContainer: {
        flex: 1,
        alignItems: 'center',
    },
    barWrapper: {
        flex: 1,
        width: '60%',
        justifyContent: 'flex-end',
    },
    bar: {
        width: '100%',
        backgroundColor: colors.neutral.border,
        borderRadius: 4,
    },
    barPeak: {
        backgroundColor: colors.success.main,
    },
    dayLabel: {
        marginTop: spacing.xs,
    },
    forecastSummary: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingTop: spacing.md,
        borderTopWidth: 1,
        borderTopColor: colors.neutral.border,
    },
    summaryItem: {
        alignItems: 'center',
    },
    ctaContainer: {
        marginTop: 'auto',
        paddingTop: spacing.xl,
    },
});

export default ForecastIntroScreen;
