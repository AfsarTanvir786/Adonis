import User from '#models/user';
import { loginValidator } from '#validators/auth';
import type { HttpContext } from '@adonisjs/core/http';
import { cookieConfig } from '../helper/cookieConfig.js';
import { DateTime } from 'luxon';

export default class AuthController {
  async login({ auth, request, response }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)

    try {
      const user = await User.verifyCredentials(email, password)

      user.lastLoginAt = DateTime.now()
      await user.save();

      const token = await auth.use('jwt').generate(user)
      response.cookie('access_token', token.token, cookieConfig())
      return response.ok({
        message: 'Login successful',
        data: user,
      });
    } catch (error) {
      return response.unauthorized({
        error: 'Invalid credentials',
      })
    }
  }

  async logout({ response }: HttpContext) {
    response.clearCookie('access_token')

    return response.ok({
      message: 'Logged out successfully',
    })
  }

  async profile({ auth, response }: HttpContext) {
    await auth.user!.load('company');

    return response.ok(auth.user!);
  }
}
