/*
 * =================================================================
 * == FILE: src/admin/api/order.ts
 * =================================================================
 *
 * This file contains API functions for fetching order data.
 * API Endpoint ID: ORD-015
 */
import apiClient from '../../shared/api/apiClient';

export const getOrderListApi = (limit: number, offset: number, keyword: string = '') => {
    const params = {
        limit,
        offset,
        keyword,
        count: false,
    };
    return apiClient.get('/order', {params});
};
