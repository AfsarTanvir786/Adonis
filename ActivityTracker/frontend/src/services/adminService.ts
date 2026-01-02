import type { PaginatedResponse, Pagination, User } from '@/type/type';
import { api } from './api';

export const adminDashboard = {
  async getUsers(): Promise<User[]> {
    try {
      const response = await api.get(`/auth/admin-dashboard`);
      return response.data.users;
    } catch (error: any) {
      throw error;
    }
  },

  async getScreenshots(params: { userId: number; date: Date }) {
    try {
      const response = await api.get(`/auth/screenshots`, { params });
      return response.data.users;
    } catch (error: any) {
      throw error;
    }
  },

  async getUsersPagination(params: Partial<Pagination>) {
    try {
      const response = await api.get<PaginatedResponse<User>>('/auth/users', {
        params,
      });
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },

  async createUser(request: {name: string; email: string; password: string; role: 'admin'|'employee'}){
    try {
      const response = await api.post<Partial<User>>('/auth/add-user', request);
      return response.data;
    } catch (error: any) {
      throw error;
    }
  }
};
