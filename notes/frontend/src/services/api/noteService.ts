import type {
  History,
  Note,
  NoteVote,
  PaginatedResponse,
  Pagination,
} from '@/types/type';
import { api } from './api';

type NoteListResponse = {
  success: boolean;
  message: any;
  data?: Note[];
};

type HistoryListResponse = {
  success: boolean;
  message: any;
  data?: History[];
};

type NoteResponse = {
  success: boolean;
  message: any;
  data?: Note;
};

type NoteVoteResponse = {
  success: boolean;
  message: any;
  data?: NoteVote;
};

export const NoteService = {
  async list(
    workspaceId: number,
    params: Partial<Pagination>
  ): Promise<PaginatedResponse<Note>> {
    try {
      const response = await api.get<PaginatedResponse<Note>>(
        `/workspaces/${workspaceId}/notes`,
        { params }
      );

      return response.data;
    } catch (error: any) {
      console.error('Get Note error:', error.response?.data);
      throw error;
    }
  },

  async get(noteId: number): Promise<Note | null> {
    try {
      const response = await api.get(`/notes/${noteId}`);
      return response.data;
    } catch (error: any) {
      console.error('Get Note error:', error.response?.data);
      throw error;
    }
  },

  async myNoteListResponse(): Promise<NoteListResponse> {
    try {
      const response = await api.get(`/notes/my`);
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

  async getHistory(id: number): Promise<HistoryListResponse> {
    try {
      const response = await api.get(`/noteHistories/${id}`);
      return response.data;
    } catch (error: any) {
      console.error('Create Note error:', error.response?.data);
      throw error;
    }
  },

  async getVote(noteId: number): Promise<NoteVoteResponse> {
    try {
      const response = await api.get(`/noteVotes/${noteId}`);
      return response.data;
    } catch (error: any) {
      console.error('Note vote count error:', error.response?.data);
      throw error;
    }
  },

  async createNoteVote(noteId: number, vote: 'up' | 'down') {
    try {
      const response = await api.post(`/noteVotes/${noteId}`, { vote });
      return response.data;
    } catch (error: any) {
      console.error('Note vote create error:', error.response?.data);
      throw error;
    }
  },

  async deleteNoteVote(noteId: number){
    try {
      const response = await api.delete(`/noteVotes/${noteId}`);
      return response.data;
    } catch (error: any) {
      console.error('Note vote delete error:', error.response?.data);
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
