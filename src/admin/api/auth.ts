/*
 * =================================================================
 * == FILE: src/api/auth.ts
 * =================================================================
 *
 * This file contains functions for making authentication-related
 * API calls, such as logging in.
 */
import apiClient from '../../shared/api/apiClient';
import {LoginCredentials} from '../../shared/types/types';

// Corresponds to API endpoint: AUTH-010
export const loginApi = (credentials: LoginCredentials) => {
    return apiClient.post('/auth/login', credentials);
};