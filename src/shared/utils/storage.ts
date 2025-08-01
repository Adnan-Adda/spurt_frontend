import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '@/shared/types';

const TOKEN_KEY = 'user_token';
const USER_KEY = 'user_data';
const USER_TYPE_KEY = 'user_type';


export const saveToken = async (token: string): Promise<void> => {
    await AsyncStorage.setItem(TOKEN_KEY, token);
};

export const getToken = async (): Promise<string | null> => {
    return await AsyncStorage.getItem(TOKEN_KEY);
};

export const removeToken = async (): Promise<void> => {
    await AsyncStorage.removeItem(TOKEN_KEY);
};


export const saveUser = async (user: User): Promise<void> => {
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getUser = async (): Promise<User | null> => {
    const userJson = await AsyncStorage.getItem(USER_KEY);
    return userJson ? JSON.parse(userJson) : null;
};

export const removeUser = async (): Promise<void> => {
    await AsyncStorage.removeItem(USER_KEY);
};


export const saveUserType = async (userType: 'admin' | 'seller'): Promise<void> => {
    await AsyncStorage.setItem(USER_TYPE_KEY, userType);
};

export const getUserType = async (): Promise<'admin' | 'seller' | null> => {
    const userType = await AsyncStorage.getItem(USER_TYPE_KEY);
    return userType as 'admin' | 'seller' | null;
};

export const removeUserType = async (): Promise<void> => {
    await AsyncStorage.removeItem(USER_TYPE_KEY);
};
