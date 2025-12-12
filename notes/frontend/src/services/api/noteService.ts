import type { Note } from "@/types/type";
import { api } from "./api";

type NoteList = {
    success: boolean;
    message: any;
    data?: Note[];
}

type NoteDetails = {
    success: boolean;
    message: any;
    data?: Note;
}

export const NoteService = {
    async list(workspaceId: number): Promise<NoteList> {
        try {
            const response = await api.get(`/workspaces/${workspaceId}/notes`);
            return response.data;
        } catch (error: any) {
            console.error('Get Note error:', error.response?.data);
            throw error;
        }
    },

    async get(noteId: number): Promise<NoteDetails> {
        try {
            const response = await api.get(`/notes/${noteId}`);
            return response.data;
        } catch (error: any) {
            console.error('Get Note error:', error.response?.data);
            throw error;
        }
    },

    async myNoteList(): Promise<NoteList> {
        try {
            const response = await api.get(`/notes/my`);
            return response.data;
        } catch (error: any) {
            console.error('Get Note error:', error.response?.data);
            throw error;
        }
    },
};
