import type { HttpContext } from '@adonisjs/core/http';
import cloudinary from '#config/cloudinary';
import { DateTime } from 'luxon';
import ImageUpload from '#models/image_upload';

export default class ScreenshotController {
  /**
   * Upload single screenshot
   * POST /api/screenshots/upload
   *
   */

  private static extractActivityTimeFromFileName(
    fileName: string,
  ): DateTime | null {
    /**
     * Matches:
     * Screenshot from 2025-12-04 13-48-17.png
     */
    const regex = /(\d{4})-(\d{2})-(\d{2}) (\d{2})-(\d{2})-(\d{2})/;

    const match = fileName.match(regex);

    if (!match) {
      return null;
    }

    const [, year, month, day, hour, minute, second] = match;

    return DateTime.fromObject({
      year: Number(year),
      month: Number(month),
      day: Number(day),
      hour: Number(hour),
      minute: Number(minute),
      second: Number(second),
    });
  }

  async upload({ request, response, auth }: HttpContext) {
    const image = request.file('image', {
      size: '5mb',
      extnames: ['jpg', 'jpeg', 'png', 'webp'],
    });

    if (!image) {
      return response.badRequest({ message: 'Image is required' });
    }

    if (!image.isValid) {
      return response.badRequest(image.errors);
    }

    const folderPath = `${auth.user!.companyId}/${auth.user!.id}`;
    const uploaded = await cloudinary.uploader.upload(image.tmpPath!, {
      folder: folderPath,
    });

    const activityTime = request.input('activityTime');

    let parsedActivityTime: DateTime;

    
    if (activityTime) {
      parsedActivityTime = DateTime.fromISO(activityTime);
    } else {
      parsedActivityTime =
        ScreenshotController.extractActivityTimeFromFileName(
          image.clientName,
        ) ?? DateTime.now().setZone('Asia/Dhaka');
    }

    const screenshot = {
      userId: auth.user!.id,
      companyId: auth.user!.companyId,
      filePath: uploaded.secure_url,
      activityTime: parsedActivityTime,
      fileSize: image.size,
      fileName: image.clientName,
    };
    const result = await ImageUpload.create(screenshot);
    return response.created(result);
  }  
}
