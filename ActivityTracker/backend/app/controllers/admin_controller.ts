import ImageUpload from '#models/image_upload';
import User from '#models/user';
import { getScreenshotByUserValidator } from '#validators/getScreenshotByUser';
import type { HttpContext } from '@adonisjs/core/http';
import { DateTime } from 'luxon';

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
}
