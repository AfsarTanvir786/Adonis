import Workspace from '#models/workspace';
import { Exception } from '@adonisjs/core/exceptions';
import { Pagination } from '../../utils/types.js';

type SelectableWorkspaceColumns = 'id' | 'name';
type AvailableWorkspaceColumns = {
  id: number;
  name: string;
  [key: string]: any;
}

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

  async getWorkspaceList<T extends SelectableWorkspaceColumns>(
    companyId: number,
    columns: T[] = ['id'] as T[],
  ): Promise<Pick<AvailableWorkspaceColumns, T>[]> {
    const selectColumns: string[] = columns as string[];
    return (await Workspace.query()
      .select(selectColumns)
      .where('companyId', companyId)) as any as Promise<Pick<AvailableWorkspaceColumns, T>[]>;
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
