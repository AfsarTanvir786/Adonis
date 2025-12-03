import type { Cart } from '@/types/type';
import { api } from './api';

export const cartService = {
    async list(): Promise<Cart[]> {
        const response = await api.get('/carts');
        return response.data.data;
    },

    async get(id: number): Promise<Cart> {
        const response = await api.get(`/carts/${id}`);
        return response.data.data;
    },

    async create(payload: Partial<Cart>): Promise<Cart> {
        const response = await api.post('/carts', payload);
        return response.data.data;
    },

    async update(id: number, payload: Partial<Cart>): Promise<Cart> {
        const response = await api.put(`/carts/${id}`, payload);
        return response.data.data;
    },

    async remove(id: number): Promise<void> {
        await api.delete(`/carts/${id}`);
    },
};
