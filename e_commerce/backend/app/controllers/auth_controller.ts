import type { HttpContext } from '@adonisjs/core/http';
import { loginValidator, registerValidator } from '#validators/auth_validator';
import { AuthService } from '#services/auth_service';
import { inject } from '@adonisjs/core';

@inject()
export default class AuthController {
  constructor(private authService: AuthService) {}

  public async register({ request, response }: HttpContext) {
    const payload = await request.validateUsing(registerValidator);
    const result = await this.authService.createUser(payload);

    // Set HTTP-only cookie
    response.cookie('access_token', result.accessToken.value!.release(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days in seconds
      path: '/',
    });

    // Return user from result (now included in repository response)
    return response.created({
      message: 'User registered successfully',
      user: result.user,
    });
  }

  public async login({ request, response }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator);
    const result = await this.authService.login(email, password);

    // Set HTTP-only cookie
    response.cookie('access_token', result.accessToken.value!.release(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days in seconds
      path: '/',
    });

    // Don't send token in response body
    return response.ok({
      message: result.message,
      user: result.user,
      access_token: result.accessToken.value!.release(),
    });
  }

  public async logout({ auth, response }: HttpContext) {
    try {
      // Try to authenticate and delete token from database
      await auth.check();
      const user = auth.user!;
      await this.authService.logout(user);
    } catch (error) {
      // If authentication fails, that's okay
      // Token might already be invalid/expired
      console.log('Logout: Token already invalid or expired');
    }

    // Always clear the HTTP-only cookie
    response.clearCookie('access_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });

    return response.ok({
      message: 'Successfully logged out',
    });
  }

  public async profile({ auth }: HttpContext) {
    await auth.check();
    const user = auth.user!;
    return this.authService.getUser(user);
  }

  public async getUserList({ auth }: HttpContext) {
    await auth.check();

    return this.authService.getUserList();
  }
}
