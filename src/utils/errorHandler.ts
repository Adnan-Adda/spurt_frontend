/*
 * =================================================================
 * == FILE: src/utils/errorHandler.ts
 * =================================================================
 *
 * A new utility to intelligently parse API error messages.
 * It looks for detailed validation errors from the backend and
 * provides a user-friendly string.
 */
import { AxiosError } from 'axios';

export const parseApiError = (error: any): string => {
    const axiosError = error as AxiosError;

    // Check if it's a validation error with the specific structure you found
    if (axiosError.response?.data) {
        const responseData = axiosError.response.data as any;
        if (responseData.data?.message && Array.isArray(responseData.data.message)) {
            // Join all the specific error messages into one string
            return responseData.data.message.join(', ');
        }
        // Fallback for other structured errors
        if (responseData.message) {
            return responseData.message;
        }
    }

    // Fallback for generic errors
    if (axiosError.message) {
        return axiosError.message;
    }

    return 'An unknown error occurred. Please try again.';
};
