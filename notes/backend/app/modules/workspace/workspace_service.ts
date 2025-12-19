import { inject } from '@adonisjs/core';
import User from '#models/user';
import Workspace from '#models/workspace';
import WorkspaceRepository from './workspace_query.js';
import { Pagination } from '../../utils/types.js';

@inject()
export class WorkspaceService {
  constructor(private workspaceRepository: WorkspaceRepository) {}

  async createWorkspace(data: Partial<Workspace>, user: User) {
    const WorkspacePayload = {
      ...data,
      userId: user.id,
      companyId: user.companyId,
    };

    return this.workspaceRepository.createWorkspace(WorkspacePayload);
  }

  async getWorkspace(id: number) {
    return this.workspaceRepository.getWorkspace(id);
  }

  async getWorkspaceNoteList(
    workspaceId: number,
    companyId: number,
    pagination?: Pagination,
  ) {
    return this.workspaceRepository.getWorkspaceNoteList(
      workspaceId,
      companyId,
      pagination,
    );
  }

  async updateWorkspace(workspace: Partial<Workspace>, id: number, user: User) {
    return this.workspaceRepository.updateWorkspace(workspace, id, user);
  }

  async getWorkspaceList(companyId: number, filter: Partial<Pagination>) {
    const pagination: Pagination = {
      page: filter.page ?? 1,
      limit: filter.limit ?? 20,
      sortBy: filter.sortBy ?? 'createdAt',
      orderBy: filter.orderBy ?? 'desc',
    };

    return this.workspaceRepository.getWorkspaceList(companyId, pagination);
  }

  async deleteWorkspace(id: number, user: User) {
    return this.workspaceRepository.deleteWorkspace(id, user);
  }
}
