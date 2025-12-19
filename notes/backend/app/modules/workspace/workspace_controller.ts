import { inject } from '@adonisjs/core';
import type { HttpContext } from '@adonisjs/core/http';
import {
  createWorkspaceValidator,
  updateWorkspaceValidator,
} from './workspace_validator.js';
import { WorkspaceService } from './workspace_service.js';
import { Pagination } from '../../utils/types.js';
import { paginationValidator } from '../../validator/pagination_validator.js';

@inject()
export default class WorkspacesController {
  constructor(private workspaceService: WorkspaceService) {}

  async create({ auth, request, response }: HttpContext) {
    const user = auth.user;

    if (!user) {
      return response.unauthorized({
        sucess: false,
        message: 'Not authenticated',
      });
    }

    const payload = await request.validateUsing(createWorkspaceValidator);

    const result = await this.workspaceService.createWorkspace(payload, user);

    return response.created(result);
  }

  async notes({ params, response, auth }: HttpContext) {
    const result = await this.workspaceService.getWorkspaceNoteList(
      params.id,
      auth.user!.companyId,
    );

    if (!result.success) return response.notFound(result);

    return response.ok(result);
  }

  async show({ params, response, auth }: HttpContext) {
    const result = await this.workspaceService.getWorkspace(params.id);

    if (!result.success) return response.notFound(result);

    if (auth.user!.companyId !== result.data?.companyId) {
      return response.unauthorized({
        success: false,
        message: 'Access denied to this workspace',
      });
    }

    return response.ok(result);
  }

  async list({ request, response, auth }: HttpContext) {
    try {
      const user = auth.user!;
      const filter = await request.validateUsing(paginationValidator);

      const result = await this.workspaceService.getWorkspaceList(
        user.companyId,
        filter,
      );

      return response.ok(result);
    } catch (error) {
      return response.badRequest({
        success: false,
        message: error.message ?? 'Failed to fetch workspaces',
      });
    }
  }
  
  async sortList({ request, response, auth, params }: HttpContext) {
    const payload = await request.validateUsing(paginationValidator);
    const pagination: Pagination = {
      page: Number(payload.page) ?? 1,
      limit: Number(payload.limit) ?? 10,
      sortBy: payload.sortBy ?? 'createdAt',
      orderBy: payload.orderBy ?? 'desc',
    };
    const result = await this.workspaceService.getWorkspaceNoteList(
      params.id,
      auth.user!.companyId,
      pagination,
    );

    if (!result.success) return response.notFound(result);

    return response.ok(result);
  }

  async update({ request, response, params, auth }: HttpContext) {
    const payload = await request.validateUsing(updateWorkspaceValidator);

    const result = await this.workspaceService.updateWorkspace(
      payload,
      params.id,
      auth.user!,
    );

    if (!result.success) return response.notFound(result);

    return response.ok(result);
  }

  async destroy({ params, response, auth }: HttpContext) {
    const result = await this.workspaceService.deleteWorkspace(
      params.id,
      auth.user!,
    );

    if (!result.success) return response.notFound(result);

    return response.noContent();
  }
}
