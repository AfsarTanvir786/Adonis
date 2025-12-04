import User from '#models/user';
import { AccessToken } from '@adonisjs/auth/access_tokens';

export default class AuthRepository {
  private async createAccessToken(user: User) {
    const access_tokens = await User.accessTokens.create(user);

    return {
      accessToken: access_tokens,
      expiresAt: access_tokens.expiresAt,
      user: user,
    };
  }

  public async createUser(data: Partial<User>) {
    const user = await User.create(data);

    return this.createAccessToken(user);
  }

  public async login(email: string, password: string) {
    const user = await User.verifyCredentials(email, password);
    const token = await this.createAccessToken(user);

    return {
      message: 'Login successful',
      accessToken: token.accessToken,
      expiresAt: token.expiresAt,
      user: token.user,
    };
  }

  public async logout(
    user: User & {
      currentAccessToken: AccessToken;
    },
  ) {
    await User.accessTokens.delete(user, user.currentAccessToken.identifier);

    return {
      message: 'successfully logout.',
    };
  }

  public async getUser(user: User) {
    return {
      data: user,
    };
  }

  public async getUserList() {
    const userList = await User.all()
    return {
      data: userList,
    };
  }
}
