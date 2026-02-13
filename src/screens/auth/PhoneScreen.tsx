/**
 * Suvidha AI - Landing Screen (Phone Input)
 * 
 * Premium landing experience with animated visual hero,
 * typewriter text effect, glassmorphism input card,
 * and floating data preview cards.
 */

import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withRepeat,
    withDelay,
    withSequence,
    withSpring,
    Easing,
    FadeIn,
    FadeInDown,
    FadeInUp,
    SlideInDown,
} from 'react-native-reanimated';
import { Text, Button, Card } from '@components/ui';
import { colors } from '@theme/colors';
import { spacing, borderRadius } from '@theme/spacing';
import { AuthStackParamList } from '@navigation/types';
import { useAppDispatch } from '@store/index';
import { setPhone } from '@store/slices/authSlice';
import { activateDemo } from '@store/slices/demoSlice';
import { EarningsIcon, ForecastIcon, BiasIcon, TruthLensIcon } from '@components/ui/Icons';

type NavigationProp = StackNavigationProp<AuthStackParamList, 'Phone'>;

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// ─── Animated Orb Background ────────────────────────────────────

const FloatingOrb: React.FC<{
    size: number; color: string; initialX: number; initialY: number; delay: number;
}> = ({ size, color, initialX, initialY, delay }) => {
    const translateY = useSharedValue(0);
    const opacity = useSharedValue(0);

    useEffect(() => {
        opacity.value = withDelay(delay, withTiming(1, { duration: 1000 }));
        translateY.value = withDelay(
            delay,
            withRepeat(
                withSequence(
                    withTiming(-20, { duration: 3000, easing: Easing.inOut(Easing.ease) }),
                    withTiming(20, { duration: 3000, easing: Easing.inOut(Easing.ease) })
                ),
                -1,
                true
            )
        );
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: translateY.value }],
        opacity: opacity.value,
    }));

    return (
        <Animated.View
            style={[
                animatedStyle,
                {
                    position: 'absolute',
                    width: size, height: size,
                    borderRadius: size / 2,
                    backgroundColor: color,
                    left: initialX, top: initialY,
                },
            ]}
        />
    );
};

// ─── Typewriter Text ────────────────────────────────────────────

const TypewriterText: React.FC<{ text: string; delay?: number }> = ({ text, delay = 0 }) => {
    const [displayText, setDisplayText] = useState('');
    const [started, setStarted] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setStarted(true), delay);
        return () => clearTimeout(timer);
    }, [delay]);

    useEffect(() => {
        if (!started) return;
        let index = 0;
        const interval = setInterval(() => {
            if (index <= text.length) {
                setDisplayText(text.slice(0, index));
                index++;
            } else {
                clearInterval(interval);
            }
        }, 40);
        return () => clearInterval(interval);
    }, [started, text]);

    return (
        <Text variant="body" color="secondary" style={heroStyles.typewriterText}>
            {displayText}
            {displayText.length < text.length && (
                <Text variant="body" color="primary">|</Text>
            )}
        </Text>
    );
};

// ─── Floating Feature Card ──────────────────────────────────────

const FeatureCard: React.FC<{
    icon: React.ReactNode; label: string; value: string; delay: number;
}> = ({ icon, label, value, delay }) => (
    <Animated.View
        entering={FadeInDown.delay(delay).springify().damping(12)}
        style={heroStyles.featureCard}
    >
        <View style={heroStyles.featureIcon}>{icon}</View>
        <View>
            <Text variant="caption" color="tertiary">{label}</Text>
            <Text variant="number" color="default">{value}</Text>
        </View>
    </Animated.View>
);

// ─── Main Screen ────────────────────────────────────────────────

