import { inject } from '@adonisjs/core'
import User from '#models/user'
import Workspace from '#models/workspace'
import WorkspaceRepository from './workspace_query.js'

@inject()
export class WorkspaceService {
  constructor(private workspaceRepository: WorkspaceRepository) {}

  async createWorkspace(data: Partial<Workspace>, user: User) {
    const WorkspacePayload = {
      ...data,
      userId: user.id,
      companyId: user.companyId,
    }

    return this.workspaceRepository.createWorkspace(WorkspacePayload)
  }

  async getWorkspace(id: number) {
    return this.workspaceRepository.getWorkspace(id)
  }

  async getWorkspaceNoteList(workspaceId: number, companyId: number) {
    return this.workspaceRepository.getWorkspaceNoteList(workspaceId, companyId)
  }

  async updateWorkspace(Workspace: Partial<Workspace>, id: number, user: User) {
    return this.workspaceRepository.updateWorkspace(Workspace, id, user)
  }

  async getWorkspaceList(id: number) {
    return this.workspaceRepository.getWorkspaceList(id)
  }

  async deleteWorkspace(id: number, user: User) {
    return this.workspaceRepository.deleteWorkspace(id, user)
  }
}
