import { API_URI } from '@/config/env';
import { fixTypes } from '@/utils/fixTypes';
import { toSnakeCase } from '@/utils/toSnakeCase';
import axios from 'axios';

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL ?? `${API_URI}/api`,
    withCredentials: true, // CRITICAL: Ensures cookies are sent with requests
});

// Request interceptor
api.interceptors.request.use((config) => {
    if (config.data) {
        config.data = fixTypes(toSnakeCase(config.data));
    }
    return config;
});

// Response interceptor for handling auth errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle 401 unauthorized errors
        if (error.response?.status === 401) {
            // Redirect to login or dispatch logout action
            window.location.href = '/auth/login';
        }
        return Promise.reject(error);
    }
);