const PhoneScreen: React.FC = () => {
    const navigation = useNavigation<NavigationProp>();
    const dispatch = useAppDispatch();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const validatePhone = (phone: string): boolean => {
        const cleanPhone = phone.replace(/\D/g, '');
        return cleanPhone.length === 10;
    };

    const handleContinue = async () => {
        if (!phoneNumber.trim()) {
            setError('Please enter your phone number');
            return;
        }
        if (!validatePhone(phoneNumber)) {
            setError('Please enter a valid 10-digit number');
            return;
        }
        setIsLoading(true);
        setError('');
        try {
            dispatch(setPhone(phoneNumber));
            navigation.navigate('OTP', { phone: phoneNumber });
        } catch (err) {
            setError('Failed to send OTP. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDemoMode = () => {
        dispatch(activateDemo());
    };

    return (
        <View style={styles.container}>
            {/* Animated Background Orbs */}
            <View style={styles.orbContainer}>
                <FloatingOrb size={200} color={colors.primary.glow} initialX={-50} initialY={50} delay={0} />
                <FloatingOrb size={150} color="rgba(79, 142, 255, 0.15)" initialX={SCREEN_WIDTH - 100} initialY={150} delay={500} />
                <FloatingOrb size={120} color="rgba(139, 92, 246, 0.12)" initialX={50} initialY={SCREEN_HEIGHT * 0.4} delay={1000} />
            </View>

            <SafeAreaView style={styles.safeArea}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.keyboardView}
                >
                    <ScrollView
                        contentContainerStyle={styles.scrollContent}
                        keyboardShouldPersistTaps="handled"
                        showsVerticalScrollIndicator={false}
                    >
                        {/* ─── Hero Section ─── */}
                        <Animated.View entering={FadeIn.duration(800)} style={styles.heroSection}>
                            {/* Brand Logo */}
                            <Animated.View
                                entering={FadeInDown.delay(200).springify()}
                                style={styles.logoContainer}
                            >
                                <View style={styles.logoMark}>
                                    <View style={styles.logoBar1} />
                                    <View style={styles.logoBar2} />
                                    <View style={styles.logoBar3} />
                                    <View style={styles.logoDot} />
                                </View>
                            </Animated.View>

                            <Animated.View entering={FadeInDown.delay(400).springify()}>
                                <Text variant="h1" color="default" align="center" style={styles.brandName}>
                                    Suvidha AI
                                </Text>
                            </Animated.View>

                            <Animated.View entering={FadeInDown.delay(600).springify()}>
                                <TypewriterText
                                    text="Real-time algorithmic transparency for gig workers"
                                    delay={800}
                                />
                            </Animated.View>
                        </Animated.View>

                        {/* ─── Auth Card (Glass) ─── */}
                        <Animated.View
                            entering={FadeInUp.delay(1800).springify().damping(14)}
                            style={styles.authCard}
                        >
                            <Text variant="h4" color="default" style={styles.authTitle}>
                                Get Started
                            </Text>
                            <Text variant="bodySmall" color="secondary" style={styles.authSubtitle}>
                                Enter your phone to start tracking your earnings
                            </Text>

                            {/* Phone Input */}
                            <View style={styles.phoneInputRow}>
                                <View style={styles.countryCode}>
                                    <Text variant="body" color="tertiary">+91</Text>
                                </View>
                                <View style={styles.phoneInput}>
                                    <Animated.View style={styles.inputWrapper}>
                                        <View style={styles.textInputContainer}>
                                            <Text
                                                variant="body"
                                                color={phoneNumber ? 'default' : 'tertiary'}
                                                style={styles.inputText}
                                                onPress={() => { }}
                                            >
                                                {phoneNumber || 'Phone number'}
                                            </Text>
                                        </View>
                                    </Animated.View>
                                </View>
                            </View>

                            {/* Actual hidden input for keyboard */}
                            <View style={styles.hiddenInputContainer}>
                                <View style={styles.realInputWrapper}>
                                    <Text variant="caption" color="tertiary" style={{ marginBottom: 6 }}>
                                        PHONE NUMBER
                                    </Text>
                                    <View style={styles.realInput}>
                                        <Text variant="body" color="tertiary" style={styles.prefix}>+91</Text>
                                        <View style={styles.inputDivider} />
                                        <View style={{ flex: 1 }}>
                                            <RNTextInput
                                                value={phoneNumber}
                                                onChangeText={(text: string) => {
                                                    setPhoneNumber(text.replace(/\D/g, ''));
                                                    setError('');
                                                }}
                                                keyboardType="phone-pad"
                                                maxLength={10}
                                                placeholder="Enter 10-digit number"
                                                placeholderTextColor={colors.neutral.textTertiary}
                                                style={styles.nativeInput}
                                            />
                                        </View>
                                    </View>
                                </View>
                            </View>

                            {error ? (
                                <Text variant="caption" color="error" style={styles.errorText}>{error}</Text>
                            ) : null}

                            <Button
                                title="Continue"
                                onPress={handleContinue}
                                loading={isLoading}
                                disabled={!phoneNumber.trim()}
                                fullWidth
                                style={styles.continueButton}
                            />

                            {/* Divider */}
                            <View style={styles.divider}>
                                <View style={styles.dividerLine} />
                                <Text variant="caption" color="tertiary" style={styles.dividerText}>
                                    or explore first
                                </Text>
                                <View style={styles.dividerLine} />
                            </View>

                            <Button
                                title="Try Demo Mode"
                                onPress={handleDemoMode}
                                variant="outline"
                                fullWidth
                            />
                            <Text variant="caption" color="tertiary" align="center" style={styles.demoHint}>
                                Explore with sample data • No sign-up needed
                            </Text>
                        </Animated.View>

                        {/* Footer */}
                        <Animated.View entering={FadeIn.delay(2200)} style={styles.footer}>
                            <Text variant="caption" color="tertiary" align="center">
                                By continuing, you agree to our Terms of Service{'\n'}and Privacy Policy
                            </Text>
                        </Animated.View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </View>
    );
};

// Import for native text input
import { TextInput as RNTextInput } from 'react-native';

const heroStyles = StyleSheet.create({
    typewriterText: {
        textAlign: 'center',
        marginTop: spacing.sm,
        paddingHorizontal: spacing.lg,
        minHeight: 22,
    },
    featureCard: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.neutral.glass,
        borderWidth: 1,
        borderColor: colors.neutral.glassBorder,
        borderRadius: borderRadius.lg,
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.md,
        gap: spacing.sm,
    },
    featureIcon: {
        width: 36,
        height: 36,
        borderRadius: 10,
        backgroundColor: colors.neutral.surfaceElevated,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.neutral.background,
    },
    orbContainer: {
        ...StyleSheet.absoluteFillObject,
        overflow: 'hidden',
    },
    safeArea: {
        flex: 1,
    },
    keyboardView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: spacing.lg,
        paddingBottom: spacing.xl,
    },

    // Hero
    heroSection: {
        alignItems: 'center',
        paddingTop: spacing['2xl'],
        marginBottom: spacing.xl,
    },
    logoContainer: {
        marginBottom: spacing.lg,
    },
    logoMark: {
        width: 64,
        height: 64,
        borderRadius: 20,
        backgroundColor: colors.neutral.surface,
        borderWidth: 1,
        borderColor: colors.neutral.glassBorder,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 4,
    },
    logoBar1: {
        width: 6, height: 20,
        backgroundColor: colors.primary.main,
        borderRadius: 3,
        opacity: 0.6,
    },
    logoBar2: {
        width: 6, height: 30,
        backgroundColor: colors.primary.main,
        borderRadius: 3,
    },
    logoBar3: {
        width: 6, height: 24,
        backgroundColor: colors.primary.light,
        borderRadius: 3,
        opacity: 0.8,
    },
    logoDot: {
        width: 6, height: 6,
        backgroundColor: colors.accent.blue,
        borderRadius: 3,
        position: 'absolute',
        top: 14,
        right: 14,
    },
    brandName: {
        fontSize: 36,
        fontWeight: '800',
        letterSpacing: -1,
    },

    // Preview cards
    previewRow: {
        flexDirection: 'row',
        gap: spacing.sm,
        marginBottom: spacing.sm,
    },

    // Auth card
    authCard: {
        backgroundColor: colors.neutral.glass,
        borderWidth: 1,
        borderColor: colors.neutral.glassBorder,
        borderRadius: borderRadius.xl,
        padding: spacing.lg,
        marginTop: spacing.lg,
    },
    authTitle: {
        marginBottom: 4,
    },
    authSubtitle: {
        marginBottom: spacing.lg,
    },
    phoneInputRow: {
        display: 'none', // Hidden — using real input below
    },
    countryCode: {
        height: 52,
        paddingHorizontal: spacing.md,
        backgroundColor: colors.neutral.surfaceElevated,
        borderRadius: borderRadius.lg,
        borderWidth: 1,
        borderColor: colors.neutral.glassBorder,
        alignItems: 'center',
        justifyContent: 'center',
    },
    phoneInput: {
        flex: 1,
    },
    inputWrapper: {
        height: 52,
        backgroundColor: colors.neutral.surfaceElevated,
        borderRadius: borderRadius.lg,
        borderWidth: 1,
        borderColor: colors.neutral.glassBorder,
        justifyContent: 'center',
        paddingHorizontal: spacing.md,
    },
    textInputContainer: {},
    inputText: {},
    hiddenInputContainer: {
        // Visible — this is the actual input
    },
    realInputWrapper: {
        marginBottom: spacing.md,
    },
    realInput: {
        height: 52,
        backgroundColor: colors.neutral.surfaceElevated,
        borderRadius: borderRadius.lg,
        borderWidth: 1,
        borderColor: colors.neutral.glassBorder,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: spacing.md,
    },
    prefix: {
        marginRight: spacing.sm,
    },
    inputDivider: {
        width: 1,
        height: 24,
        backgroundColor: colors.neutral.border,
        marginRight: spacing.sm,
    },
    nativeInput: {
        flex: 1,
        height: 52,
        color: colors.neutral.text,
        fontSize: 16,
        fontWeight: '500',
        padding: 0,
    },
    errorText: {
        marginBottom: spacing.sm,
        marginTop: -spacing.sm,
    },
    continueButton: {
        marginBottom: spacing.lg,
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.md,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: colors.neutral.border,
    },
    dividerText: {
        marginHorizontal: spacing.md,
    },
    demoHint: {
        marginTop: spacing.sm,
    },
    footer: {
        paddingTop: spacing.xl,
        paddingBottom: spacing.md,
    },
});

export default PhoneScreen;
