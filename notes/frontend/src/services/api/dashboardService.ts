import type { Note, Workspace } from "@/types/type";
import { api } from "./api";

type DashboardResponse = {
    success: boolean;
    counts: {
        totalNotes: number;
        totalPublicNotes: number;
        totalMembers: number;
        totalWorkspaces: number;
    };
    latestPublicNoteList: Note[];
    myRecentNoteList: Note[];
    latestWorkspace: Workspace;
};
export const dashboardService = {
    async dashboard(): Promise<DashboardResponse> {
        try {
            const response = await api.get(`/dashboard`);
            return response.data;
        } catch (error: any) {
            console.error('Get Workspace error:', error.response?.data);
            throw error;
        }
    },
};
