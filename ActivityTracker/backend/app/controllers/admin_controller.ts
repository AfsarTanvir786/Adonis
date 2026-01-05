import ImageUpload from '#models/image_upload';
import User from '#models/user';
import { getScreenshotByUserValidator } from '#validators/getScreenshotByUser';
import type { HttpContext } from '@adonisjs/core/http';
import { DateTime } from 'luxon';
import { Pagination } from '../utils/types.js';
import { paginationValidator } from '#validators/pagination_validator';
import { createUserValidator } from '#validators/create_user';

export default class AdminController {
  async adminDashboard({ auth, response }: HttpContext) {
    const users = await User.query().where('company_id', auth.user!.companyId);

    return response.ok({
      users,
    });
  }

  async screenshots({ request, response, auth }: HttpContext) {
    const { userId, date } = await request.validateUsing(
      getScreenshotByUserValidator,
    );
    try {
      const selectedDate = DateTime.fromJSDate(new Date(date));

      const startOfDay = selectedDate.startOf('day').toSQL()!;
      const endOfDay = selectedDate.endOf('day').toSQL()!;

      const query = ImageUpload.query()
        .where('userId', userId)
        .where('companyId', auth.user!.companyId)
        .whereBetween('activityTime', [startOfDay, endOfDay])
        .orderBy('activityTime', 'desc');

      const screenshots = await query;

      return response.ok({
        data: screenshots,
        meta: { total: screenshots.length },
      });
    } catch (error) {
      return response.badRequest({ error: 'Failed to fetch screenshots' });
    }
  }

  async screenshotsGrouped10Min({ request, response, auth }: HttpContext) {
    const { userId, date } = await request.validateUsing(
      getScreenshotByUserValidator,
    );

    const selectedDate = DateTime.fromJSDate(new Date(date));
    const startOfDay = selectedDate.startOf('day').toSQL()!;
    const endOfDay = selectedDate.endOf('day').toSQL()!;

    const screenshots = await ImageUpload.query()
      .where('userId', userId)
      .where('companyId', auth.user!.companyId)
      .whereBetween('activityTime', [startOfDay, endOfDay])
      .orderBy('activityTime', 'asc');

    const grouped: Record<string, Record<string, ImageUpload[]>> = {};

    for (const shot of screenshots) {
      const hourKey = shot.activityTime.hour;
      const intervalStart = Math.floor(shot.activityTime.minute / 10) * 10;
      const intervalKey = `${shot.activityTime.toFormat('HH')}:${intervalStart
        .toString()
        .padStart(2, '0')}`;

      if (!grouped[hourKey]) {
        grouped[hourKey] = {};
      }

      if (!grouped[hourKey][intervalKey]) {
        grouped[hourKey][intervalKey] = [];
      }

      grouped[hourKey][intervalKey].push(shot);
    }

    return response.ok({
      data: grouped,
      meta: { total: screenshots.length },
    });
  }

  async screenshotsGroupedByHour({ request, response, auth }: HttpContext) {
    const { userId, date } = await request.validateUsing(
      getScreenshotByUserValidator,
    );

    const selectedDate = DateTime.fromJSDate(new Date(date));
    const startOfDay = selectedDate.startOf('day').toSQL()!;
    const endOfDay = selectedDate.endOf('day').toSQL()!;

    const screenshots = await ImageUpload.query()
      .where('userId', userId)
      .where('companyId', auth.user!.companyId)
      .whereBetween('activityTime', [startOfDay, endOfDay])
      .orderBy('activityTime', 'asc');

    const grouped: Record<string, ImageUpload[]> = {};

    for (const shot of screenshots) {
      const hourKey = shot.activityTime.hour;

      if (!grouped[hourKey]) {
        grouped[hourKey] = [];
      }

      grouped[hourKey].push(shot);
    }

    return response.ok({
      data: grouped,
      meta: { total: screenshots.length },
    });
  }

  async users({ request, response, auth }: HttpContext) {
    const payload = await request.validateUsing(paginationValidator);
    const pagination: Pagination = {
      page: Number(payload.page) ?? 1,
      limit: Number(payload.limit) ?? 10,
      sortBy: payload.sortBy ?? 'name',
      orderBy: payload.orderBy ?? 'desc',
      search: payload.search,
    };
    try {
      const query = User.query()
        .select('id', 'name', 'email', 'role', 'is_active', 'last_login_at')
        .where('company_id', auth.user!.companyId);

      if (pagination.search) {
        query.where('name', 'like', `%${pagination.search}%`);
      }

      const users = await query
        .orderBy(pagination.sortBy, pagination.orderBy)
        .paginate(pagination.page, pagination.limit);

      return response.ok(users);
    } catch (error) {
      return response.badRequest({ error: 'Failed to fetch screenshots' });
    }
  }

  async addUser({ request, response, auth }: HttpContext) {
    const payload = await request.validateUsing(createUserValidator);
    try {
      const user = await User.create({
        ...payload,
        isActive: true,
        companyId: auth.user!.companyId,
      });
      return response.created(user);
    } catch (error) {
      return response.badRequest({ message: `something went wrong, ${error}` });
    }
  }

  async destroy({ params, response, auth }: HttpContext) {
    try {
      const userId = Number(params.id);

      if (Number.isNaN(userId)) {
        return response.badRequest({ message: 'Invalid user id' });
      }

      const owner = auth.user!;
      await owner.load('company');

      if (owner.email !== owner.company.ownerEmail) {
        return response.forbidden({
          message: 'You are not allowed to do this',
        });
      }

      const employee = await User.query()
        .where('id', userId)
        .where('company_id', owner.companyId)
        .first();

      if (!employee) {
        return response.notFound({ message: 'User not found' });
      }

      if (employee.id === owner.id) {
        return response.badRequest({
          message: 'You cannot delete your own account',
        });
      }

      await employee.delete();

      return response.noContent();
    } catch (error) {
      return response.badRequest({ message: `something went wrong, ${error}` });
    }
  }
}
