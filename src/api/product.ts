/*
 * =================================================================
 * == FILE: src/api/product.ts
 * =================================================================
 *
 * This file contains API functions for fetching product data.
 * We'll start with the product list.
 * API Endpoint ID: PROD-025
 */
import apiClient from './apiClient';

// The API supports pagination, so we can pass limit and offset
export const getProductListApi = (limit: number, offset: number, keyword: string = '') => {
    const params = {
        limit,
        offset,
        keyword,
    };
    return apiClient.get('/product/inventory-product-list', {params});
};
