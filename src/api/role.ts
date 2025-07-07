/*
 * =================================================================
 * == FILE: src/api/role.ts
 * =================================================================
 *
 * This file contains API functions for fetching user roles/groups.
 * API Endpoint ID: ROLE-003
 */
import apiClient from './apiClient';

export const getRolesApi = () => {
    // The API uses a generic list endpoint, so we provide params.
    // We assume a large limit to fetch all roles.
    const params = {
        limit: 100,
        offset: 0,
        keyword: '',
        count: false,
    };
    return apiClient.get('/role/rolelist', { params });
};
