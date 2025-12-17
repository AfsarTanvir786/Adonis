import Note from '#models/note'
import User from '#models/user'
import Workspace from '#models/workspace'

export default class WorkspaceRepository {
  async createWorkspace(data: Partial<Workspace>) {
    const workspace = await Workspace.create(data)

    return {
      success: true,
      message: 'Workspace created successfully',
      data: workspace,
    }
  }

  async getWorkspace(id: number) {
    const workspace = await Workspace.query()
      .where('id', id)
      .preload('user')
      .preload('company')
      .first()

    if (!workspace) {
      return {
        success: false,
        message: 'Workspace not found.',
      }
    }

    return {
      success: true,
      message: 'Workspace retrieved.',
      data: workspace,
    }
  }

  async getWorkspaceNoteList(workspaceId: number, companyId: number) {
    const workspace = await Workspace.find(workspaceId);

    if(!workspace || companyId !== workspace.companyId){
      return {
        success: false,
        message: 'Workspace not found.',
      }
    }

    const noteList = await Note.query()
      .where('workspace_id', workspaceId)
      .where('type', 'public')
      .where('is_draft', 0)
    return {
      success: true,
      message: 'Workspace retrieved.',
      data: noteList,
    }
  }

  async updateWorkspace(data: Partial<Workspace>, id: number, user: User) {
    const workspace = await Workspace.find(id)

    if (!workspace) {
      return {
        success: false,
        message: 'Workspace not found.',
      }
    }

    if (workspace.companyId !== user.companyId || workspace.userId !== user.id) {
      return {
        success: false,
        message: 'Access denied to this workspace.',
      }
    }

    workspace.merge({
      name: data.name ?? workspace.name,
      description: data.description ?? workspace.description,
    })

    await workspace.save()

    return {
      success: true,
      message: 'Workspace updated successfully.',
      data: workspace,
    }
  }

  async getWorkspaceList(id: number) {
    const list = await Workspace.query().where('companyId', id)

    return {
      success: true,
      data: list,
    }
  }

  async deleteWorkspace(id: number, user: User) {
    const workspace = await Workspace.find(id)

    if (!workspace) {
      return {
        success: false,
        message: 'Workspace not found.',
      }
    }

    if (workspace.companyId !== user.companyId || workspace.userId !== user.id) {
      return {
        success: false,
        message: 'Access denied to this workspace.',
      }
    }

    await workspace.delete()

    return {
      success: true,
      message: 'Workspace deleted successfully.',
    }
  }
}
