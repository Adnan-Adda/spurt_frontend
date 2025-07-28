import apiClient from './apiClient';
import {
    Product,
    NewProduct,
    UpdateProduct,
    ApiResponse,
} from '@/shared/types';

type ProductListParams = {
    limit: number;
    offset: number;
    keyword?: string;
    count?: boolean;
    price?: number;
};

/**
 * A class to handle all API requests related to Products.
 */
class ProductService {

    /**
     * Fetches a paginated list of products.
     * Corresponds to API endpoint: PROD-025
     * @param params - Parameters for pagination and searching.
     * @returns A promise that resolves to a paginated response of products.
     */
    getProducts(params: ProductListParams): Promise<ApiResponse<any>> {
        const params1 = {
            limit: params.limit,
            offset: params.offset,
            keyword: params.keyword || '',
            count: params.count || false,
            price: params.price || 0
        }
        return apiClient.get<ApiResponse<any>>('/product/', {params: params1}).then(res => {
            const response = res.data;
            if (response.status !== 1) {
                throw new Error(response.message || 'Failed to fetch products.');
            }
            return {
                status: response.status,
                message: response.message,
                data: response.data,
            };
        });
    }

    /**
     * Fetches the details for a single product.
     * @param productId - The ID of the product to fetch.
     * @returns A promise that resolves to the API response containing the product details.
     */
    getProduct(productId: number): Promise<ApiResponse<Product>> {
        return apiClient
            .get<ApiResponse<Product>>(`/product/product-detail/${productId}`)
            .then(res => {
                const response = res.data;
                if (response.status !== 1) {
                    throw new Error(response.message || 'Failed to fetch product details.');
                }
                return {
                    status: response.status,
                    message: response.message,
                    data: response.data,
                };
            });
    }

    /**
     * Creates a new product.
     * @param productData - The data for the new product.
     * @returns A promise that resolves to the API response containing the new product.
     */
    createProduct(productData: NewProduct): Promise<ApiResponse<Product>> {
        return apiClient
            .post<ApiResponse<Product>>('/product', productData)
            .then(res => {
                const response = res.data;
                if (response.status !== 1) {
                    throw new Error(response.message || 'Failed to create product.');
                }
                return {
                    status: response.status,
                    message: response.message,
                    data: response.data,
                };
            });
    }

    /**
     * Updates an existing product. Note: The API uses a POST request for this action.
     * @param productId - The ID of the product to update.
     * @param productData - The data to update.
     * @returns A promise that resolves to the API response containing the updated product.
     */
    updateProduct(
        productId: number,
        productData: UpdateProduct
    ): Promise<ApiResponse<Product>> {
        return apiClient
            .post<ApiResponse<Product>>(
                `/product/update-product/${productId}`,
                productData
            )
            .then(res => {
                const response = res.data;
                if (response.status !== 1) {
                    throw new Error(response.message || 'Failed to update product.');
                }
                return {
                    status: response.status,
                    message: response.message,
                    data: response.data,
                };
            });
    }

    /**
     * Deletes a product. Note: The API uses a POST request for this action.
     * @param productId - The ID of the product to delete.
     * @returns A promise that resolves to the API response.
     */
    deleteProduct(productId: number): Promise<ApiResponse<null>> {
        return apiClient
            .post<ApiResponse<null>>('/product/delete-product', {productId})
            .then(res => {
                const response = res.data;
                if (response.status !== 1) {
                    throw new Error(response.message || 'Failed to delete product.');
                }
                return {
                    status: response.status,
                    message: response.message,
                    data: response.data,
                };
            });
    }
}


export const productService = new ProductService();
