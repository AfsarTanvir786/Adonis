import type { HttpContext } from '@adonisjs/core/http';
import type { NextFn } from '@adonisjs/core/types/http';

export default class RoleMiddleware {
  async handle(ctx: HttpContext, next: NextFn, roles: string[]) {
    const user = ctx.auth.user;
    if (!user || !roles.includes(user.userType)) {
      return ctx.response.unauthorized({ message: 'Not Allowed' });
    }

    await next();
  }
}
