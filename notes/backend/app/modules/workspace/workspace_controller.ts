import { inject } from '@adonisjs/core';
import type { HttpContext } from '@adonisjs/core/http';
import {
  createWorkspaceValidator,
  updateWorkspaceValidator,
} from './workspace_validator.js';
import { WorkspaceService } from './workspace_service.js';
import { paginationValidator } from '../../validator/pagination_validator.js';

@inject()
export default class WorkspacesController {
  constructor(private workspaceService: WorkspaceService) {}

  async create({ auth, request, response }: HttpContext) {
    const payload = await request.validateUsing(createWorkspaceValidator);
    const result = await this.workspaceService.createWorkspace(
      payload,
      auth.user!,
    );
    return response.created(result);
  }

  async list({ request, auth, response }: HttpContext) {
    const filter = await request.validateUsing(paginationValidator);
    const result = await this.workspaceService.listWorkspaces(
      auth.user!.companyId,
      filter,
    );
    return response.ok(result);
  }

  async show({ params, auth, response }: HttpContext) {
    const result = await this.workspaceService.getWorkspaceOrFail(
      Number(params.id),
      auth.user!.companyId,
    );
    return response.ok(result);
  }

  async listPublicNotes({ params, request, auth, response }: HttpContext) {
    const filter = await request.validateUsing(paginationValidator);
    const result = await this.workspaceService.listPublicNotes(
      Number(params.id),
      auth.user!,
      filter,
    );
    return response.ok(result);
  }

  async update({ params, request, auth, response }: HttpContext) {
    const payload = await request.validateUsing(updateWorkspaceValidator);
    const result = await this.workspaceService.updateWorkspace(
      Number(params.id),
      payload,
      auth.user!,
    );
    return response.ok(result);
  }

  async destroy({ params, auth, response }: HttpContext) {
    await this.workspaceService.deleteWorkspace(Number(params.id), auth.user!);
    return response.noContent();
  }
}
