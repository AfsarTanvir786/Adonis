import type { HttpContext } from '@adonisjs/core/http';
import type { NextFn } from '@adonisjs/core/types/http';
import type { Authenticators } from '@adonisjs/auth/types';

/**
 * Auth middleware is used authenticate HTTP requests and deny
 * access to unauthenticated users.
 */
export default class AuthMiddleware {
  /**
   * The URL to redirect to, when authentication fails
   */
  redirectTo = '/login';

  async handle(
    ctx: HttpContext,
    next: NextFn,
    options: {
      guards?: (keyof Authenticators)[];
    } = {},
  ) {
    // Extract token from HTTP-only cookie
    const token = ctx.request.cookie('access_token');

    if (token) {
      // IMPORTANT: Set the Authorization header so AdonisJS auth can read it
      ctx.request.request.headers.authorization = `Bearer ${token}`;
    }

    try {
      await ctx.auth.authenticateUsing(options.guards, {
        loginRoute: this.redirectTo,
      });
    } catch (error) {
      // If this is a logout request, allow it to proceed even if auth fails
      const url = ctx.request.url();
      if (url.includes('/logout')) {
        return next();
      }
      throw error;
    }

    return next();
  }
}
