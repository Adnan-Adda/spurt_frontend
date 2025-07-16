/*
 * =================================================================
 * == FILE: src/api/user.ts
 * =================================================================
 *
 * This file contains API functions for creating a new user.
 * API Endpoint ID: AUTH-002
 */
import apiClient from '../../shared/api/apiClient';
import {NewUser, UpdateUser} from '../../shared/types/types';

export const createUserApi = (userData: NewUser) => {
    return apiClient.post('/auth/create-user', userData);
};


export const getUserListApi = (limit: number, offset: number, keyword: string = '') => {
    const params = {
        limit,
        offset,
        keyword,
    };
    return apiClient.get('/auth/userlist', {params});
};

// Function to get a single user's details
export const getUserProfileApi = () => {
    return apiClient.get(`/auth/get-profile`);
};

// Function to update a user
export const updateUserApi = (userId: number, userData: UpdateUser) => {
    return apiClient.put(`/auth/update-user/${userId}`, userData);
};

export const deleteUserApi = (userId: number) => {
    return apiClient.delete(`/auth/delete-user/${userId}`);
};
