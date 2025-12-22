import type { Company, PaginatedResponse, Pagination, User, Workspace } from '@/types/type';
import { api } from './api';

type WorkspaceResponse = Workspace & {
  user: User;
  company: Company;
};

export type CreateWorkspacePayload = {
  name: string;
  description?: string;
};

export const workspaceService = {
  async paginatedList(
    params: Partial<Pagination>
  ): Promise<PaginatedResponse<Workspace>> {
    try {
      const response = await api.get<PaginatedResponse<Workspace>>(
        `/workspaces`,
        { params }
      );
      return response.data;
    } catch (error: any) {
      throw new error('Get Workspace error:', error.response?.data);
    }
  },

  async list() {
    try {
      const response = await api.get<{ id: number; name: string }[]>(
        '/workspaces/all'
      );
      return response.data;
    } catch (error: any) {
      throw new error('Get Workspace error:', error.response?.data);
    }
  },

  async get(workspaceId: number): Promise<WorkspaceResponse> {
    try {
      const response = await api.get(`/workspaces/${workspaceId}`);
      return response.data;
    } catch (error: any) {
      throw new error('Get Workspace error:', error.response?.data);
    }
  },

  async create(data: CreateWorkspacePayload): Promise<Workspace> {
    try {
      const response = await api.post('/workspaces', data);
      return response.data;
    } catch (error: any) {
      throw new error('Create Workspace error:', error.response?.data);
    }
  },

  async update(
    data: Partial<Workspace>,
    workspaceId: number
  ): Promise<WorkspaceResponse> {
    try {
      const response = await api.put(`/workspaces/${workspaceId}`, data);
      return response.data;
    } catch (error: any) {
      throw new error('update Workspace error:', error.response?.data);
    }
  },

  async delete(workspaceId: number) {
    try {
      const response = await api.delete(`/workspaces/${workspaceId}`);
      return response.data;
    } catch (error: any) {
      throw new error('delete Workspace error:', error.response?.data);
    }
  },
};
