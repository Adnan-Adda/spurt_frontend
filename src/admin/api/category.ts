/*
 * =================================================================
 * == FILE: src/api/category.ts
 * =================================================================
 *
 * This file contains API functions for fetching category data.
 * API Endpoint ID: CAT-007
 */
import apiClient from '../../shared/api/apiClient';
import {NewCategory, UpdateCategory} from '@/shared/types';

export const getCategoryListApi = (limit: number, offset: number, keyword: string = '', sortOrder: number = 0) => {
    const params = {
        limit,
        offset,
        keyword,
        sortOrder,
        count: false,
    };
    return apiClient.get('/category', {params});
};

// Function to create a new category
export const createCategoryApi = (categoryData: NewCategory) => {
    return apiClient.post('/category', categoryData);
};

export const updateCategoryApi = (categoryId: number, categoryData: UpdateCategory) => {
    return apiClient.put(`/category/${categoryId}`, categoryData);
};

// Function to delete a category
export const deleteCategoryApi = (categoryId: number) => {
    return apiClient.delete('/category', {
        data: {categoryId: categoryId}, // Pass categoryId in the request body
    });
};