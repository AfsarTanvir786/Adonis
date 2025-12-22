import type { HttpContext } from '@adonisjs/core/http';

export class AuthUtils {
  static ensureAuthenticated(ctx: HttpContext) {
    const user = ctx.auth.user;
    if (!user) {
      ctx.response.unauthorized({
        success: false,
        message: 'Not authenticated',
      });
      return null;
    }
    return user;
  }

  static async ensureCompanyExists(
    user: any,
    noteService: any,
    response: HttpContext['response'],
  ) {
    const companyExists = await noteService.doesCompanyExist(user.companyId);

    if (!companyExists) {
      response.badRequest({
        success: false,
        message: 'Company does not exist',
      });
      return false;
    }

    return true;
  }

  static async ensureWorkspaceAccess(
    payloadWorkspaceId: number,
    user: any,
    noteService: any,
    response: HttpContext['response'],
  ) {
    const workspaceIds = await noteService.getUserWorkspaceIds(user.companyId);

    if (
      workspaceIds.length === 0 ||
      !workspaceIds.includes(payloadWorkspaceId)
    ) {
      response.unauthorized({
        success: false,
        message: 'Access denied to this workspace',
      });
      return false;
    }

    return true;
  }
}
