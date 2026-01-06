import { DateTime } from 'luxon';
import drive from '@adonisjs/drive/services/main';
import ImageUpload from '#models/image_upload';
import type { MultipartFile } from '@adonisjs/core/types/bodyparser';
import { basename } from 'node:path';

interface UploadResult {
  id: number;
  fileName: string;
  filePath: string;
  fileSize: number;
  activityTime: DateTime;
  url: string;
}

export default class ScreenshotService {
  /**
   * Generate file path structure for organization
   */
  private static generateFilePath(
  companyId: number,
  userId: number,
  activityTime: DateTime,
  originalName: string,
): string {
  // Remove any directory parts and keep filename only
  const safeFileName = basename(originalName);

  return [
    'screenshots',
    companyId,
    userId,
    activityTime.year,
    activityTime.month,
    activityTime.day,
    safeFileName,
  ].join('/');
}

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

  /**
   * Upload screenshot and save to database
   */
  static async upload(
    file: MultipartFile,
    userId: number,
    companyId: number,
    activityTime?: string,
  ): Promise<UploadResult> {
    let parsedActivityTime: DateTime;

    if (activityTime) {
      parsedActivityTime = DateTime.fromISO(activityTime);
    } else {
      parsedActivityTime =
        this.extractActivityTimeFromFileName(file.clientName) ?? DateTime.now();
    }

    const filePath = this.generateFilePath(
      companyId,
      userId,
      parsedActivityTime,
      file.clientName,
    );

    // Upload file to local storage
    await file.moveToDisk(filePath);

    // Save to database
    const imageUpload = await ImageUpload.create({
      userId: userId,
      companyId: companyId,
      fileName: file.clientName,
      filePath: filePath,
      fileSize: file.size,
      activityTime: parsedActivityTime,
    });

    // Generate public URL
    const url = await drive.use().getUrl(filePath);

    return {
      id: imageUpload.id,
      fileName: imageUpload.fileName,
      filePath: imageUpload.filePath,
      fileSize: imageUpload.fileSize!,
      activityTime: imageUpload.activityTime,
      url: url,
    };
  }

  /**
   * Bulk upload screenshots
   */
  static async bulkUpload(
    files: MultipartFile[],
    userId: number,
    companyId: number,
    activityTimes?: string[],
  ): Promise<UploadResult[]> {
    const results: UploadResult[] = [];
    const dbRecords: any[] = [];

    // Process all files
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const activityTime = activityTimes?.[i]
        ? DateTime.fromISO(activityTimes[i])
        : DateTime.now();

      const filePath = this.generateFilePath(
        companyId,
        userId,
        activityTime,
        file.clientName,
      );

      // Upload file
      await file.moveToDisk(filePath);

      // Prepare database record
      dbRecords.push({
        userId: userId,
        companyId: companyId,
        fileName: file.clientName,
        filePath: filePath,
        fileSize: file.size,
        activityTime: activityTime.toSQL(),
        createdAt: DateTime.now().toSQL(),
        updatedAt: DateTime.now().toSQL(),
      });
    }

    // Bulk insert (faster)
    const insertedRecords = await ImageUpload.createMany(dbRecords);

    // Get URLs for response
    for (const record of insertedRecords) {
      const url = await drive.use().getUrl(record.filePath);
      results.push({
        id: record.id,
        fileName: record.fileName,
        filePath: record.filePath,
        fileSize: record.fileSize!,
        activityTime: record.activityTime,
        url: url,
      });
    }

    return results;
  }

  /**
   * Get screenshots with optimized query
   */
  static async getScreenshots(params: {
    companyId: number;
    userId?: number;
    date?: string;
    startDate?: string;
    endDate?: string;
    limit?: number;
    offset?: number;
  }) {
    const query = ImageUpload.query()
      .where('companyId', params.companyId)
      .preload('user', (userQuery) => {
        userQuery.select('id', 'name', 'email');
      });

    if (params.userId) {
      query.where('userId', params.userId);
    }

    if (params.date) {
      const date = DateTime.fromISO(params.date);
      query.whereBetween('activityTime', [
        date.startOf('day').toSQL()!,
        date.endOf('day').toSQL()!,
      ]);
    }

    if (params.startDate && params.endDate) {
      query.whereBetween('activityTime', [
        DateTime.fromISO(params.startDate).startOf('day').toSQL()!,
        DateTime.fromISO(params.endDate).endOf('day').toSQL()!,
      ]);
    }

    query.orderBy('activityTime', 'desc');

    if (params.limit) {
      query.limit(params.limit);
    }
    if (params.offset) {
      query.offset(params.offset);
    }

    const screenshots = await query;

    // Generate URLs
    const results = await Promise.all(
      screenshots.map(async (screenshot) => {
        const url = await drive.use().getUrl(screenshot.filePath);
        return {
          id: screenshot.id,
          fileName: screenshot.fileName,
          filePath: screenshot.filePath,
          fileSize: screenshot.fileSize,
          activityTime: screenshot.activityTime,
          url: url,
          user: {
            id: screenshot.user.id,
            name: screenshot.user.name,
            email: screenshot.user.email,
          },
        };
      }),
    );

    return results;
  }

  /**
   * Get screenshots grouped by time intervals (Hubstaff-like)
   */
  static async getGroupedScreenshots(params: {
    companyId: number;
    userId: number;
    date: string;
    intervalMinutes?: 5 | 10;
  }) {
    const intervalMinutes = params.intervalMinutes || 10;
    const date = DateTime.fromISO(params.date);

    const screenshots = await ImageUpload.query()
      .where('companyId', params.companyId)
      .where('userId', params.userId)
      .whereBetween('activityTime', [
        date.startOf('day').toSQL()!,
        date.endOf('day').toSQL()!,
      ])
      .orderBy('activityTime', 'asc');

    // Group by hour and interval
    const grouped: Record<number, Record<string, any[]>> = {};

    for (const screenshot of screenshots) {
      const activityTime = screenshot.activityTime;
      const hour = activityTime.hour;
      const minute = activityTime.minute;

      const intervalStart =
        Math.floor(minute / intervalMinutes) * intervalMinutes;
      const intervalKey = `${hour.toString().padStart(2, '0')}:${intervalStart.toString().padStart(2, '0')}`;

      if (!grouped[hour]) {
        grouped[hour] = {};
      }

      if (!grouped[hour][intervalKey]) {
        grouped[hour][intervalKey] = [];
      }

      const url = await drive.use().getUrl(screenshot.filePath);
      grouped[hour][intervalKey].push({
        id: screenshot.id,
        fileName: screenshot.fileName,
        filePath: screenshot.filePath,
        fileSize: screenshot.fileSize,
        activityTime: screenshot.activityTime.toISO(),
        url: url,
      });
    }

    return grouped;
  }

  /**
   * Delete screenshot
   */
  static async delete(
    screenshotId: number,
    companyId: number,
  ): Promise<boolean> {
    const screenshot = await ImageUpload.query()
      .where('id', screenshotId)
      .where('companyId', companyId)
      .first();

    if (!screenshot) {
      return false;
    }

    // Delete file from storage
    try {
      await drive.use().delete(screenshot.filePath);
    } catch (error) {
      console.error('Error deleting file:', error);
    }

    // Delete database record
    await screenshot.delete();

    return true;
  }
}
