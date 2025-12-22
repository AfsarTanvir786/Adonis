import type { History } from '@/types/type';
import { api } from './api';

type HistoryListResponse = {
  success: boolean;
  message: any;
  data?: History[];
};

export const historyService = {
  async getHistoryByNote(id: number): Promise<HistoryListResponse> {
    try {
      const response = await api.get(`/noteHistories/notes/${id}`);
      return response.data;
    } catch (error: any) {
      throw new error('Create Note error:', error.response?.data);
    }
  },

  async getHistory(id: number) {
    try {
      const response = await api.get<History | null>(`/noteHistories/${id}`);
      return response.data;
    } catch (error: any) {
      throw new error('Create Note error:', error.response?.data);
    }
  }
};
