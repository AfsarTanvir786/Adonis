import type { HttpContext } from '@adonisjs/core/http'
import ScreenshotService from '#services/screenshot_service'
import { uploadScreenshotValidator } from '#validators/screenshot'

export default class ScreenshotController {
  /**
   * Upload single screenshot
   * POST /api/screenshots/upload
   */
  async upload({ request, response, auth }: HttpContext) {
    try {
      const user = auth.user!;

      const { screenshot, activity_time } = await request.validateUsing(
        uploadScreenshotValidator,
      );

      const result = await ScreenshotService.upload(
        screenshot,
        user.id,
        user.companyId,
        activity_time,
      );

      return response.created({
        message: 'Screenshot uploaded successfully',
        data: result,
      });
    } catch (error) {
      console.error('Upload error:', error);
      return response.badRequest({
        error: 'Upload failed',
        details: error.messages || error.message,
      });
    }
  }

  /**
   * Bulk upload screenshots
   * POST /api/screenshots/bulk-upload
   */
  async bulkUpload({ request, response, auth }: HttpContext) {
    try {
      const user = auth.user!;
      const screenshots = request.files('screenshots', {
        size: '10mb',
        extnames: ['jpg', 'jpeg', 'png', 'webp'],
      });

      const activityTimes = request.input('activity_times', []);

      if (!screenshots || screenshots.length === 0) {
        return response.badRequest({
          error: 'No screenshots provided',
        });
      }

      const results = await ScreenshotService.bulkUpload(
        screenshots,
        user.id,
        user.companyId,
        activityTimes,
      );

      return response.created({
        message: `${results.length} screenshots uploaded successfully`,
        data: results,
      });
    } catch (error) {
      console.error('Bulk upload error:', error);
      return response.badRequest({
        error: 'Bulk upload failed',
        details: error.message,
      });
    }
  }

  /**
   * Get screenshots list
   * GET /api/screenshots
   */
  async list({ request, response, auth }: HttpContext) {
    try {
      const user = auth.user!;

      const userId = user.role === 'admin' ? request.input('user_id') : user.id;

      const params = {
        companyId: user.companyId,
        userId: userId,
        date: request.input('date'),
        startDate: request.input('start_date'),
        endDate: request.input('end_date'),
        limit: request.input('limit', 50),
        offset: request.input('offset', 0),
      };

      const screenshots = await ScreenshotService.getScreenshots(params);

      return response.ok({
        data: screenshots,
        meta: {
          total: screenshots.length,
          limit: params.limit,
          offset: params.offset,
        },
      });
    } catch (error) {
      console.error('List error:', error);
      return response.badRequest({
        error: 'Failed to fetch screenshots',
        details: error.message,
      });
    }
  }

  /**
   * Get grouped screenshots (Hubstaff-like view)
   * GET /api/screenshots/grouped
   */
  async grouped({ request, response, auth }: HttpContext) {
    try {
      const user = auth.user!;

      const date = request.input('date');
      if (!date) {
        return response.badRequest({
          error: 'Date parameter is required (format: YYYY-MM-DD)',
        });
      }

      const userId =
        user.role === 'admin' ? request.input('user_id', user.id) : user.id;

      const intervalMinutes = request.input('interval', 10);

      const grouped = await ScreenshotService.getGroupedScreenshots({
        companyId: user.companyId,
        userId: userId,
        date: date,
        intervalMinutes: intervalMinutes,
      });

      return response.ok({
        data: grouped,
        meta: {
          date: date,
          userId: userId,
          intervalMinutes: intervalMinutes,
        },
      });
    } catch (error) {
      console.error('Grouped error:', error);
      return response.badRequest({
        error: 'Failed to fetch grouped screenshots',
        details: error.message,
      });
    }
  }

  /**
   * Delete screenshot (Admin only)
   * DELETE /api/screenshots/:id
   */
  async delete({ params, response, auth }: HttpContext) {
    try {
      const user = auth.user!;

      if (user.role !== 'admin') {
        return response.forbidden({
          error: 'Only admins can delete screenshots',
        });
      }

      const deleted = await ScreenshotService.delete(params.id, user.companyId);

      if (!deleted) {
        return response.notFound({
          error: 'Screenshot not found',
        });
      }

      return response.ok({
        message: 'Screenshot deleted successfully',
      });
    } catch (error) {
      console.error('Delete error:', error);
      return response.badRequest({
        error: 'Failed to delete screenshot',
        details: error.message,
      });
    }
  }
}