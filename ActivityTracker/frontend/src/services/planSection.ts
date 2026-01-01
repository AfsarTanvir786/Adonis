import type { Plan } from '@/type/type';
import { api } from './api';

export const planSection = {
  async get(): Promise<Plan[]> {
    try {
      const response = await api.get('/plans');
      return response.data.data;
    } catch (error: any) {
      throw new error('plan section error', error);
    }
  },
};
