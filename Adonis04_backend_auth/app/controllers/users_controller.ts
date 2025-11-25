import User from '#models/user'
import { UserService } from '#services/user_service'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  private userService: UserService

  constructor() {
    this.userService = new UserService()
  }

  /**
   * Get all users
   * GET /users
   */
  async index({ response }: HttpContext) {
    try {
      const userList: User[] = await this.userService.getUserList()
      return response.ok({
        success: true,
        data: userList,
      })
    } catch (error) {
      return response.internalServerError({
        success: false,
        message: error.message,
      })
    }
  }

  /**
   * Get paginated users
   * GET /users?page=1&limit=10
   */
  async paginatedList({ request, response }: HttpContext) {
    try {
      const page = Number(request.input('page', 1))
      const limit = Number(request.input('limit', 10))

      const userList = await this.userService.getPaginatedUsers(page, limit)

      return response.ok({
        success: true,
        data: userList,
      })
    } catch (error) {
      return response.internalServerError({
        success: false,
        message: error.message,
      })
    }
  }

  /**
   * Get single user
   * GET /users/:id
   */
  async show({ params, response }: HttpContext) {
    try {
      const user = await this.userService.getUserById(Number(params.id))
      return response.ok({
        success: true,
        data: user,
      })
    } catch (error) {
      return response.status(error.status || 500).json({
        success: false,
        message: error.message,
      })
    }
  }
  
  /**
   * Create new user
   * POST /users
   */
  async store({ request, response }: HttpContext) {
    try {
      const data = request.only(['email', 'password', 'fullName'])
      const user = await this.userService.createUser(data)

      return response.created({
        success: true,
        message: 'User created successfully',
        data: user,
      })
    } catch (error) {
      return response.status(error.status || 500).json({
        success: false,
        message: error.message,
      })
    }
  }

  /**
   * Update user
   * PUT /users/:id
   */
  async update({ params, request, response }: HttpContext) {
    try {
      const data = request.only(['email', 'password', 'fullName'])
      const user = await this.userService.updateUser(params.id, data)

      return response.ok({
        success: true,
        message: 'User updated successfully',
        data: user,
      })
    } catch (error) {
      return response.status(error.status || 500).json({
        success: false,
        message: error.message,
      })
    }
  }

  /**
   * Delete user
   * DELETE /users/:id
   */
  async destroy({ params, response }: HttpContext) {
    try {
      await this.userService.deleteUser(params.id)

      return response.ok({
        success: true,
        message: 'User deleted successfully',
      })
    } catch (error) {
      return response.status(error.status || 500).json({
        success: false,
        message: error.message,
      })
    }
  }
}
