import type { Workspace } from "@/types/type";
import { api } from "./api";

type WorkspaceList = {
    success: boolean;
    message: any;
    data?: Workspace[];
}

type WorkspaceDetails = {
    success: boolean;
    message: any;
    data?: Workspace;
}

export const WorkspaceService = {
    async list(): Promise<WorkspaceList> {
        try {
            const response = await api.get(`/workspaces`);
            return response.data;
        } catch (error: any) {
            console.error('Get Workspace error:', error.response?.data);
            throw error;
        }
    },

    async get(workspaceId: number): Promise<WorkspaceDetails> {
        try {
            const response = await api.get(`/workspaces/${workspaceId}`);
            return response.data;
        } catch (error: any) {
            console.error('Get Workspace error:', error.response?.data);
            throw error;
        }
    },
};
