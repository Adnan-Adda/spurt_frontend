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

// This function gets the summary list to find the settingsId
export const getSettingsListApi = () => {
    return apiClient.get('/settings');
};

// This function gets the full, detailed settings object
export const getSettingDetailApi = (settingsId: number) => {
    return apiClient.get(`/settings/${settingsId}`);
};

// This function saves/updates the settings
export const createSettingsApi = (settingsData: Partial<StoreSettings>) => {
    return apiClient.post('/settings', settingsData);
};