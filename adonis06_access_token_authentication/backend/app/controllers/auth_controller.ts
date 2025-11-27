import User from '#models/user';
import { loginValidator, registerValidator } from '#validators/auth';
import type { HttpContext } from '@adonisjs/core/http';

export default class AuthController {
  async register({ request }: HttpContext) {
    const data = await request.validateUsing(registerValidator);
    const user = await User.create(data);

    return User.accessTokens.create(user);
  }

  async login({ request }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator);
    const user = await User.verifyCredentials(email, password);

    return User.accessTokens.create(user);
  }

  async logout({ auth }: HttpContext) {
    const user = auth.user!;
    await User.accessTokens.delete(user, user.currentAccessToken.identifier)

    return {
      message: 'successfully logout.',
    };
  }

  async me({ auth }: HttpContext) {
    await auth.check()
    return {
      auth_Gaurd: auth.authenticatedViaGuard,
      auth_At: auth.authenticationAttempted,
      auth_defaultGaurd: auth.defaultGuard,
      user: auth.user,
      auth_isAuthenticated: auth.isAuthenticated,
    };
  }
}
