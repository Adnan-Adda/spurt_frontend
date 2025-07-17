/*
 * =================================================================
 * == FILE: src/admin/api/banner.ts
 * =================================================================
 *
 * This file contains API functions for managing banners.
 * API Endpoint IDs: BNR-005, BNR-001
 */
import apiClient from '../../shared/api/apiClient';
import {NewBanner, UpdateBanner} from '@/shared/types';

export const getBannerListApi = (limit: number, offset: number) => {
    const params = {limit, offset};
    return apiClient.get('/banner', {params});
};

export const createBannerApi = (bannerData: NewBanner) => {
    return apiClient.post('/banner', bannerData);
};

export const deleteBannerApi = (bannerId: number) => {
    return apiClient.delete(`/banner/${bannerId}`);
};

// Function to get a single banner's details
export const getBannerDetailApi = (bannerId: number) => {
    return apiClient.get('/banner/banner-detail', { params: { bannerId } });
};

// Function to update a banner
export const updateBannerApi = (bannerId: number, bannerData: UpdateBanner) => {
    return apiClient.put(`/banner/${bannerId}`, bannerData);
};
