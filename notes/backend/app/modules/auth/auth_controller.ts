import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import { AuthService } from './auth_service.js'
import { loginValidator, registerValidator } from './auth_validator.js'
import { cookieConfig } from './cookieConfig.js'
import { apiSuccess } from '../../utils/api_response.js'

@inject()
export default class AuthController {
  constructor(private authService: AuthService) {}

  public async register({ request, response }: HttpContext) {
    const payload = await request.validateUsing(registerValidator)
    const host = this.extractHost(request)

    const result = await this.authService.register(payload, host)

    response.cookie('access_token', result.token, cookieConfig())

    return response.created(apiSuccess('User registered successfully', result.user))
  }

  public async login({ request, response }: HttpContext) {
    const payload = await request.validateUsing(loginValidator)
    const host = this.extractHost(request)

    const result = await this.authService.login(payload, host)

    response.cookie('access_token', result.token, cookieConfig())

    return response.ok(apiSuccess('Login successful', result.user))
  }

  public async logout({ auth, response }: HttpContext) {
    await auth.check().catch(() => null)

    if (auth.user) {
      await this.authService.logout(auth.user)
    }

    response.clearCookie('access_token', cookieConfig())

    return response.ok(apiSuccess('Logged out successfully'))
  }

  public async profile({ auth }: HttpContext) {
    await auth.check()
    return apiSuccess('Profile fetched', auth.user)
  }

  private extractHost(request: HttpContext['request']) {
    const host = request.header('host')?.split(':')[0]
    if (!host) {
      throw new Error('Missing host header')
    }
    return host.toLowerCase()
  }
}
