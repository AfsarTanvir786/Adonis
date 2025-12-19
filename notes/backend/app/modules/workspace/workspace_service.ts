import { inject } from '@adonisjs/core';
import User from '#models/user';
import Workspace from '#models/workspace';
import WorkspaceRepository from './workspace_query.js';
import { Pagination } from '../../utils/types.js';
import { Exception } from '@adonisjs/core/exceptions';
import { normalizePagination } from '#services/normalize_pagination';

@inject()
export class WorkspaceService {
  constructor(private workspaceRepo: WorkspaceRepository) {}

  async createWorkspace(data: Partial<Workspace>, user: User) {
    return this.workspaceRepo.create({
      ...data,
      userId: user.id,
      companyId: user.companyId,
    });
  }

  async getWorkspaceOrFail(id: number, companyId: number) {
    const workspace = await this.workspaceRepo.findById(id);

    if (workspace.companyId !== companyId) {
      throw new Exception('Access denied', { status: 403 });
    }

    return workspace;
  }

  async listWorkspaces(companyId: number, filter: Partial<Pagination>) {
    return this.workspaceRepo.paginateByCompany(
      companyId,
      normalizePagination(filter),
    );
  }

  async listPublicNotes(
    workspaceId: number,
    companyId: number,
    filter: Partial<Pagination>,
  ) {
    const workspace = await this.getWorkspaceOrFail(workspaceId, companyId);

    return this.workspaceRepo.paginatePublicNotes(
      workspace.id,
      normalizePagination(filter),
    );
  }

  async updateWorkspace(id: number, data: Partial<Workspace>, user: User) {
    const workspace = await this.getWorkspaceOrFail(id, user.companyId);

    if (
      workspace.userId !== user.id &&
      !['admin', 'owner'].includes(user.role)
    ) {
      throw new Exception('Access denied', { status: 403 });
    }

    return this.workspaceRepo.update(workspace, data);
  }

  async deleteWorkspace(id: number, user: User) {
    const workspace = await this.getWorkspaceOrFail(id, user.companyId);

    if (
      workspace.userId !== user.id &&
      !['admin', 'owner'].includes(user.role)
    ) {
      throw new Exception('Access denied', { status: 403 });
    }

    await this.workspaceRepo.delete(workspace);
  }
}
