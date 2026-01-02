import type { PaginatedResponse, Pagination, User } from '@/type/type';
import { api } from './api';

export const adminDashboard = {
  async getUsers(): Promise<User[]> {
    try {
      const response = await api.get(`/auth/admin-dashboard`);
      return response.data.users;
    } catch (error: any) {
      throw new error('admin dashboard get users error: ', error);
    }
  },

  async getScreenshots(params: { userId: number; date: Date }) {
    try {
      const response = await api.get(`/auth/screenshots`, { params });
      return response.data.users;
    } catch (error: any) {
      throw new error('admin dashboard get users error: ', error);
    }
  },

  async getUsersPagination(params: Partial<Pagination>) {
    try {
      const response = await api.get<PaginatedResponse<User>>(
        '/auth/users', { params },
      );
      console.log(response.data)
      return response.data;
    } catch (error: any) {
      throw new Error('my note fetch error', error.response?.data);
    }
  },
};
