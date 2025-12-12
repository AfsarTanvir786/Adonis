import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { createWorkspaceValidator, updateWorkspaceValidator } from './workspace_validator.js'
import { WorkspaceService } from './workspace_service.js'

@inject()
export default class WorkspacesController {
  constructor(private workspaceService: WorkspaceService) {}

  async create({ auth, request, response }: HttpContext) {
    const user = auth.user

    if (!user) {
      return response.unauthorized({
        sucess: false,
        message: 'Not authenticated',
      })
    }

    const payload = await request.validateUsing(createWorkspaceValidator)

    const result = await this.workspaceService.createWorkspace(payload, user)

    return response.created(result)
  }

  async show({ params, response, auth }: HttpContext) {
    const user = auth.user

    if (!user) {
      return response.unauthorized({
        success: false,
        message: 'Not authenticated',
      })
    }

    const result = await this.workspaceService.getWorkspace(params.id)

    if (!result.success) return response.notFound(result)

    if (user.companyId !== result.data?.companyId) {
      return response.unauthorized({
        success: false,
        message: 'Access denied to this workspace',
      })
    }

    return response.ok(result)
  }

  async list({ response, auth }: HttpContext) {
    const user = auth.user

    if (!user) {
      return response.unauthorized({
        success: false,
        message: 'Not authenticated',
      })
    }
    const result = await this.workspaceService.getWorkspaceList(user.companyId)

    if (!result.success) return response.notFound(result)

    return response.ok(result)
  }

  async update({ request, response, params, auth }: HttpContext) {
    const user = auth.user

    if (!user) {
      return response.unauthorized({
        success: false,
        message: 'Not authenticated',
      })
    }
    const payload = await request.validateUsing(updateWorkspaceValidator)

    const result = await this.workspaceService.updateWorkspace(payload, params.id, user)

    if (!result.success) return response.notFound(result)

    return response.ok(result)
  }

  async delete({ params, response, auth }: HttpContext) {
    const user = auth.user

    if (!user) {
      return response.unauthorized({
        success: false,
        message: 'Not authenticated',
      })
    }
    const result = await this.workspaceService.deleteWorkspace(params.id, user)

    if (!result.success) return response.notFound(result)

    return response.noContent()
  }
}
