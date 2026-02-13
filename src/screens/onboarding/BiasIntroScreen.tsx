/**
 * Suvidha AI - Onboarding: Bias Introduction
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Button, Card } from '@components/ui';
import { BiasIcon, CheckIcon } from '@components/ui/Icons';
import { colors } from '@theme/colors';
import { spacing } from '@theme/spacing';
import { OnboardingStackParamList } from '@navigation/types';

type NavigationProp = StackNavigationProp<OnboardingStackParamList, 'BiasIntro'>;

const BiasIntroScreen: React.FC = () => {
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
                    <View style={styles.dot} />
                    <View style={styles.dot} />
                    <View style={[styles.dot, styles.dotActive]} />
                    <View style={styles.dot} />
                </View>

                {/* Icon */}
                <View style={styles.iconContainer}>
                    <View style={styles.iconCircle}>
                        <BiasIcon size={48} color={colors.primary.main} />
                    </View>
                </View>

                {/* Title */}
                <Text variant="h2" align="center" style={styles.title}>
                    Bias Detection
                </Text>
                <Text variant="body" color="secondary" align="center" style={styles.description}>
                    Compare your earnings with anonymized peer data to detect unfair treatment.
                </Text>

                {/* Preview Card */}
                <Card variant="elevated" style={styles.previewCard}>
                    <Text variant="caption" color="tertiary" style={styles.previewLabel}>
                        FAIRNESS ANALYSIS
                    </Text>

                    {/* Comparison Bars */}
                    <View style={styles.comparisonContainer}>
                        <View style={styles.comparisonRow}>
                            <Text variant="caption" color="secondary">You</Text>
                            <View style={styles.barTrack}>
                                <View style={[styles.barFill, styles.barYou, { width: '78%' }]} />
                            </View>
                            <Text variant="number" color="default">₹135/hr</Text>
                        </View>

                        <View style={styles.comparisonRow}>
                            <Text variant="caption" color="secondary">Peers</Text>
                            <View style={styles.barTrack}>
                                <View style={[styles.barFill, styles.barPeers, { width: '72%' }]} />
                            </View>
                            <Text variant="number" color="tertiary">₹132/hr</Text>
                        </View>
                    </View>

                    {/* Verdict */}
                    <View style={styles.verdictContainer}>
                        <View style={styles.verdictBadge}>
                            <CheckIcon size={16} color={colors.success.main} />
                            <Text variant="label" color="success" style={styles.verdictText}>
                                Fair Treatment Detected
                            </Text>
                        </View>
                    </View>

                    {/* Factors */}
                    <View style={styles.factorsContainer}>
                        <Text variant="caption" color="tertiary" style={styles.factorsLabel}>
                            FACTORS ANALYZED
                        </Text>
                        <Text variant="bodySmall" color="secondary">
                            Distance ratio • Peak hours • Order allocation • Zone patterns
                        </Text>
                    </View>
                </Card>

                {/* CTA */}
                <View style={styles.ctaContainer}>
                    <Button
                        title="Next"
                        onPress={() => navigation.navigate('CollectiveIntro')}
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
    comparisonContainer: {
        marginBottom: spacing.lg,
    },
    comparisonRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.sm,
    },
    barTrack: {
        flex: 1,
        height: 8,
        backgroundColor: colors.neutral.border,
        borderRadius: 4,
        marginHorizontal: spacing.md,
    },
    barFill: {
        height: '100%',
        borderRadius: 4,
    },
    barYou: {
        backgroundColor: colors.success.main,
    },
    barPeers: {
        backgroundColor: colors.neutral.textSecondary,
    },
    verdictContainer: {
        alignItems: 'center',
        paddingVertical: spacing.md,
        borderTopWidth: 1,
        borderTopColor: colors.neutral.border,
        marginBottom: spacing.md,
    },
    verdictBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.success.background,
        paddingVertical: spacing.xs,
        paddingHorizontal: spacing.md,
        borderRadius: 20,
    },
    verdictText: {
        marginLeft: spacing.xs,
    },
    factorsContainer: {
        alignItems: 'center',
    },
    factorsLabel: {
        marginBottom: spacing.xs,
    },
    ctaContainer: {
        marginTop: 'auto',
        paddingTop: spacing.xl,
    },
});

export default BiasIntroScreen;
