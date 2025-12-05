import type { User } from '@/types/type';
import { api } from './api';

export const CustomerService = {
    async list(): Promise<User[]> {
        const response = await api.get('/auth/users');
        return response.data.data;
    },

    async get(id: number): Promise<User> {
        const response = await api.get(`/auth/users/${id}`);
        return response.data.data;
    },

    async create(payload: Partial<User>): Promise<User> {
        const response = await api.post('/auth/users', payload);
        return response.data.data;
    },

    async update(id: number, payload: Partial<User>): Promise<User> {
        const response = await api.put(`/auth/users/${id}`, payload);
        return response.data.data;
    },

    async remove(id: number): Promise<void> {
        await api.delete(`/users/${id}`);
    },
};
