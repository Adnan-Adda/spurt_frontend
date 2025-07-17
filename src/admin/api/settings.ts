/*
 * =================================================================
 * == FILE: src/admin/api/settings.ts
 * =================================================================
 *
 * This file contains API functions for managing store settings.
 * API Endpoint IDs: SET-002, SET-001
 */
import apiClient from '../../shared/api/apiClient';
import { StoreSettings } from '@/shared/types';

// The API doc uses GET /settings to get the list, but since there's
// usually only one setting object, we'll get the first one.
export const getSettingsApi = () => {
    return apiClient.get('/settings');
};

export const createSettingsApi = (settingsData: Partial<StoreSettings>) => {
    return apiClient.post('/settings', settingsData);
};
