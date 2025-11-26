import User from '#models/user'
import UserQuery from './user_query.js'

export class UserService {
  private userQuery: UserQuery

  constructor() {
    this.userQuery = new UserQuery()
  }

  async getUserList(): Promise<User[]> {
    try {
      return await this.userQuery.getUserList();
    } catch (error) {
      throw new Error('Failed to fetch user list, user_service.ts: ' + error.message)
    }
  }

  async getUserById(id: number): Promise<User | null> {
    const user = await this.userQuery.getUserById(id);
    if (!user) {
      throw new Error(`User with id ${id} not found`)
    }
    return user
  }

  async getPaginatedUsers(
    page: number = 1,
    limit: number = 10,
    sort_by: string = 'id',
    sort_order: 'asc' | 'desc' = 'asc',
  ) {
    try {
      return await this.userQuery.getPaginatedUsers(page, limit, sort_by, sort_order);
    } catch (error) {
      throw new Error('Failed to fetch users, user_service.ts: ' + error.message)
    }
  }
}




/* 
  async getUserByEmail(email: string): Promise<User | null> {
    const user = await User.findBy('email', email)
    if (!user) {
      throw new Error(`User with email ${email} not found`)
    }
    return user
  }

  async createUser(data: { email: string; password: string; fullName: string }): Promise<User> {
    try {
      const user = await User.create(data)
      return user
    } catch (error) {
      throw new Error('Failed to create user, user_service.ts: ' + error.message)
    }
  }

  async updateUser(id: number, data: Partial<User>): Promise<User> {
    const user = await User.find(id)
    if (!user) {
      throw new Error(`User with id ${id} not found`)
    }

    Object.assign(user, data)

    try {
      await user.save()
      return user
    } catch (error) {
      throw new Error('Failed to update user, user_service.ts: ' + error.message)
    }
  }

  async deleteUser(id: number): Promise<void> {
    const user = await User.find(id)
    if (!user) {
      throw new Error(`User with id ${id} not found`)
    }

    try {
      await user.delete()
    } catch (error) {
      throw new Error('Failed to delete user, user_service.ts: ' + error.message)
    }
  }

  async getUserCount(): Promise<number> {
    try {
      return await User.query()
        .count('* as total')
        .then((result) => result[0].$extras.total)
    } catch (error) {
      throw new Error('Failed to fetch user count, user_service.ts: ' + error.message)
    }
  }

  */