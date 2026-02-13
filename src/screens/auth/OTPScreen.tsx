/**
 * Suvidha AI - OTP Verification Screen
 * 
 * 6-digit OTP input with resend functionality
 */

import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Button, OTPInput } from '@components/ui';
import { ChevronRightIcon } from '@components/ui/Icons';
import { colors } from '@theme/colors';
import { spacing } from '@theme/spacing';
import { AuthStackParamList } from '@navigation/types';
import { useAppDispatch } from '@store/index';
import { setAuthTokens } from '@store/slices/authSlice';
import EncryptedStorage from 'react-native-encrypted-storage';

type RouteProps = RouteProp<AuthStackParamList, 'OTP'>;

const OTPScreen: React.FC = () => {
    const navigation = useNavigation();
    const route = useRoute<RouteProps>();
    const dispatch = useAppDispatch();
    const { phone } = route.params;

    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [resendTimer, setResendTimer] = useState(30);

    useEffect(() => {
        const timer = setInterval(() => {
            setResendTimer((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatPhone = (phoneNumber: string): string => {
        return `+91 ${phoneNumber.slice(0, 5)} ${phoneNumber.slice(5)}`;
    };

    const handleVerify = async () => {
        if (otp.length !== 6) {
            setError('Please enter the 6-digit OTP');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            // TODO: Verify OTP with Cognito
            // For now, simulate successful verification

            // Store tokens
            const mockToken = 'mock-jwt-token-' + Date.now();
            const mockRefreshToken = 'mock-refresh-token-' + Date.now();

            await EncryptedStorage.setItem('auth_token', mockToken);
            await EncryptedStorage.setItem('refresh_token', mockRefreshToken);
            await EncryptedStorage.setItem('user_phone', phone);

            dispatch(setAuthTokens({
                token: mockToken,
                refreshToken: mockRefreshToken,
            }));
        } catch (err) {
            setError('Invalid OTP. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleResend = async () => {
        if (resendTimer > 0) return;

        setResendTimer(30);
        setError('');

        // TODO: Resend OTP via Cognito
        console.log('Resending OTP to', phone);
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
            >
                {/* Header */}
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <View style={styles.backIcon}>
                        <ChevronRightIcon
                            size={20}
                            color={colors.neutral.text}
                        />
                    </View>
                    <Text variant="body" color="secondary">
                        Back
                    </Text>
                </TouchableOpacity>

                <View style={styles.content}>
                    {/* Title */}
                    <View style={styles.header}>
                        <Text variant="h2" color="default">
                            Verify your number
                        </Text>
                        <Text variant="body" color="secondary" style={styles.subtitle}>
                            We sent a 6-digit code to
                        </Text>
                        <Text variant="body" color="default" style={styles.phone}>
                            {formatPhone(phone)}
                        </Text>
                    </View>

                    {/* OTP Input */}
                    <View style={styles.otpSection}>
                        <OTPInput
                            length={6}
                            value={otp}
                            onChange={(value) => {
                                setOtp(value);
                                setError('');
                            }}
                            error={error}
                        />
                    </View>

                    {/* Resend */}
                    <View style={styles.resendSection}>
                        {resendTimer > 0 ? (
                            <Text variant="body" color="tertiary">
                                Resend code in {resendTimer}s
                            </Text>
                        ) : (
                            <TouchableOpacity onPress={handleResend}>
                                <Text variant="body" color="primary">
                                    Resend code
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>

                    {/* Verify Button */}
                    <Button
                        title="Verify"
                        onPress={handleVerify}
                        loading={isLoading}
                        disabled={otp.length !== 6}
                        fullWidth
                        style={styles.verifyButton}
                    />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.neutral.background,
    },
    keyboardView: {
        flex: 1,
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: spacing.base,
        transform: [{ rotate: '180deg' }],
    },
    backIcon: {
        transform: [{ rotate: '180deg' }],
        marginRight: spacing.xs,
    },
    content: {
        flex: 1,
        padding: spacing.xl,
    },
    header: {
        marginBottom: spacing['2xl'],
    },
    subtitle: {
        marginTop: spacing.md,
    },
    phone: {
        marginTop: spacing.xs,
    },
    otpSection: {
        marginBottom: spacing.lg,
    },
    resendSection: {
        alignItems: 'center',
        marginBottom: spacing.xl,
    },
    verifyButton: {
        marginTop: spacing.lg,
    },
});

export default OTPScreen;
