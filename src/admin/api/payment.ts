/*
 * =================================================================
 * == FILE: src/admin/api/payment.ts
 * =================================================================
 *
 * This file contains API functions for managing payment settings.
 * Note: The backend API might not have a dedicated endpoint for this,
 * so we'll simulate it by using the main settings endpoint.
 */
import apiClient from '../../shared/api/apiClient';
import { PaymentSettings } from '@/shared/types';

// We will likely get payment settings as part of the main settings object
export const getPaymentSettingsApi = () => {
    return apiClient.get('/settings'); // Using main settings endpoint
};

// We will likely save payment settings as part of the main settings object
export const updatePaymentSettingsApi = (settingsData: any) => {
    return apiClient.post('/settings', settingsData);
};
