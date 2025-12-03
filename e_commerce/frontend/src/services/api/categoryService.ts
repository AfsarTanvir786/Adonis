import type { Category } from '@/types/type';
import { api } from './api';

export const CategoryService = {
    async list(): Promise<Category[]> {
        const response = await api.get('/categories');
        return response.data.data;
    },

    async get(id: number): Promise<Category> {
        const response = await api.get(`/categories/${id}`);
        return response.data.data;
    },

    async create(payload: Partial<Category>): Promise<Category> {
        const response = await api.post('/categories', payload);
        return response.data.data;
    },

    async update(id: number, payload: Partial<Category>): Promise<Category> {
        const response = await api.put(`/categories/${id}`, payload);
        return response.data.data;
    },

    async remove(id: number): Promise<void> {
        await api.delete(`/categories/${id}`);
    },
};
