import { BaseSeeder } from '@adonisjs/lucid/seeders';
import ImageUpload from '#models/image_upload';
import { DateTime } from 'luxon';
import {
  randomActivityTime,
  randomFromArray,
  screenshotFiles,
} from '../helpers/seed_helpers.js';

export default class ImageUploadSeeder extends BaseSeeder {
  static chunkSize = 1000;

  async run() {
    const start = DateTime.fromISO('2026-01-01');
    const end = DateTime.fromISO('2026-01-07');

    let records: any[] = [];

    for (let userId = 1; userId <= 5000; userId++) {
      const companyId = Math.ceil(userId / 50);

      for (
        let day = start;
        day <= end;
        day = day.plus({ days: 1 })
      ) {
        for (let i = 0; i < 100; i++) {
          const file = randomFromArray(screenshotFiles);

          records.push({
            userId,
            companyId,
            fileName: file.fileName,
            filePath: file.filePath,
            fileSize: file.fileSize,
            activityTime: randomActivityTime(day),
          });

          if (records.length >= ImageUploadSeeder.chunkSize) {
            await ImageUpload.createMany(records);
            records = [];
          }
        }
      }
    }

    if (records.length) {
      await ImageUpload.createMany(records);
    }
  }
}
