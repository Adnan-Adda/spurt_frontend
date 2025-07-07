/*
 * =================================================================
 * == FILE: src/api/user.ts
 * =================================================================
 *
 * This file contains API functions for creating a new user.
 * API Endpoint ID: AUTH-002
 */
import apiClient from './apiClient';
import { NewUser } from '../types';

export const createUserApi = (userData: NewUser) => {
    return apiClient.post('/auth/create-user', userData);
};
