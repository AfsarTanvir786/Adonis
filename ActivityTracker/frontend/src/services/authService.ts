import type { CompanyDto, LoginDto, UserProfileResponse } from '@/type/type';
import { api } from './api';

export const authService = {
  async login(payload: LoginDto) {
    try {
      const response = await api.post('/auth/login', payload);
      if (response.data.data) {
        localStorage.setItem('USER', JSON.stringify(response.data.data));
      }
      return response;
    } catch (error: any) {
      throw error;
    }
  },

  async register(payload: CompanyDto) {
    try {
      const response = await api.post('/auth/register', payload);
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },

  async logout() {
    try {
      const response = await api.delete('/auth/logout');
      localStorage.removeItem('USER');
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },

  async profile(): Promise<UserProfileResponse> {
    try {
      const response = await api.get('/auth/profile');
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },
};
