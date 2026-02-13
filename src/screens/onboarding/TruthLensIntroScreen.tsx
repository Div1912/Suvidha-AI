/**
 * Suvidha AI - Onboarding: Truth Lens Introduction
 * 
 * Explains notification breakdown feature
 */

import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Button, Card } from '@components/ui';
import { TruthLensIcon, EarningsIcon, DistanceIcon, FuelIcon, TimeIcon } from '@components/ui/Icons';
import { colors } from '@theme/colors';
import { spacing, borderRadius } from '@theme/spacing';
import { OnboardingStackParamList } from '@navigation/types';

type NavigationProp = StackNavigationProp<OnboardingStackParamList, 'TruthLensIntro'>;

const TruthLensIntroScreen: React.FC = () => {
    const navigation = useNavigation<NavigationProp>();

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
                    <View style={[styles.dot, styles.dotActive]} />
                    <View style={styles.dot} />
                    <View style={styles.dot} />
                    <View style={styles.dot} />
                </View>

                {/* Icon */}
                <View style={styles.iconContainer}>
                    <View style={styles.iconCircle}>
                        <TruthLensIcon size={48} color={colors.primary.main} />
                    </View>
                </View>

                {/* Title */}
                <Text variant="h2" align="center" style={styles.title}>
                    Truth Lens
                </Text>
                <Text variant="body" color="secondary" align="center" style={styles.description}>
                    Every order notification gets analyzed in real-time to show you the true value.
                </Text>

                {/* Preview Card */}
                <Card variant="elevated" style={styles.previewCard}>
                    <Text variant="caption" color="tertiary" style={styles.previewLabel}>
                        EXAMPLE BREAKDOWN
                    </Text>

                    <View style={styles.previewRow}>
                        <View style={styles.previewItem}>
                            <EarningsIcon size={20} color={colors.success.main} />
                            <Text variant="caption" color="secondary" style={styles.previewItemLabel}>
                                Platform Offer
                            </Text>
                            <Text variant="number" color="success">
                                ₹85
                            </Text>
                        </View>

                        <View style={styles.previewItem}>
                            <DistanceIcon size={20} color={colors.neutral.textSecondary} />
                            <Text variant="caption" color="secondary" style={styles.previewItemLabel}>
                                Distance
                            </Text>
                            <Text variant="number" color="default">
                                4.2 km
                            </Text>
                        </View>
                    </View>

                    <View style={styles.previewRow}>
                        <View style={styles.previewItem}>
                            <TimeIcon size={20} color={colors.neutral.textSecondary} />
                            <Text variant="caption" color="secondary" style={styles.previewItemLabel}>
                                Est. Time
                            </Text>
                            <Text variant="number" color="default">
                                25 min
                            </Text>
                        </View>

                        <View style={styles.previewItem}>
                            <FuelIcon size={20} color={colors.error.main} />
                            <Text variant="caption" color="secondary" style={styles.previewItemLabel}>
                                Fuel Cost
                            </Text>
                            <Text variant="number" color="error">
                                -₹18
                            </Text>
                        </View>
                    </View>

                    <View style={styles.netEarnings}>
                        <Text variant="label" color="secondary">
                            NET EARNINGS
                        </Text>
                        <Text variant="numberLarge" color="success">
                            ₹67
                        </Text>
                    </View>
                </Card>

                {/* CTA */}
                <View style={styles.ctaContainer}>
                    <Button
                        title="Next"
                        onPress={() => navigation.navigate('ForecastIntro')}
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
        marginBottom: spacing.md,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    previewRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: spacing.md,
    },
    previewItem: {
        flex: 1,
        alignItems: 'center',
    },
    previewItemLabel: {
        marginTop: spacing.xs,
        marginBottom: spacing.xs,
    },
    netEarnings: {
        alignItems: 'center',
        paddingTop: spacing.md,
        borderTopWidth: 1,
        borderTopColor: colors.neutral.border,
        marginTop: spacing.sm,
    },
    ctaContainer: {
        marginTop: 'auto',
        paddingTop: spacing.xl,
    },
});

export default TruthLensIntroScreen;
