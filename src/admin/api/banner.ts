import apiClient from '../../shared/api/apiClient';
import {
    Banner,
    NewBanner,
    UpdateBanner,
    ApiResponse,
} from '@/shared/types';

type BannerListParams = {
    limit: number;
    offset: number;
    keyword?: string;
    count?: boolean;
    status?: number;
};

class BannerService {
    /**
     * Fetches a paginated list of banners.
     * @param params - Parameters for pagination (limit, offset).
     * @returns A promise that resolves to a paginated response of banners.
     */
    getBanners(params: BannerListParams): Promise<ApiResponse<any>> {
        const params1 = {
            limit: params.limit,
            offset: params.offset,
            keyword: params.keyword || '',
            count: params.count || false,
            status: params.status || 1
        }
        return apiClient
            .get<ApiResponse<any>>('/banner', { params: params1 })
            .then(res => {
                const response = res.data;
                if (response.status !== 1) {
                    throw new Error(response.message || 'Failed to fetch banners.');
                }
                return {
                    status: response.status,
                    message: response.message,
                    data: response.data,
                };
            });
    }

    /**
     * Fetches the details for a single banner.
     * @param bannerId - The ID of the banner to fetch.
     * @returns A promise that resolves to the API response containing the banner details.
     */
    getBanner(bannerId: number): Promise<ApiResponse<Banner>> {
        return apiClient
            .get<ApiResponse<Banner>>('/banner/banner-detail', { params: { bannerId } })
            .then(res => {
                const response = res.data;
                if (response.status !== 1) {
                    throw new Error(response.message || 'Failed to fetch banner details.');
                }
                return {
                    status: response.status,
                    message: response.message,
                    data: response.data,
                };
            });
    }

    /**
     * Creates a new banner.
     * @param bannerData - The data for the new banner.
     * @returns A promise that resolves to the API response containing the new banner.
     */
    createBanner(bannerData: NewBanner): Promise<ApiResponse<Banner>> {
        return apiClient
            .post<ApiResponse<Banner>>('/banner', bannerData)
            .then(res => {
                const response = res.data;
                if (response.status !== 1) {
                    throw new Error(response.message || 'Failed to create banner.');
                }
                return {
                    status: response.status,
                    message: response.message,
                    data: response.data,
                };
            });
    }

    /**
     * Updates an existing banner.
     * @param bannerId - The ID of the banner to update.
     * @param bannerData - The data to update.
     * @returns A promise that resolves to the API response containing the updated banner.
     */
    updateBanner(
        bannerId: number,
        bannerData: UpdateBanner
    ): Promise<ApiResponse<Banner>> {
        return apiClient
            .put<ApiResponse<Banner>>(`/banner/${bannerId}`, bannerData)
            .then(res => {
                const response = res.data;
                if (response.status !== 1) {
                    throw new Error(response.message || 'Failed to update banner.');
                }
                return {
                    status: response.status,
                    message: response.message,
                    data: response.data,
                };
            });
    }

    /**
     * Deletes a banner by its ID.
     * @param bannerId - The ID of the banner to delete.
     * @returns A promise that resolves to the API response.
     */
    deleteBanner(bannerId: number): Promise<ApiResponse<null>> {
        return apiClient
            .delete<ApiResponse<null>>(`/banner/${bannerId}`)
            .then(res => {
                const response = res.data;
                if (response.status !== 1) {
                    throw new Error(response.message || 'Failed to delete banner.');
                }
                return {
                    status: response.status,
                    message: response.message,
                    data: response.data, // data will likely be null on success
                };
            });
    }
}

/**
 * Export a singleton instance of the BannerService.
 */
export const bannerService = new BannerService();
