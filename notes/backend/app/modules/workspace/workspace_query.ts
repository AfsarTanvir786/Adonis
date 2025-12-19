import Note from '#models/note';
import Workspace from '#models/workspace';
import { Exception } from '@adonisjs/core/exceptions';
import { Pagination } from '../../utils/types.js';

export default class WorkspaceRepository {
  async create(data: Partial<Workspace>) {
    return Workspace.create(data)
  }

  async findById(id: number) {
    const workspace = await Workspace.query()
      .where('id', id)
      .preload('user')
      .preload('company')
      .first()

    if (!workspace) {
      throw new Exception('Workspace not found', { status: 404 })
    }

    return workspace
  }

  async paginateByCompany(companyId: number, pagination: Pagination) {
    return Workspace.query()
      .where('companyId', companyId)
      .orderBy(pagination.sortBy, pagination.orderBy)
      .paginate(pagination.page, pagination.limit)
  }

  async paginatePublicNotes(workspaceId: number, pagination: Pagination) {
    const sortColumn =
      pagination.sortBy === 'name' ? 'title' : pagination.sortBy

    return Note.query()
      .where('workspace_id', workspaceId)
      .where('type', 'public')
      .where('is_draft', false)
      .orderBy(sortColumn, pagination.orderBy)
      .paginate(pagination.page, pagination.limit)
  }

  async update(workspace: Workspace, data: Partial<Workspace>) {
    workspace.merge(data)
    await workspace.save()
    return workspace
  }

  async delete(workspace: Workspace) {
    await workspace.delete()
  }
}
