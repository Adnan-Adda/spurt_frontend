import apiClient from '../../shared/api/apiClient';
import {
    ApiResponse,
    NewSeller,
    SellerLogin,
    Seller,
    UpdateSeller,

} from '@/shared/types';

class SellerService {
    register(registerData: NewSeller): Promise<ApiResponse<any>> {
        return apiClient.post<ApiResponse<any>>('/vendor/register', registerData).then(res => {
            const response = res.data;
            if (response.status !== 1) {
                throw new Error(response.message || 'Registration failed.');
            }
            return {
                status: response.status,
                message: response.message,
                data: response.data,
            };
        });
    }

    login(loginData: SellerLogin): Promise<ApiResponse<any>> {
        return apiClient.post<ApiResponse<any>>('/vendor/login', loginData).then(res => {
            const response = res.data;
            if (response.status !== 1) {
                throw new Error(response.message || 'Login failed.');
            }
            return {
                status: response.status,
                message: response.message,
                data: response.data,
            };
        });
    }

    getProfile(): Promise<ApiResponse<Seller>> {
        return apiClient.get<ApiResponse<Seller>>('/vendor/vendor-profile').then(res => {
            const response = res.data;
            if (response.status !== 1) {
                throw new Error(response.message || 'Failed to fetch seller profile.');
            }
            return {
                status: response.status,
                message: response.message,
                data: response.data,
            };
        });
    }

    changePassword(passwordData: { newPassword: string; oldPassword: string }): Promise<ApiResponse<any>> {
        return apiClient.put<ApiResponse<any>>('/vendor/change-password', passwordData).then(res => {
            const response = res.data;
            if (response.status !== 1) {
                throw new Error(response.message || 'Failed to change password.');
            }
            return {
                status: response.status,
                message: response.message,
                data: response.data,
            };
        });
    }

    forgotPassword(params: { email: number }): Promise<ApiResponse<any>> {
        return apiClient.post<ApiResponse<any>>('/vendor/forgot-password', params).then(res => {
            const response = res.data;
            if (response.status !== 1) {
                throw new Error(response.message || 'Forgot password request failed.');
            }
            return {
                status: response.status,
                message: response.message,
                data: response.data,
            };
        });
    }

    updateProfile(customerId: number, updateData: UpdateSeller): Promise<ApiResponse<any>> {
        return apiClient.put<ApiResponse<any>>(`/vendor/edit-vendor/${customerId}`, updateData).then(res => {
            const response = res.data;
            if (response.status !== 1) {
                throw new Error(response.message || 'Failed to update profile.');
            }
            return {
                status: response.status,
                message: response.message,
                data: response.data,
            };
        });
    }

    logout(): Promise<ApiResponse<any>> {
        return apiClient.post<ApiResponse<any>>('/vendor/logout', {}).then(res => {
            const response = res.data;
            if (response.status !== 1) {
                throw new Error(response.message || 'Logout failed.');
            }
            return {
                status: response.status,
                message: response.message,
                data: response.data,
            };
        });
    }
}

export const sellerService = new SellerService();
