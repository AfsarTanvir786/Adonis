import type { Note, VoteCount, Workspace } from "@/types/type";
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
    myTopNote: VoteCount & { note: Note };
    latestWorkspace: Workspace;
    topPublicNote: VoteCount & { note: Note };
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
