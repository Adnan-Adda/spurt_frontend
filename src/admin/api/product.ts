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
import {NewProduct, UpdateProduct} from "@/shared/types";

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

// Function to get a single product's details
export const getProductDetailApi = (productId: number) => {
    return apiClient.get(`/product/product-detail/${productId}`);
};

// Function to update a product
export const updateProductApi = (productId: number, productData: UpdateProduct) => {
    // The API doc shows a POST for update, which is non-standard but we will follow it.
    return apiClient.post(`/product/update-product/${productId}`, productData);
};

// Function to delete a product
export const deleteProductApi = (productId: number) => {
    // The API doc shows a POST for delete, which is non-standard but we will follow it.
    return apiClient.post('/product/delete-product', {productId});
};
