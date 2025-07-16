/*
 * =================================================================
 * == FILE: src/api/product.ts
 * =================================================================
 *
 * This file contains API functions for fetching product data.
 * We'll start with the product list.
 * API Endpoint ID: PROD-025
 */
import apiClient from '../../shared/api/apiClient';
import {NewProduct} from "../../shared/types/types";

// The API supports pagination, so we can pass limit and offset
export const getProductListApi = (limit: number, offset: number, keyword: string = '') => {
    const params = {
        limit,
        offset,
        keyword,
    };
    return apiClient.get('/product/', {params});
};

export const createProductApi = (productData: NewProduct) => {
    return apiClient.post('/product', productData);
};
