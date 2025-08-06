/*
 * =================================================================
 * == FILE: src/api/dashboard.ts
 * =================================================================
 *
 * This file will contain all API functions related to the admin
 * dashboard. We are starting with an endpoint to get various counts.
 * API Endpoint ID: PROD-008
 */
import apiClient from '../../shared/api/apiClient';

export const getDashboardCountsApi = () => {
    return apiClient.get('/product/dashboard-count');
};
