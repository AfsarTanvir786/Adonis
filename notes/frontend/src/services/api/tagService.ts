import { api } from './api';
import type { Tag } from '@/types/type';
export const tagService = {
    async list(): Promise<{ data: Tag[] }> {
        const response = await api.get('/tags');
        return response.data;
    },
    async create(data: { name: string }): Promise<{ data: Tag }> {
        const response = await api.post('/tags', data);
        return response.data;
    },
};