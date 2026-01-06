import type { HttpContext } from '@adonisjs/core/http';
import type { NextFn } from '@adonisjs/core/types/http';
import type { Authenticators } from '@adonisjs/auth/types';

export default class AuthMiddleware {
  redirectTo = '/login';

  async handle(
    ctx: HttpContext,
    next: NextFn,
    options: {
      guards?: (keyof Authenticators)[];
    } = {},
  ) {
    const token = ctx.request.cookie('access_token');

    if (token) {
      ctx.request.request.headers.authorization = `Bearer ${token}`;
    }

    try {
      await ctx.auth.authenticateUsing(options.guards, {
        loginRoute: this.redirectTo,
      });
    } catch (error) {
      ctx.response.clearCookie('access_token');

      return ctx.response.unauthorized({
        error: 'Authentication failed',
        message: 'Invalid or expired token',
      });
    }

    return next();
  }
}
