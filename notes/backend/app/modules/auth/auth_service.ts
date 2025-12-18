import User from '#models/user';
import { AccessToken } from '@adonisjs/auth/access_tokens';
import { inject } from '@adonisjs/core';
import AuthRepository from './auth_query.js';
import { CompanyService } from '../company/company_service.js';
@inject()
export class AuthService {
  constructor(
    private authRepository: AuthRepository,
    private companyService: CompanyService,
  ) {}

  public async register(data: Partial<User>, host: string) {
    const company = await this.companyService.getByName(host);
    if (!company.data) {
      throw new Error('Company does not exits');
    }

    return this.authRepository.createUser(data, company.data.id);
  }

  public async login(data: { email: string; password: string }, host: string) {
    const company = await this.companyService.getByName(host);
    if (!company.data) {
      throw new Error('Invalid company domain');
    }

    return this.authRepository.login(
      data.email,
      data.password,
      company.data.id,
    );
  }

  public async logout(user: User & { currentAccessToken: AccessToken }) {
    return this.authRepository.logout(user);
  }
}
