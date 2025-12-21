import type { Note, PaginatedResponse, Pagination } from '@/types/type';
import { api } from './api';

type NoteResponse = {
  success: boolean;
  message: any;
  data?: Note;
};

export const myNoteService = {
  async get(noteId: number): Promise<Note | null> {
    try {
      const response = await api.get(`/notes/${noteId}`);
      return response.data;
    } catch (error: any) {
      console.error('Get Note error:', error.response?.data);
      throw error;
    }
  },

  async create(data: Partial<Note>): Promise<NoteResponse> {
    try {
      const response = await api.post('/notes', data);
      return response.data;
    } catch (error: any) {
      console.error('Create Note error:', error.response?.data);
      throw error;
    }
  },

  async update(id: number, data: Partial<Note>): Promise<NoteResponse> {
    try {
      const response = await api.put(`/notes/${id}`, data);
      return response.data;
    } catch (error: any) {
      console.error('Create Note error:', error.response?.data);
      throw error;
    }
  },

  async delete(id: number): Promise<NoteResponse> {
    try {
      const response = await api.delete(`/notes/${id}`);
      return response.data;
    } catch (error: any) {
      console.error('delete Note error:', error.response?.data);
      throw error;
    }
  },

  async myNotes(
    params: Partial<Pagination>,
    type: 'all' | 'public' | 'private' = 'all'
  ) {
    try {
      const response = await api.get<PaginatedResponse<Note>>(
        'notes/notes/my',
        {
          params: { ...params, type },
        }
      );
      return response.data;
    } catch (error: any) {
      throw new Error('my note fetch error', error.response?.data);
    }
  },
};
