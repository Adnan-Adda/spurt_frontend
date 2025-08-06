import apiClient from "@/shared/api/apiClient";
import {
    Category,
    NewCategory,
    UpdateCategory,
    ApiResponse,
} from '@/shared/types';

type CategoryListParams = {
    limit: number;
    offset: number;
    keyword?: string;
    count?: boolean;
    name?: string;
    sortOrder?: number;
    status?: number;
};

class CategoryService {
    /**
     * Fetches a paginated list of categories.
     * Corresponds to API endpoint: CAT-007
     * @param params - Parameters for pagination, searching, and sorting.
     * @returns A promise that resolves to a paginated response of categories.
     */
    getCategories(params: CategoryListParams): Promise<ApiResponse<any>> {
        return apiClient
            .get<ApiResponse<any>>('/category', {params})
            .then(res => {
                const response = res.data;
                if (response.status !== 1) {
                    throw new Error(response.message || 'Failed to fetch categories.');
                }
                return {
                    status: response.status,
                    message: response.message,
                    data: response.data,
                };
            });
    }

    /**
     * Creates a new category.
     * @param categoryData - The data for the new category.
     * @returns A promise that resolves to the API response containing the new category.
     */
    createCategory(categoryData: NewCategory): Promise<ApiResponse<Category>> {
        return apiClient
            .post<ApiResponse<Category>>('/category', categoryData)
            .then(res => {
                const response = res.data;
                if (response.status !== 1) {
                    throw new Error(response.message || 'Failed to create category.');
                }
                return {
                    status: response.status,
                    message: response.message,
                    data: response.data,
                };
            });
    }

    /**
     * Updates an existing category.
     * @param categoryId - The ID of the category to update.
     * @param categoryData - The data to update.
     * @returns A promise that resolves to the API response containing the updated category.
     */
    updateCategory(
        categoryId: number,
        categoryData: UpdateCategory
    ): Promise<ApiResponse<Category>> {
        return apiClient
            .put<ApiResponse<Category>>(`/category/${categoryId}`, categoryData)
            .then(res => {
                const response = res.data;
                if (response.status !== 1) {
                    throw new Error(response.message || 'Failed to update category.');
                }
                return {
                    status: response.status,
                    message: response.message,
                    data: response.data,
                };
            });
    }

    /**
     * Deletes a category by its ID.
     * @param categoryId - The ID of the category to delete.
     * @returns A promise that resolves to the API response.
     */
    deleteCategory(categoryId: number): Promise<ApiResponse<null>> {
        // Note: The original API passed the ID in the body for a DELETE request.
        // This is unconventional but handled here as specified.
        return apiClient
            .delete<ApiResponse<null>>('/category', {
                data: {categoryId: categoryId},
            })
            .then(res => {
                const response = res.data;
                if (response.status !== 1) {
                    throw new Error(response.message || 'Failed to delete category.');
                }
                return {
                    status: response.status,
                    message: response.message,
                    data: response.data,
                };
            });
    }
}

/**
 * Export a singleton instance of the CategoryService.
 */
export const categoryService = new CategoryService();
