import type {
  Note,
  NoteVote,
  PaginatedResponse,
  Pagination,
} from '@/types/type';
import { api } from './api';

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
      throw new error('Get Note error:', error.response?.data);
    }
  },

  async getVote(noteId: number): Promise<NoteVoteResponse> {
    try {
      const response = await api.get(`/noteVotes/${noteId}`);
      return response.data;
    } catch (error: any) {
      throw new error('Note vote count error:', error.response?.data);
    }
  },

  async createNoteVote(noteId: number, vote: 'up' | 'down') {
    try {
      const response = await api.post(`/noteVotes/${noteId}`, { vote });
      return response.data;
    } catch (error: any) {
      throw new error('Note vote create error:', error.response?.data);
    }
  },

  async deleteNoteVote(noteId: number){
    try {
      const response = await api.delete(`/noteVotes/${noteId}`);
      return response.data;
    } catch (error: any) {
      throw new error('Note vote delete error:', error.response?.data);
    }
  },
};
