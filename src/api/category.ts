/*
 * =================================================================
 * == FILE: src/api/category.ts
 * =================================================================
 *
 * This file contains API functions for fetching category data.
 * API Endpoint ID: CAT-007
 */
import apiClient from './apiClient';

export const getCategoryListApi = (limit: number, offset: number, keyword: string = '', sortOrder: number = 0) => {
    const params = {
        limit,
        offset,
        keyword,
        sortOrder,
        count: false,
    };
    return apiClient.get('/category', { params });
};
