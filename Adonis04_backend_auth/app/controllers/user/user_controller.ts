import User from '#models/user';
import { UserService } from '#controllers/user/user_service';
import type { HttpContext } from '@adonisjs/core/http';
import { paginatedUserValidator } from './user_validator.js';

export default class UsersController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async index({ response }: HttpContext) {
    try {
      const userList: User[] = await this.userService.getUserList();
      return response.ok({
        success: true,
        data: userList,
      });
    } catch (error) {
      return response.internalServerError({
        success: false,
        message: error.message,
      });
    }
  }

  async paginatedList({ request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(paginatedUserValidator)
      const {page, limit, sort_by, sort_order} = payload;
      
      const userList = await this.userService.getPaginatedUsers(
        page,
        limit,
        sort_by,
        sort_order,
      );

      return response.ok({
        success: true,
        data: userList,
      });
    } catch (error) {
      return response.internalServerError({
        success: false,
        message: error.message,
      });
    }
  }
}

/* 
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
  } */
