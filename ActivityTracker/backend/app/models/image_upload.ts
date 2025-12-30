import { DateTime } from 'luxon';
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm';
import type { BelongsTo } from '@adonisjs/lucid/types/relations';
import User from './user.js';
import Company from './company.js';

export default class ImageUpload extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column({columnName: 'user_id'})
  declare userId: number;

  @column({columnName: 'company_id'})
  declare companyId: number;

  @column({columnName: 'file_name'})
  declare fileName: string;

  @column({columnName: 'file_path'})
  declare filePath: string;

  @column({columnName: 'file_size'})
  declare fileSize: number | null;

  @column.dateTime({columnName: 'activity_time'})
  declare activityTime: DateTime;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime;

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>;

  @belongsTo(() => Company)
  declare company: BelongsTo<typeof Company>;
}
