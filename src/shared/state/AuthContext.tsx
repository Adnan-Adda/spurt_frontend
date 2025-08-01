import React, {createContext, useState, useEffect, useContext} from 'react';
import {userService} from '@/shared/api/user';
import {sellerService} from '@/shared/api/seller';
import {
    saveToken, getToken, removeToken,
    saveUser, getUser, removeUser,
    saveUserType, getUserType, removeUserType
} from '../utils/storage';
import {LoginCredentials, User, Seller} from '@/shared/types';
import {parseApiError} from "@/shared/utils/errorHandler";

interface Session {
    user: User | Seller | null;
    token: string | null;
    userType: 'admin' | 'seller' | null;
}

interface AuthContextType {
    session: Session;
    isLoading: boolean;
    error: string | null;
    login: (credentials: LoginCredentials, userType: 'admin' | 'seller') => Promise<void>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({children}: { children: React.ReactNode }) => {
    const [session, setSession] = useState<Session>({
        user: null,
        token: null,
        userType: null,
    });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const login = async (credentials: LoginCredentials, userType: 'admin' | 'seller') => {
        setIsLoading(true);
        setError(null);
        try {
            let response;
            // Call the correct API based on userType
            if (userType === 'admin') {
                response = await userService.login(credentials);
            } else if (userType === 'seller') {
                const sellerCredentials = {emailId: credentials.username, password: credentials.password};
                response = await sellerService.login(sellerCredentials);
            } else {
                throw new Error('Invalid user type for login.');
            }
            const {token, user} = response.data;
            await saveToken(token);
            await saveUser(user);
            await saveUserType(userType);
            setSession({user, token, userType});
        } catch (err: any) {
            const errorMessage = err.message || 'An unknown error occurred.';
            setError(parseApiError(err));
            throw new Error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        setIsLoading(true);
        if (session.userType === 'admin') {
            await userService.logout();
        } else if (session.userType === 'seller') {
            await sellerService.logout();
        }
        await removeToken();
        await removeUser();
        await removeUserType();
        setSession({user: null, token: null, userType: null});
        setIsLoading(false);
    };

    const checkAuthStatus = async () => {
        try {
            // Retrieve all parts of the session from storage
            const token = await getToken();
            const storedUser = await getUser();
            const userType = await getUserType();

            if (token && storedUser && userType) {
                setSession({token, user: storedUser, userType});
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
        <AuthContext.Provider value={{session, isLoading, error, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
