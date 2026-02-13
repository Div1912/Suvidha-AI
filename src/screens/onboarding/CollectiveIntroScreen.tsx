/**
 * Suvidha AI - Onboarding: Collective/Unite Introduction
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, Button, Card } from '@components/ui';
import { UniteIcon } from '@components/ui/Icons';
import { colors } from '@theme/colors';
import { spacing } from '@theme/spacing';

const CollectiveIntroScreen: React.FC = () => {
    const navigation = useNavigation();

    const handleGetStarted = async () => {
        // Mark onboarding as complete
        await AsyncStorage.setItem('onboarding_complete', 'true');
        // Navigation will automatically switch to Main via RootNavigator
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                {/* Page Indicator */}
                <View style={styles.pageIndicator}>
                    <View style={styles.dot} />
                    <View style={styles.dot} />
                    <View style={styles.dot} />
                    <View style={[styles.dot, styles.dotActive]} />
                </View>

                {/* Icon */}
                <View style={styles.iconContainer}>
                    <View style={styles.iconCircle}>
                        <UniteIcon size={48} color={colors.primary.main} />
                    </View>
                </View>

                {/* Title */}
                <Text variant="h2" align="center" style={styles.title}>
                    Collective Action
                </Text>
                <Text variant="body" color="secondary" align="center" style={styles.description}>
                    Join coordinated campaigns with fellow workers. Know your rights under Section 13 of the Social Security Code.
                </Text>

                {/* Rights Card */}
                <Card variant="outlined" style={styles.rightsCard}>
                    <Text variant="label" color="primary" style={styles.rightsLabel}>
                        YOUR RIGHTS UNDER SECTION 13
                    </Text>

                    <View style={styles.rightsList}>
                        <View style={styles.rightItem}>
                            <View style={styles.rightBullet} />
                            <Text variant="body" color="default">
                                Fair and transparent algorithmic decision-making
                            </Text>
                        </View>
                        <View style={styles.rightItem}>
                            <View style={styles.rightBullet} />
                            <Text variant="body" color="default">
                                Access to grievance redressal mechanisms
                            </Text>
                        </View>
                        <View style={styles.rightItem}>
                            <View style={styles.rightBullet} />
                            <Text variant="body" color="default">
                                Protection against arbitrary deactivation
                            </Text>
                        </View>
                        <View style={styles.rightItem}>
                            <View style={styles.rightBullet} />
                            <Text variant="body" color="default">
                                Right to collective bargaining
                            </Text>
                        </View>
                    </View>
                </Card>

                {/* CTA */}
                <View style={styles.ctaContainer}>
                    <Button
                        title="Get Started"
                        onPress={handleGetStarted}
                        fullWidth
                    />
                    <Text variant="caption" color="tertiary" align="center" style={styles.ctaHint}>
                        You're ready to use Suvidha AI
                    </Text>
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
        paddingHorizontal: spacing.base,
    },
    rightsCard: {
        padding: spacing.lg,
    },
    rightsLabel: {
        marginBottom: spacing.md,
    },
    rightsList: {
        gap: spacing.md,
    },
    rightItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    rightBullet: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: colors.primary.main,
        marginTop: 8,
        marginRight: spacing.md,
    },
    ctaContainer: {
        marginTop: 'auto',
        paddingTop: spacing.xl,
    },
    ctaHint: {
        marginTop: spacing.md,
    },
});

export default CollectiveIntroScreen;
