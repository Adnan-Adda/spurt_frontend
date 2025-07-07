
/*
 * =================================================================
 * == FILE: src/utils/storage.ts
 * =================================================================
 *
 * Utility functions for interacting with secure, persistent storage.
 * We use this to save and retrieve the user's auth token and info.
 * NOTE: For a production app, consider using a more secure storage
 * solution like expo-secure-store. AsyncStorage is used here for simplicity.
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types';

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

export const saveToken = async (token: string) => {
    try {
        await AsyncStorage.setItem(TOKEN_KEY, token);
    } catch (e) {
        console.error('Failed to save the token to storage', e);
    }
};

export const getToken = async () => {
    try {
        return await AsyncStorage.getItem(TOKEN_KEY);
    } catch (e) {
        console.error('Failed to fetch the token from storage', e);
        return null;
    }
};

export const removeToken = async () => {
    try {
        await AsyncStorage.removeItem(TOKEN_KEY);
    } catch (e) {
        console.error('Failed to remove the token from storage', e);
    }
};

export const saveUser = async (user: User) => {
    try {
        await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
    } catch (e) {
        console.error('Failed to save the user to storage', e);
    }
};

export const getUser = async (): Promise<User | null> => {
    try {
        const userJson = await AsyncStorage.getItem(USER_KEY);
        return userJson ? JSON.parse(userJson) : null;
    } catch (e) {
        console.error('Failed to fetch the user from storage', e);
        return null;
    }
};

export const removeUser = async () => {
    try {
        await AsyncStorage.removeItem(USER_KEY);
    } catch (e) {
        console.error('Failed to remove the user from storage', e);
    }
};