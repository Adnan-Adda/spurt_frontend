/*
 * =================================================================
 * == FILE: src/api/role.ts
 * =================================================================
 *
 * This file contains API functions for fetching user roles/groups.
 * API Endpoint ID: ROLE-003
 */
import apiClient from '../../shared/api/apiClient';
import {NewRole, UpdateRole} from '../../shared/types/types';

export const getRolesApi = () => {
    // The API uses a generic list endpoint, so we provide params.
    // We assume a large limit to fetch all roles.
    const params = {
        limit: 100,
        offset: 0,
        keyword: '',
        count: false,
    };
    return apiClient.get('/role/rolelist', {params});
};

export const deleteRoleApi = (roleId: number) => {
    return apiClient.delete(`/role/delete-role/${roleId}`);
};


export const createRoleApi = (roleData: NewRole) => {
    return apiClient.post('/role/create-role', roleData);
};


export const updateRoleApi = (roleId: number, roleData: UpdateRole) => {
    return apiClient.put(`/role/update-role/${roleId}`, roleData);
};