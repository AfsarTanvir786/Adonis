import type { History, Note } from '@/types/type';
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
};
