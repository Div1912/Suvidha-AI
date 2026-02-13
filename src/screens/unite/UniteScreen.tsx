/**
 * Suvidha AI - Unite/Collective Action Screen
 * 
 * Features:
 * - Campaign listing
 * - "Surge" flow simulation (Low-ball detection -> Hold -> Victory)
 */

import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, ScrollView, Alert, TouchableOpacity, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Card, Button, EmptyState, LoadingState, DemoBadge } from '@components/ui';
import { UniteIcon, TimeIcon, CheckIcon, FireIcon, SurgeIcon, FistIcon, PartyIcon, CloseIcon } from '@components/ui/Icons';
import { colors } from '@theme/colors';
import { spacing } from '@theme/spacing';
import { useAppSelector, useAppDispatch } from '@store/index';
import { joinStrike, leaveStrike } from '@store/slices/strikesSlice';
import { Strike } from '../../types';

type SurgeState = 'idle' | 'detected' | 'holding' | 'victory';

const UniteScreen: React.FC = () => {
    const dispatch = useAppDispatch();
    const isDemo = useAppSelector((state) => state.demo.isActive);
    const demoStrikes = useAppSelector((state) => state.demo.strikes);
    const realStrikes = useAppSelector((state) => state.strikes);

    const strikes = isDemo ? demoStrikes : realStrikes.strikes;
    const participations = realStrikes.participations;
    const isLoading = !isDemo && realStrikes.isLoading;

    // Timer for strikes
    const [timers, setTimers] = useState<Record<string, string>>({});

    // Surge Flow State
    const [surgeState, setSurgeState] = useState<SurgeState>('idle');
    const [holdTimer, setHoldTimer] = useState(163); // 2:43 start
    const [rejectedCount, setRejectedCount] = useState(127);
    const [decidingCount, setDecidingCount] = useState(23);
    const [holdingCount, setHoldingCount] = useState(147);

    // Mock Timer Logic
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (surgeState === 'holding' && holdTimer > 0) {
            interval = setInterval(() => {
                setHoldTimer((prev) => {
                    if (prev <= 1) {
                        setSurgeState('victory');
                        return 0;
                    }
                    return prev - 1;
                });
                // Simulate counters
                if (Math.random() > 0.7) {
                    setHoldingCount(c => Math.min(c + 1, 150));
                }
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [surgeState, holdTimer]);

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    const startSurgeSimulation = () => {
        setSurgeState('detected');
        setHoldTimer(163);
        setRejectedCount(127);
        setDecidingCount(23);
        setHoldingCount(147);
    };

    useEffect(() => {
        const updateTimers = () => {
            const newTimers: Record<string, string> = {};
            strikes.forEach((strike) => {
                const diff = new Date(strike.endTime).getTime() - Date.now();
                if (diff > 0) {
                    const h = Math.floor(diff / 3600000);
                    const m = Math.floor((diff % 3600000) / 60000);
                    const s = Math.floor((diff % 60000) / 1000);
                    newTimers[strike.id] = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
                } else {
                    newTimers[strike.id] = 'Ended';
                }
            });
            setTimers(newTimers);
        };
        updateTimers();
        const interval = setInterval(updateTimers, 1000);
        return () => clearInterval(interval);
    }, [strikes]);

    const isJoined = (id: string) => participations.some(p => p.strikeId === id && p.status === 'joined');
    const getProgress = (s: Strike) => Math.min((s.participants / s.targetParticipants) * 100, 100);

    if (isLoading) return <LoadingState message="Loading campaigns..." />;

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <View style={styles.titleRow}>
                        <UniteIcon size={28} color={colors.primary.main} />
                        <Text variant="h2" color="default" style={styles.title}>Unite</Text>
                    </View>
                </View>

                {/* Simulation Trigger */}
                {isDemo && surgeState === 'idle' && (
                    <TouchableOpacity style={styles.simulationTrigger} onPress={startSurgeSimulation}>
                        <FireIcon size={20} color="#FFFFFF" />
                        <Text variant="bodySmall" color="default" style={{ color: 'white', fontWeight: 'bold' }}>
                            SIMULATE LOW-BALL ORDER
                        </Text>
                    </TouchableOpacity>
                )}

                {/* Normal Campaigns List */}
                {surgeState === 'idle' && (
                    <>
                        <Text variant="body" color="secondary" style={styles.desc}>
                            Coordinate with fellow workers for fair treatment.
                        </Text>
                        {strikes.length > 0 ? strikes.map((strike) => (
                            <Card key={strike.id} variant={strike.status === 'active' ? 'elevated' : 'default'} style={styles.card}>
                                <View style={styles.statusRow}>
                                    <View style={[styles.badge, strike.status === 'active' && styles.badgeActive]}>
                                        {strike.status === 'active' && <View style={styles.dot} />}
                                        <Text variant="caption" color={strike.status === 'active' ? 'error' : 'secondary'}>
                                            {strike.status.toUpperCase()}
                                        </Text>
                                    </View>
                                    {strike.status === 'active' && (
                                        <View style={styles.timerRow}>
                                            <TimeIcon size={14} color={colors.neutral.textSecondary} />
                                            <Text variant="mono" color="default">{timers[strike.id]}</Text>
                                        </View>
                                    )}
                                </View>
                                <Text variant="h4" color="default">{strike.title}</Text>
                                <Text variant="bodySmall" color="secondary" style={styles.cardDesc}>{strike.description}</Text>
                                {/* ... progress ... */}
                                <View style={styles.track}>
                                    <View style={[styles.fill, { width: `${getProgress(strike)}%` }]} />
                                </View>
                            </Card>
                        )) : (
                            <EmptyState title="No campaigns" message="Check back later." icon={<UniteIcon size={48} color={colors.neutral.textSecondary} />} />
                        )}
                    </>
                )}
            </ScrollView>

            {/* Surge Flow Overlay/Modal */}
            <Modal visible={surgeState !== 'idle'} animationType="slide" transparent>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        {surgeState === 'detected' && (
                            <View>
                                <View style={styles.modalHeader}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                                        <FireIcon size={24} color={colors.error.main} />
                                        <Text variant="h3" color="error" style={{ fontWeight: 'bold' }}>LOW-BALL DETECTED</Text>
                                    </View>
                                    <TouchableOpacity onPress={() => setSurgeState('idle')}>
                                        <CloseIcon size={24} color={colors.neutral.textSecondary} />
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.detectBox}>
                                    <Text variant="body" color="default">Current Offer: <Text style={{ fontWeight: 'bold', color: colors.error.main }}>₹20</Text> for 4km</Text>
                                    <Text variant="caption" color="secondary">(₹5/hour equivalent)</Text>
                                </View>

                                <View style={styles.statsSection}>
                                    <Text variant="caption" color="warning" style={{ marginBottom: 8 }}>🔥 COMMUNITY RESPONSE:</Text>
                                    <View style={styles.statRow}>
                                        <CheckIcon size={16} color={colors.error.main} />
                                        <Text variant="bodySmall" color="default">{rejectedCount} workers REJECTED this order</Text>
                                    </View>
                                    <View style={styles.statRow}>
                                        <CheckIcon size={16} color={colors.warning.main} />
                                        <Text variant="bodySmall" color="default">{decidingCount} workers deciding...</Text>
                                    </View>
                                </View>

                                <View style={styles.surgePrediction}>
                                    <SurgeIcon size={20} color={colors.accent.blue} />
                                    <View style={{ marginLeft: 8, flex: 1 }}>
                                        <Text variant="caption" color="tertiary">SURGE PREDICTION</Text>
                                        <Text variant="bodySmall" color="default">If ALL reject for {formatTime(holdTimer)} more minutes</Text>
                                        <Text variant="bodySmall" color="success" style={{ fontWeight: 'bold', marginTop: 4 }}>Estimated new price: ₹55-65</Text>
                                    </View>
                                </View>

                                <View style={{ marginTop: spacing.xl }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16, alignSelf: 'center' }}>
                                        <FistIcon size={24} color={colors.primary.main} />
                                        <Text variant="h4" color="default">HOLD THE LINE?</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', gap: 12 }}>
                                        <Button title="REJECT & HOLD" onPress={() => setSurgeState('holding')} variant="primary" style={{ flex: 1 }} />
                                        <Button title="Accept Anyway" onPress={() => setSurgeState('idle')} variant="outline" style={{ flex: 1 }} />
                                    </View>
                                </View>
                            </View>
                        )}

                        {surgeState === 'holding' && (
                            <View style={{ alignItems: 'center', paddingVertical: 20 }}>
                                <FistIcon size={48} color={colors.primary.main} />
                                <Text variant="h2" color="default" style={{ marginVertical: 16 }}>HOLDING THE LINE</Text>
                                <Text variant="mono" color="warning" style={{ fontSize: 48, fontWeight: 'bold' }}>{formatTime(holdTimer)}</Text>
                                <Text variant="body" color="secondary" style={{ marginTop: 8 }}>Waiting for platform algorithm...</Text>

                                <View style={styles.holdingStats}>
                                    <Text variant="body" color="default">{holdingCount}/150 workers holding</Text>
                                    <View style={styles.track}><View style={[styles.fill, { width: `${(holdingCount / 150) * 100}%` }]} /></View>
                                </View>

                                <Button title="Give Up (Accept)" onPress={() => setSurgeState('idle')} variant="outline" style={{ marginTop: 32, width: '100%' }} />
                            </View>
                        )}

                        {surgeState === 'victory' && (
                            <View style={{ alignItems: 'center' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 20 }}>
                                    <PartyIcon size={32} color={colors.success.main} />
                                    <Text variant="h2" color="success" style={{ fontWeight: 'bold' }}>VICTORY!</Text>
                                </View>

                                <View style={styles.victoryBox}>
                                    <Text variant="body" color="default" style={{ textAlign: 'center', marginBottom: 16 }}>Community power worked!</Text>

                                    <View style={styles.victoryRow}>
                                        <Text variant="bodySmall" color="secondary">Surge pricing:</Text>
                                        <Text variant="bodySmall" color="success" style={{ fontWeight: 'bold' }}>ACTIVATED</Text>
                                    </View>
                                    <View style={styles.victoryRow}>
                                        <Text variant="bodySmall" color="secondary">Order now pays:</Text>
                                        <Text variant="h4" color="default">₹62 for 4km</Text>
                                    </View>

                                    <View style={styles.extraChange}>
                                        <Text variant="body" color="default">You earned an extra <Text style={{ fontWeight: 'bold', color: colors.success.main }}>₹42</Text></Text>
                                        <Text variant="caption" color="secondary">by standing together</Text>
                                    </View>
                                </View>

                                <View style={{ flexDirection: 'row', gap: 12, marginTop: 20, width: '100%' }}>
                                    <Button title="Accept Order" onPress={() => setSurgeState('idle')} variant="primary" style={{ flex: 1, backgroundColor: colors.success.main }} />
                                    <Button title="Share Victory" onPress={() => Alert.alert("Shared!", "Victory shared to WhatsApp")} variant="outline" style={{ flex: 1 }} />
                                </View>
                            </View>
                        )}
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.neutral.background },
    scrollContent: { padding: spacing.base, paddingBottom: spacing['2xl'] },
    header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.md },
    titleRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    title: { marginLeft: 0 },
    simulationTrigger: {
        backgroundColor: colors.error.dark,
        padding: spacing.md,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        marginBottom: spacing.lg,
    },
    desc: { marginBottom: spacing.xl },
    card: { padding: spacing.lg, marginBottom: spacing.lg },
    statusRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.md },
    badge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: spacing.sm, paddingVertical: spacing.xs, borderRadius: 4, backgroundColor: colors.neutral.border },
    badgeActive: { backgroundColor: colors.error.background },
    dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.error.main, marginRight: spacing.xs },
    timerRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
    cardDesc: { marginVertical: spacing.sm },
    track: { height: 8, backgroundColor: colors.neutral.border, borderRadius: 4, marginVertical: spacing.sm, width: '100%' },
    fill: { height: '100%', backgroundColor: colors.primary.main, borderRadius: 4 },

    // Modal
    modalContainer: { flex: 1, backgroundColor: 'rgba(0,0,0,0.9)', justifyContent: 'center', padding: spacing.md },
    modalContent: { backgroundColor: colors.neutral.surface, borderRadius: 16, padding: spacing.lg, borderWidth: 1, borderColor: colors.neutral.glassBorder },
    modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.lg },
    detectBox: { borderWidth: 1, borderColor: colors.neutral.border, borderRadius: 8, padding: spacing.md, marginBottom: spacing.lg, borderStyle: 'dashed' },
    statsSection: { marginBottom: spacing.lg },
    statRow: { flexDirection: 'row', gap: 8, marginBottom: 4, alignItems: 'center' },
    surgePrediction: { flexDirection: 'row', backgroundColor: colors.neutral.surfaceElevated, padding: spacing.md, borderRadius: 8 },
    holdingStats: { width: '100%', marginTop: 20 },
    victoryBox: { width: '100%', padding: spacing.md, backgroundColor: colors.neutral.surfaceElevated, borderRadius: 8 },
    victoryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8, alignItems: 'center' },
    extraChange: { marginTop: 12, borderTopWidth: 1, borderTopColor: colors.neutral.border, paddingTop: 12, alignItems: 'center' },
});

export default UniteScreen;
