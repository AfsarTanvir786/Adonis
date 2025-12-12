import { inject } from '@adonisjs/core'
import User from '#models/user'
import Workspace from '#models/workspace'
import WorkspaceRepository from './workspace_query.js'

@inject()
export class WorkspaceService {
  constructor(private WorkspaceRepository: WorkspaceRepository) {}

  async createWorkspace(data: Partial<Workspace>, user: User) {
    const WorkspacePayload = {
      ...data,
      userId: user.id,
      companyId: user.companyId,
    }

    return this.WorkspaceRepository.createWorkspace(WorkspacePayload)
  }

  async getWorkspace(id: number) {
    return this.WorkspaceRepository.getWorkspace(id)
  }

  async updateWorkspace(Workspace: Partial<Workspace>, id: number, user: User) {
    return this.WorkspaceRepository.updateWorkspace(Workspace, id, user)
  }

  async getWorkspaceList(id: number) {
    return this.WorkspaceRepository.getWorkspaceList(id)
  }

  async deleteWorkspace(id: number, user: User) {
    return this.WorkspaceRepository.deleteWorkspace(id, user)
  }
}
