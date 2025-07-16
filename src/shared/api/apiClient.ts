/*
 * =================================================================
 * == FILE: src/api/apiClient.ts
 * =================================================================
 *
 * This file configures a new Axios instance.
 * All API requests will go through this client.
 * It sets the base URL for your backend API.
 *
 * NOTE: Replace 'http://localhost:8000/api' with your actual
 * backend URL if it's different. For mobile testing, you might
 * need to use your computer's network IP address instead of 'localhost'.
 */
import axios from 'axios';
import {getToken} from '../utils/storage';

const apiClient = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor to add the auth token to every request if it exists
apiClient.interceptors.request.use(
    async (config) => {
        const token = await getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default apiClient;