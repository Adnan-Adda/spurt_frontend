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

export const getOrderDetailApi = (orderId: number) => {
    return apiClient.get(`/order/${orderId}`, {params: {orderId}});
};

export const getOrderStatusListApi = () => {
    const params = {
        limit: 100, // Fetch all statuses
        offset: 0,
        count: false,
    };
    return apiClient.get('/order-status/order-status-list', {params});
};

export const changeOrderStatusApi = (orderId: number, orderStatusId: number) => {
    const payload = {
        orderId,
        orderStatusId,
    };
    return apiClient.post('/order/order-change-status', payload);
};