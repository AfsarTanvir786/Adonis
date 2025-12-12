import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import { AuthService } from './auth_service.js'
import { loginValidator, registerValidator } from './auth_validator.js'
import { CompanyService } from '../company/company_service.js'

@inject()
export default class AuthController {
  constructor(
    private authService: AuthService,
    private companyService: CompanyService
  ) {}

  public async register({ request, response }: HttpContext) {
    const payload = await request.validateUsing(registerValidator)
    const host = request.header('host')?.split(':')[0]

    if (!host) {
      return response.badRequest({ message: 'Missing host header' })
    }
    const company = await this.companyService.getByName(host)

    if (!company) {
      return response.badRequest({
        message: 'Invalid company host. Company does not exist.',
      })
    }

    const result = await this.authService.createUserWithCompany(payload, host)
    if (result.success == false) {
      return result
    }

    response.cookie('access_token', result.accessToken!.value!.release(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    })

    return response.created({
      message: 'User registered successfully',
      user: result.user,
      access_token: result.accessToken,
    })
  }

  public async login({ request, response }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)

    const host = request.header('host')?.split(':')[0]

    if (!host) {
      return response.badRequest({ message: 'Missing host header' })
    }
    const company = await this.companyService.getByName(host)

    if (!company) {
      return response.badRequest({
        message: 'Company not found for this domain. Cannot login.',
      })
    }
    const result = await this.authService.login(email, password)

    // Set HTTP-only cookie
    response.cookie('access_token', result.accessToken.value!.release(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days in seconds
      path: '/',
    })

    // Don't send token in response body
    return response.ok({
      message: result.message,
      user: result.user,
      access_token: result.accessToken.value!.release(),
    })
  }

  public async logout({ auth, response }: HttpContext) {
    try {
      // Try to authenticate and delete token from database
      await auth.check()
      const user = auth.user!
      await this.authService.logout(user)
    } catch (error) {
      // If authentication fails, that's okay
      // Token might already be invalid/expired
      console.log('Logout: Token already invalid or expired')
    }

    // Always clear the HTTP-only cookie
    response.clearCookie('access_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    })

    return response.ok({
      message: 'Successfully logged out',
    })
  }

  public async profile({ auth }: HttpContext) {
    await auth.check()
    const user = auth.user!
    return this.authService.getUser(user)
  }

  public async getUserList({ auth }: HttpContext) {
    await auth.check()

    return this.authService.getUserList()
  }
}
