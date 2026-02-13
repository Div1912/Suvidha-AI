/**
 * Suvidha AI - Storage Service
 * Secure storage wrapper for tokens and sensitive data
 */

import EncryptedStorage from 'react-native-encrypted-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Keys
const KEYS = {
    AUTH_TOKEN: 'auth_token',
    REFRESH_TOKEN: 'refresh_token',
    USER_PHONE: 'user_phone',
    ONBOARDING_COMPLETE: 'onboarding_complete',
    DEMO_MODE: 'demo_mode',
};

// Secure storage (for tokens)
export const SecureStorage = {
    async set(key: string, value: string): Promise<void> {
        await EncryptedStorage.setItem(key, value);
    },

    async get(key: string): Promise<string | null> {
        return await EncryptedStorage.getItem(key);
    },

    async remove(key: string): Promise<void> {
        await EncryptedStorage.removeItem(key);
    },

    async clear(): Promise<void> {
        await EncryptedStorage.clear();
    },
};

// Regular storage (for preferences)
export const Storage = {
    async set(key: string, value: string): Promise<void> {
        await AsyncStorage.setItem(key, value);
    },

    async get(key: string): Promise<string | null> {
        return await AsyncStorage.getItem(key);
    },

    async remove(key: string): Promise<void> {
        await AsyncStorage.removeItem(key);
    },

    async setObject(key: string, value: object): Promise<void> {
        await AsyncStorage.setItem(key, JSON.stringify(value));
    },

    async getObject<T>(key: string): Promise<T | null> {
        const value = await AsyncStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    },
};

export { KEYS };
export default { SecureStorage, Storage, KEYS };
