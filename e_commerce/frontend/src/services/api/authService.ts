import type { User } from '@/types/type';
import { api } from './api';

interface LoginResponse {
    message: string;
    user: User;
}

interface RegisterResponse {
    message: string;
    user: User;
}

interface LogoutResponse {
    message: string;
}

interface ProfileResponse {
    data: User;
}

export const authService = {
    async login(payload: Partial<User>): Promise<LoginResponse> {
        const response = await api.post('/auth/login', payload);
        // Token is stored in HTTP-only cookie automatically
        // Optionally store user info in localStorage for UI purposes
        if (response.data.user) {
            localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        return response.data;
    },

    async register(payload: Partial<User>): Promise<RegisterResponse> {
        const response = await api.post('/auth/register', payload);
        // Token is stored in HTTP-only cookie automatically
        // Optionally store user info in localStorage for UI purposes
        if (response.data.user) {
            localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        return response.data;
    },

    async logout(): Promise<LogoutResponse> {
        const response = await api.delete('/auth/logout');
        // HTTP-only cookie is cleared by the server
        // Clean up any client-side data
        localStorage.removeItem('user');
        localStorage.removeItem('token'); // Remove if exists from old implementation
        return response.data;
    },

    async getCurrentUser(): Promise<ProfileResponse> {
        // Fixed: Should be GET request, not DELETE
        const response = await api.get('/auth/profile');
        // Update localStorage with fresh user data
        if (response.data.data) {
            localStorage.setItem('user', JSON.stringify(response.data.data));
        }
        return response.data;
    },
};
