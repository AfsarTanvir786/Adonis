import User from '#models/user'
import { AccessToken } from '@adonisjs/auth/access_tokens'
import { inject } from '@adonisjs/core'
import AuthRepository from './auth_query.js'
@inject()
export class AuthService {
  constructor(private authRepository: AuthRepository) {}

  public async createUserWithCompany(user: Partial<User>, host: string) {
    return this.authRepository.createUserWithCompany(user, host)
  }

  public async login(email: string, password: string) {
    return await this.authRepository.login(email, password)
  }

  public async logout(
    user: User & {
      currentAccessToken: AccessToken
    }
  ) {
    return await this.authRepository.logout(user)
  }

  public async getUser(user: User) {
    return await this.authRepository.getUser(user)
  }

  public async getUserList() {
    return await this.authRepository.getUserList()
  }
}
