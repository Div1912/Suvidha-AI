/**
 * Suvidha AI - Services Layer - API Configuration
 */

import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';

// API Base URLs
const API_BASE_URL = 'https://api.suvidhai.com';
const DEMO_API_BASE_URL = 'https://demo.api.suvidhai.com';

// Create axios instance for real API
const createApiClient = (baseURL: string): AxiosInstance => {
    const client = axios.create({
        baseURL,
        timeout: 30000,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    // Request interceptor - add JWT token
    client.interceptors.request.use(
        async (config) => {
            try {
                const token = await EncryptedStorage.getItem('auth_token');
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
            } catch (error) {
                console.error('Error getting auth token:', error);
            }
            return config;
        },
        (error) => Promise.reject(error)
    );

    // Response interceptor - handle errors
    client.interceptors.response.use(
        (response) => response,
        async (error) => {
            if (error.response?.status === 401) {
                // Token expired, trigger refresh or logout
                await EncryptedStorage.removeItem('auth_token');
                // TODO: Dispatch logout action
            }
            return Promise.reject(error);
        }
    );

    return client;
};

export const apiClient = createApiClient(API_BASE_URL);
export const demoApiClient = createApiClient(DEMO_API_BASE_URL);

export default apiClient;
