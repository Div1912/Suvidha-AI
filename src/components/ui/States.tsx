/**
 * Suvidha AI - State Components
 * 
 * Empty, Error, Loading, and Permission Denied states.
 * Every screen MUST have these states implemented.
 */

import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { colors } from '@theme/colors';
import { spacing } from '@theme/spacing';
import { Text } from './Text';
import { Button } from './Button';

interface StateProps {
    title?: string;
    message?: string;
    action?: {
        label: string;
        onPress: () => void;
    };
    icon?: React.ReactNode;
}

// Loading State
export const LoadingState: React.FC<{ message?: string }> = ({
    message = 'Loading...'
}) => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color={colors.primary.main} />
            <Text variant="body" color="secondary" style={styles.message}>
                {message}
            </Text>
        </View>
    );
};

// Empty State
export const EmptyState: React.FC<StateProps> = ({
    title = 'No data',
    message,
    action,
    icon,
}) => {
    return (
        <View style={styles.container}>
            {icon && <View style={styles.icon}>{icon}</View>}
            <Text variant="h4" color="secondary" style={styles.title}>
                {title}
            </Text>
            {message && (
                <Text variant="body" color="tertiary" style={styles.message}>
                    {message}
                </Text>
            )}
            {action && (
                <Button
                    title={action.label}
                    onPress={action.onPress}
                    variant="secondary"
                    size="sm"
                    style={styles.action}
                />
            )}
        </View>
    );
};

// Error State
export const ErrorState: React.FC<StateProps> = ({
    title = 'Something went wrong',
    message,
    action,
    icon,
}) => {
    return (
        <View style={styles.container}>
            {icon && <View style={styles.icon}>{icon}</View>}
            <Text variant="h4" color="error" style={styles.title}>
                {title}
            </Text>
            {message && (
                <Text variant="body" color="secondary" style={styles.message}>
                    {message}
                </Text>
            )}
            {action && (
                <Button
                    title={action.label}
                    onPress={action.onPress}
                    variant="secondary"
                    size="sm"
                    style={styles.action}
                />
            )}
        </View>
    );
};

// Permission Denied State
export const PermissionDeniedState: React.FC<StateProps> = ({
    title = 'Permission required',
    message = 'This feature requires additional permissions to work.',
    action,
    icon,
}) => {
    return (
        <View style={styles.container}>
            {icon && <View style={styles.icon}>{icon}</View>}
            <Text variant="h4" color="warning" style={styles.title}>
                {title}
            </Text>
            {message && (
                <Text variant="body" color="secondary" style={styles.message}>
                    {message}
                </Text>
            )}
            {action && (
                <Button
                    title={action.label}
                    onPress={action.onPress}
                    variant="primary"
                    size="sm"
                    style={styles.action}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: spacing.xl,
    },
    icon: {
        marginBottom: spacing.lg,
    },
    title: {
        textAlign: 'center',
        marginBottom: spacing.sm,
    },
    message: {
        textAlign: 'center',
        marginTop: spacing.sm,
        maxWidth: 280,
    },
    action: {
        marginTop: spacing.lg,
    },
});

export default {
    LoadingState,
    EmptyState,
    ErrorState,
    PermissionDeniedState,
};
