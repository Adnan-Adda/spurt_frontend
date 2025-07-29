import apiClient from '../../shared/api/apiClient';
import {User, NewUser, UpdateUser, ApiResponse} from '@/shared/types';

type UserListParams = {
    limit: number;
    offset: number;
    keyword?: string;
    count?: boolean;
};

class UserService {
    getUsers(params: UserListParams): Promise<ApiResponse<any>> {
        return apiClient.get<ApiResponse<any>>('/auth/userlist', {params}).then(res => {
            const response = res.data;
            if (response.status !== 1) {
                throw new Error(response.message || 'Failed to fetch users.');
            }
            return {
                status: response.status,
                message: response.message,
                data: response.data,
            };
        });
    }

    getUserProfile(): Promise<ApiResponse<User>> {
        return apiClient.get<ApiResponse<User>>(`/auth/get-profile`).then(res => {
            const response = res.data;
            if (response.status !== 1) {
                throw new Error(response.message || 'Failed to fetch user profile.');
            }
            return {
                status: response.status,
                message: response.message,
                data: response.data,
            };
        });
    }

    createUser(userData: NewUser): Promise<ApiResponse<User>> {
        return apiClient.post<ApiResponse<User>>('/auth/create-user', userData).then(res => {
            const response = res.data;
            if (response.status !== 1) {
                throw new Error(response.message || 'Failed to create user.');
            }
            return {
                status: response.status,
                message: response.message,
                data: response.data,
            };
        });
    }

    updateUser(userId: number, userData: UpdateUser): Promise<ApiResponse<User>> {
        return apiClient.put<ApiResponse<User>>(`/auth/update-user/${userId}`, userData).then(res => {
            const response = res.data;
            if (response.status !== 1) {
                throw new Error(response.message || 'Failed to update user.');
            }
            return {
                status: response.status,
                message: response.message,
                data: response.data,
            };
        });
    }

    deleteUser(userId: number): Promise<ApiResponse<null>> {
        return apiClient.delete<ApiResponse<null>>(`/auth/delete-user/${userId}`).then(res => {
            const response = res.data;
            if (response.status !== 1) {
                throw new Error(response.message || 'Failed to delete user.');
            }
            return {
                status: response.status,
                message: response.message,
                data: response.data,
            };
        });
    }
}

export const userService = new UserService();
