import type { CartItem } from '@/types/type';
import { api } from './api';

export const CartItemService = {
    async list(): Promise<CartItem[]> {
        const response = await api.get('/cartItems');
        return response.data.data;
    },

    async get(id: number): Promise<CartItem> {
        const response = await api.get(`/cartItems/${id}`);
        return response.data.data;
    },

    async create(payload: Partial<CartItem>): Promise<CartItem> {
        const response = await api.post('/cartItems', payload);
        return response.data.data;
    },

    async update(id: number, payload: Partial<CartItem>): Promise<CartItem> {
        const response = await api.put(`/cartItems/${id}`, payload);
        return response.data.data;
    },

    async remove(id: number): Promise<void> {
        await api.delete(`/cartItems/${id}`);
    },
};
