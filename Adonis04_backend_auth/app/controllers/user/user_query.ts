import User from '#models/user';

export default class UserQuery {
  public async getUserList() {
    return await User.all();
  }

  async getUserById(id: number): Promise<User | null> {
    return await User.findOrFail(id);
  }

  async getPaginatedUsers(
    page: number,
    limit: number,
    sort_by: string,
    sort_order: 'asc' | 'desc',
  ) {
    try {
      return await User.query().orderBy(sort_by, sort_order).paginate(page, limit);
    } catch (error) {
      throw new Error(
        'Failed to fetch users, user_service.ts: ' + error.message,
      );
    }
  }
}
