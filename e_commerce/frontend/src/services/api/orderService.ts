import type { Order } from '@/types/type';
import { api } from './api';
import { delay } from '@/utils/delay';

export const orderService = {
    async list(): Promise<Order[]> {
        await delay(1000);
        const response = await api.get('/orders');
        return response.data.data;
    },

    async get(id: number): Promise<Order> {
        const response = await api.get(`/orders/${id}`);
        return response.data.data;
    },

    async create(payload: Partial<Order>): Promise<Order> {
        await delay(1000);
        const response = await api.post('/orders', payload);
        return response.data.data;
    },

    async update(id: number, payload: Partial<Order>): Promise<Order> {
        const response = await api.put(`/orders/${id}`, payload);
        return response.data.data;
    },

    async remove(id: number): Promise<void> {
        await api.delete(`/orders/${id}`);
    },
};
