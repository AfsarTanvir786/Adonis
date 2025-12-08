import type { OrderItem } from '@/types/type';
import { api } from './api';
import { delay } from '@/utils/delay';

export const orderItemService = {
    async list(): Promise<OrderItem[]> {
        await delay(1000);
        const response = await api.get('/orderItems');
        return response.data.data;
    },

    async get(id: number): Promise<OrderItem> {
        const response = await api.get(`/orderItems/${id}`);
        return response.data.data;
    },

    async create(payload: Partial<OrderItem>): Promise<OrderItem> {
        await delay(1000);
        console.log(payload);
        const response = await api.post('/orderItems', payload);
        console.log(response);
        return response.data.data;
    },

    async update(id: number, payload: Partial<OrderItem>): Promise<OrderItem> {
        const response = await api.put(`/orderItems/${id}`, payload);
        return response.data.data;
    },

    async remove(id: number): Promise<void> {
        await api.delete(`/orderItems/${id}`);
    },
};
