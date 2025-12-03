import type { Product } from '@/types/type';
import { api } from './api';
import { delay } from '@/utils/delay';

export const productService = {
    async list(): Promise<Product[]> {
        await delay(1000);
        const response = await api.get('/products');
        return response.data.data;
    },

    async get(id: number): Promise<Product> {
        const response = await api.get(`/products/${id}`);
        return response.data.data;
    },

    async create(payload: Partial<Product>): Promise<Product> {
        const response = await api.post('/products', payload);
        return response.data.data;
    },

    async update(id: number, payload: Partial<Product>): Promise<Product> {
        const response = await api.put(`/products/${id}`, payload);
        return response.data.data;
    },

    async remove(id: number): Promise<void> {
        await api.delete(`/products/${id}`);
    },
};
