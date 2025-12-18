import User from '#models/user';
import { AccessToken } from '@adonisjs/auth/access_tokens';

export default class AuthRepository {
  public async createUser(data: Partial<User>, companyId: number) {
    const user = await User.create({
      companyId,
      name: data.name!,
      email: data.email!,
      password: data.password!,
    });

    const token = await User.accessTokens.create(user);

    return {
      user,
      token: token.value!.release(),
      expiresAt: token.expiresAt,
    };
  }

  public async login(email: string, password: string, companyId: number) {
    const user = await User.verifyCredentials(email, password);

    if (user.companyId !== companyId) {
      throw new Error('User does not belong to this company');
    }

    const token = await User.accessTokens.create(user);

    return {
      user,
      token: token.value!.release(),
      expiresAt: token.expiresAt,
    };
  }

  public async logout(user: User & { currentAccessToken: AccessToken }) {
    await User.accessTokens.delete(user, user.currentAccessToken.identifier);
  }
}
