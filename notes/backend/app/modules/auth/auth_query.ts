import Company from '#models/company';
import User from '#models/user';
import { AccessToken } from '@adonisjs/auth/access_tokens';

export default class AuthRepository {
  private async createAccessToken(user: User) {
    const access_tokens = await User.accessTokens.create(user)

    return {
      accessToken: access_tokens,
      expiresAt: access_tokens.expiresAt,
      user: user,
    }
  }

  public async createUserWithCompany(data: Partial<User>, host: string) {
    // Remove :3333 from localhost and similar cases
    const cleanHost = host.split(':')[0].toLowerCase()

    // Check if company exists
    let company = await Company.query().where('name', cleanHost).first()

    // If not, create
    if (!company) {
    //   company = await Company.create({
    //     name: cleanHost,
    //   })
        return {
          success: false,
          message: "company doesn't exist.",
        }
    }
    // Now create the user tied to the company
    const user = await User.create({
      companyId: company.id,
      name: data.name!,
      email: data.email!,
      password: data.password!, 
    })

    // Create access token using Adonis built-in method
    const accessToken = await User.accessTokens.create(user)

    return {
      user,
      accessToken,
    }
  }

  public async login(email: string, password: string) {
    const user = await User.verifyCredentials(email, password)
    
    await user.load((loader) => {
        loader.load('company', (companyQuery) => {
          companyQuery.preload('workspaces')
        })
    })
    const token = await this.createAccessToken(user);

    return {
      message: 'Login successful',
      accessToken: token.accessToken,
      expiresAt: token.expiresAt,
      user: token.user,
    }
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
    const userList = await User.all();
    return {
      data: userList,
    };
  }
}
