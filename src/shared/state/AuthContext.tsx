/*
 * =================================================================
 * == FILE: src/state/AuthContext.tsx
 * =================================================================
 *
 * This file sets up the React Context for authentication.
 * It provides the `user`, `userToken`, `login`, and `logout`
 * functions to any component wrapped in the `AuthProvider`.
 */
import React, {createContext, useState, useEffect} from 'react';
import {loginApi} from '@/shared/api/auth';
import {saveToken, getToken, removeToken, saveUser, getUser, removeUser} from '../utils/storage';
import {LoginCredentials, User} from '@/shared/types';

interface AuthContextType {
    userToken: string | null;
    user: User | null;
    isLoading: boolean;
    error: string | null;
    login: (credentials: LoginCredentials) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({children}: { children: React.ReactNode }) => {
    const [userToken, setUserToken] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const login = async (credentials: LoginCredentials) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await loginApi(credentials);
            if (response.data && response.data.status === 1) {
                const {token, user} = response.data.data;
                await saveToken(token);
                await saveUser(user);
                setUserToken(token);
                setUser(user);
            } else {
                throw new Error(response.data.message || 'Login failed');
            }
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || err.message || 'An unknown error occurred.';
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        setIsLoading(true);
        await removeToken();
        await removeUser();
        setUserToken(null);
        setUser(null);
        setIsLoading(false);
    };

    const checkAuthStatus = async () => {
        try {
            const token = await getToken();
            const storedUser = await getUser();
            if (token && storedUser) {
                setUserToken(token);
                setUser(storedUser);
            }
        } catch (e) {
            console.error('Failed to check auth status:', e);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        checkAuthStatus();
    }, []);

    return (
        <AuthContext.Provider value={{user, userToken, isLoading, error, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};
