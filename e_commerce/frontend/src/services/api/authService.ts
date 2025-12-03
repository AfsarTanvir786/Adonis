import type { LoginInfo, User } from '@/types/type';
import { api } from './api';
import axios from 'axios';

export const authService = {
    async login(payload: Partial<User>): Promise<LoginInfo> {
        const response = await api.post('/auth/login', payload);
        return response.data;
    },

    async register(payload: Partial<User>): Promise<User> {
        const response = await api.post(`/auth/register`, payload);
        return response.data.data;
    },

    async logout(): Promise<void> {
        const response = await api.delete('/auth/logout');
        return response.data.data;
    },

    // async refreshToken(): Promise<string> {
    //     const res = await axios.post(
    //         `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
    //         {},
    //         { withCredentials: true }
    //     );

    //     return res.data.accessToken;
    // },

    async getCurrentUser(): Promise<void> {
        await api.delete(`/auth/profile`);
    },
};
