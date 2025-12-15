import type { User } from '@/types/type';
import { api } from './api';

interface LoginResponse {
    success: boolean;
    message: string;
    user?: User;
}

interface RegisterResponse {
    success: boolean;
    message: string;
    user?: User;
}

interface LogoutResponse {
    success: boolean;
    message: string;
}

interface ProfileResponse {
    success: boolean;
    message: string;
    data?: User;
}

export const authService = {
    async login(payload: {
        email: string;
        password: string;
    }): Promise<LoginResponse> {
        try {
            const response = await api.post('/auth/login', payload);

            // Token is stored in HTTP-only cookie automatically
            // Optionally store user info in localStorage for UI purposes
            if (response.data.user) {
                localStorage.setItem(
                    'user',
                    JSON.stringify(response.data.user)
                );
            }
            return response.data;
        } catch (error: any) {
            console.error('❌ Login error:', error.response?.data);
            throw error;
        }
    },

    async register(payload: Partial<User>): Promise<RegisterResponse> {
        try {
            const response = await api.post('/auth/register', payload);

            // Token is stored in HTTP-only cookie automatically
            // Optionally store user info in localStorage for UI purposes
            if (response.data.user) {
                localStorage.setItem(
                    'user',
                    JSON.stringify(response.data.user)
                );
            }
            return response.data;
        } catch (error: any) {
            console.error('❌ Register error:', error.response?.data);
            throw error;
        }
    },

    async logout(): Promise<LogoutResponse> {
        try {
            const response = await api.delete('/auth/logout');
            // HTTP-only cookie is cleared by the server
            // Clean up any client-side data
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            return response.data;
        } catch (error: any) {
            // If logout fails (e.g., 401 because token is already invalid)
            // Still clean up client-side data
            localStorage.removeItem('user');
            localStorage.removeItem('token');

            // If it's a 401 error, consider it a successful logout
            // (token is already invalid/expired)
            if (error.response?.status === 401) {
                return { 
                    success: false,
                    message: 'Successfully logged out' };
            }

            // For other errors, still throw but after cleanup
            throw error;
        }
    },

    async getCurrentUser(): Promise<ProfileResponse> {
        try {
            // Fixed: Should be GET request, not DELETE
            const response = await api.get('/auth/profile');

            // Update localStorage with fresh user data
            if (response.data.data) {
                localStorage.setItem(
                    'user',
                    JSON.stringify(response.data.data)
                );
            }
            return response.data;
        } catch (error: any) {
            console.error('❌ Get user error:', error.response?.data);
            throw error;
        }
    },
};