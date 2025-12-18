import type { History, Note, NoteVote, VoteCount } from '@/types/type';
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
  data?: { note: Note; voteCount?: VoteCount };
};

type NoteVoteResponse = {
  success: boolean;
  message: any;
  data?: NoteVote;
};

export const NoteService = {
  async list(workspaceId: number): Promise<NoteListResponse> {
    try {
      const response = await api.get(`/workspaces/${workspaceId}/notes`);
      return response.data;
    } catch (error: any) {
      console.error('Get Note error:', error.response?.data);
      throw error;
    }
  },

  async get(noteId: number): Promise<NoteResponse> {
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
      console.error('Create Note error:', error.response?.data);
      throw error;
    }
  },

  async vote(id: number, voteType: 'up' | 'down'): Promise<NoteResponse> {
    try {
      const response = await api.post(`/notes/${id}`, { vote: voteType });
      return response.data;
    } catch (error: any) {
      console.error('Create Note error:', error.response?.data);
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

  async getVoteCount(noteId: number): Promise<any> {
    try {
      const response = await api.get(`/voteCounts/${noteId}`);
      return response.data;
    } catch (error: any) {
      console.error('Note vote count error:', error.response?.data);
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
      console.error('Note vote count error:', error.response?.data);
      throw error;
    }
  },

  async sortList(
    workspaceId: number,
    params: {
      page: number;
      pageSize: number;
      sortBy: string;
      order: string;
    }
  ) {
    return api
      .get(`/workspaces/${workspaceId}/sortNotes`, { params })
      .then((res) => res.data);
  },

  async myNotes(params: {
    userId: number;
    page: number;
    pageSize: number;
    type: 'all' | 'public' | 'private';
  }) {
    return api.get('notes/notes/my', { params }).then((res) => res.data);
  },
};
