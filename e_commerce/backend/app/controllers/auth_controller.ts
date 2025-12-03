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

    return response.created(result);
  }

  public async login({ request }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator);

    return this.authService.login(email, password);
  }

  public async logout({ auth }: HttpContext) {
    const user = auth.user!;

    return this.authService.logout(user);
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
