/**
 * Suvidha AI - Profile/Passport Screen
 * Worker identity, platform, digital passport QR, verification status
 * 
 * Re-designed as "Worker Passport"
 */

import React, { useMemo } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Card, Button, EmptyState } from '@components/ui';
import { ProfileIcon, QRCodeIcon, CheckIcon, ChevronRightIcon, SwiggyIcon, ZomatoIcon, UberIcon, OlaIcon, StarIcon, LockIcon } from '@components/ui/Icons';
import { colors } from '@theme/colors';
import { spacing, borderRadius } from '@theme/spacing';
import { useAppSelector, useAppDispatch } from '@store/index';
import { logout } from '@store/slices/authSlice';
import { deactivateDemo } from '@store/slices/demoSlice';
import { PlatformType } from '../../types';

const ProfileScreen: React.FC = () => {
    const dispatch = useAppDispatch();
    const isDemo = useAppSelector((state) => state.demo.isActive);
    const demoWorker = useAppSelector((state) => state.demo.worker);
    const realWorker = useAppSelector((state) => state.user.worker);
    const worker = isDemo ? demoWorker : realWorker;

    const handleLogout = async () => {
        if (isDemo) {
            dispatch(deactivateDemo());
        } else {
            await dispatch(logout());
        }
    };

    // Realistic Visual QR Code Component
    const QRCodeVisual = () => {
        const size = 13; // Smaller for passport layout
        const cellSize = 5;

        const cells = useMemo(() => {
            const grid = [];
            for (let i = 0; i < size * size; i++) {
                const r = Math.floor(i / size);
                const c = i % size;
                const isCorner = (r < 5 && c < 5) || (r < 5 && c > size - 6) || (r > size - 6 && c < 5);
                if (!isCorner) grid.push(Math.random() > 0.5);
                else grid.push(false);
            }
            return grid;
        }, []);

        return (
            <View style={styles.qrVisualContainer}>
                {/* Position Markers */}
                <View style={styles.qrCornerTL}><View style={styles.qrInner} /></View>
                <View style={styles.qrCornerTR}><View style={styles.qrInner} /></View>
                <View style={styles.qrCornerBL}><View style={styles.qrInner} /></View>
                {/* Data Matrix */}
                <View style={styles.qrMatrix}>
                    {cells.map((filled, i) => (
                        <View key={i} style={{ width: cellSize, height: cellSize, backgroundColor: filled ? 'black' : 'transparent' }} />
                    ))}
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <ScrollView contentContainerStyle={styles.scrollContent}>

                {/* Worker Passport Card - The Main Feature */}
                <View style={styles.passportContainer}>
                    <View style={styles.passportHeader}>
                        <Text variant="caption" color="default" style={{ fontWeight: 'bold', letterSpacing: 2 }}>WORKER PASSPORT</Text>
                        <View style={{ width: 20, height: 2, backgroundColor: colors.primary.main }} />
                    </View>

                    <View style={styles.passportBody}>
                        {/* Top Row: QR + Info */}
                        <View style={styles.passportIdentityRow}>
                            <View style={styles.qrWrapper}>
                                <Text variant="caption" color="secondary" style={{ marginBottom: 4 }}>[QR CODE]</Text>
                                <QRCodeVisual />
                            </View>
                            <View style={styles.identityDetails}>
                                <Text variant="h3" color="default" style={{ color: 'white' }}>{worker?.name || 'Worker Name'}</Text>
                                <Text variant="body" color="primary" style={{ fontWeight: 'bold' }}>Delivery Partner</Text>
                                <View style={{ marginTop: 8, flexDirection: 'row', gap: 8 }}>
                                    {worker?.platform && (
                                        <View style={styles.platformTag}>
                                            <Text variant="caption" color="default" style={{ color: 'black', fontWeight: 'bold' }}>
                                                {worker.platform.toUpperCase()}
                                            </Text>
                                        </View>
                                    )}
                                </View>
                            </View>
                        </View>

                        {/* Verified Credentials */}
                        <View style={styles.sectionBlock}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                                <StarIcon size={16} color="#FFD700" />
                                <Text variant="bodySmall" color="warning" style={{ fontWeight: 'bold' }}>VERIFIED CREDENTIALS:</Text>
                            </View>
                            <View style={styles.credentialList}>
                                <Text variant="bodySmall" color="secondary">• Rating: <Text style={{ color: 'white' }}>4.9/5.0</Text></Text>
                                <Text variant="bodySmall" color="secondary">• Completed Trips: <Text style={{ color: 'white' }}>5,247</Text></Text>
                                <Text variant="bodySmall" color="secondary">• Experience: <Text style={{ color: 'white' }}>2 years, 4 months</Text></Text>
                                <Text variant="bodySmall" color="secondary">• Avg Monthly Income: <Text style={{ color: 'white' }}>₹18,340</Text></Text>
                                <Text variant="bodySmall" color="secondary">• On-Time Rate: <Text style={{ color: 'white' }}>96%</Text></Text>
                            </View>
                        </View>

                        {/* Blockchain Verified */}
                        <View style={styles.sectionBlock}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                                <LockIcon size={16} color={colors.primary.light} />
                                <Text variant="bodySmall" color="primary" style={{ fontWeight: 'bold' }}>BLOCKCHAIN VERIFIED</Text>
                            </View>
                            <View style={{ paddingLeft: 8 }}>
                                <Text variant="mono" color="secondary" style={{ fontSize: 12 }}>Credential ID: {worker?.passportHash?.slice(0, 12)}...9b2c</Text>
                                <Text variant="bodySmall" color="secondary">Issued: Jan 15, 2026</Text>
                            </View>
                        </View>

                        {/* Footer */}
                        <View style={styles.passportFooter}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                                <CheckIcon size={12} color={colors.success.main} />
                                <Text variant="caption" color="secondary">Usable on: Ola, Rapido, Dunzo</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                                <CheckIcon size={12} color={colors.success.main} />
                                <Text variant="caption" color="secondary">Accepted by: 47 NBFCs for credit</Text>
                            </View>
                        </View>

                        {/* Actions */}
                        <View style={styles.actionRow}>
                            <TouchableOpacity onPress={() => { }}><Text variant="caption" color="primary">[Download PDF]</Text></TouchableOpacity>
                            <TouchableOpacity onPress={() => Alert.alert("Shared", "Link copied")}><Text variant="caption" color="primary">[Share]</Text></TouchableOpacity>
                            <TouchableOpacity onPress={() => { }}><Text variant="caption" color="primary">[Verify]</Text></TouchableOpacity>
                        </View>
                    </View>
                </View>

                {/* Settings Menu */}
                <View style={styles.menuContainer}>
                    {[
                        'Notification Preferences',
                        'Privacy Settings',
                        'Help & Support'
                    ].map((item) => (
                        <TouchableOpacity key={item} style={styles.menuItem} onPress={() => { }}>
                            <Text variant="body" color="default">{item}</Text>
                            <ChevronRightIcon size={20} color={colors.neutral.textSecondary} />
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Logout */}
                <Button title={isDemo ? 'Exit Demo Mode' : 'Sign Out'} onPress={handleLogout} variant="outline" fullWidth style={styles.logoutButton} />
                <Text variant="caption" color="tertiary" align="center" style={styles.version}>Suvidha AI v1.0.0</Text>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.neutral.background },
    scrollContent: { padding: spacing.base, paddingBottom: spacing['2xl'] },

    // Passport Styles
    passportContainer: {
        backgroundColor: '#1A1A1A', // Dark terminal-like bg
        borderWidth: 1,
        borderColor: colors.neutral.textSecondary,
        borderRadius: 4,
        padding: spacing.md,
        marginBottom: spacing.xl,
        borderStyle: 'dashed', // Not fully supported on all native views but supported on RN View
    },
    passportHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: spacing.sm,
        borderBottomWidth: 1,
        borderBottomColor: colors.neutral.textSecondary,
        marginBottom: spacing.md,
    },
    passportBody: {},
    passportIdentityRow: {
        flexDirection: 'row',
        marginBottom: spacing.lg,
    },
    qrWrapper: {
        alignItems: 'center',
        marginRight: spacing.lg,
    },
    qrVisualContainer: {
        width: 85, height: 85,
        backgroundColor: 'white',
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 2,
    },
    qrCornerTL: { position: 'absolute', top: 2, left: 2, width: 20, height: 20, borderWidth: 4, borderColor: 'black', alignItems: 'center', justifyContent: 'center' },
    qrCornerTR: { position: 'absolute', top: 2, right: 2, width: 20, height: 20, borderWidth: 4, borderColor: 'black', alignItems: 'center', justifyContent: 'center' },
    qrCornerBL: { position: 'absolute', bottom: 2, left: 2, width: 20, height: 20, borderWidth: 4, borderColor: 'black', alignItems: 'center', justifyContent: 'center' },
    qrInner: { width: 8, height: 8, backgroundColor: 'black' },
    qrMatrix: { width: 65, height: 65, flexDirection: 'row', flexWrap: 'wrap' },

    identityDetails: {
        justifyContent: 'center',
        flex: 1,
    },
    platformTag: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 2,
    },
    sectionBlock: {
        marginBottom: spacing.lg,
    },
    credentialList: {
        paddingLeft: spacing.md,
        borderLeftWidth: 1,
        borderLeftColor: colors.neutral.textTertiary,
        gap: 4,
    },
    passportFooter: {
        marginTop: spacing.md,
        paddingTop: spacing.md,
        borderTopWidth: 1,
        borderTopColor: colors.neutral.textSecondary,
    },
    actionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: spacing.lg,
        paddingTop: spacing.sm,
        borderTopWidth: 1,
        borderTopColor: colors.neutral.textSecondary,
        borderStyle: 'dotted',
    },

    // Menu
    menuContainer: {
        backgroundColor: colors.neutral.surface,
        borderRadius: 8,
        padding: spacing.md,
        marginBottom: spacing.lg,
    },
    menuItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.neutral.border },
    logoutButton: { marginTop: spacing.xl },
    version: { marginTop: spacing.lg },
});

export default ProfileScreen;
