import Workspace from '#models/workspace';
import { Exception } from '@adonisjs/core/exceptions';
import { Pagination } from '../../utils/types.js';

export default class WorkspaceRepository {
  async create(data: Partial<Workspace>) {
    return Workspace.create(data);
  }

  async findById(id: number) {
    const workspace = await Workspace.query()
      .where('id', id)
      .preload('user')
      .preload('company')
      .first();

    if (!workspace) {
      throw new Exception('Workspace not found', { status: 404 });
    }

    return workspace;
  }

  async paginateByCompany(companyId: number, pagination: Pagination) {
    return await Workspace.query()
      .where('companyId', companyId)
      .orderBy(pagination.sortBy, pagination.orderBy)
      .paginate(pagination.page, pagination.limit);
  }

  async getWorkspaceList(companyId: number) {
    // improve by passing just ids
    return await Workspace.query().where('companyId', companyId);
  }

  async update(workspace: Workspace, data: Partial<Workspace>) {
    workspace.merge(data);
    await workspace.save();
    return workspace;
  }

  async delete(workspace: Workspace) {
    await workspace.delete();
  }
}
