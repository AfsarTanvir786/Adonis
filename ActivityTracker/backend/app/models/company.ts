import { DateTime } from 'luxon';
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm';
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations';
import PlanSection from './plan_section.js';
import ImageUpload from './image_upload.js';
import User from './user.js';

export default class Company extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column({ columnName: 'plan_section_id' })
  declare planSectionId: number;

  @column()
  declare name: string;

  @column({ columnName: 'owner_name' })
  declare ownerName: string;

  @column({ columnName: 'owner_email' })
  declare ownerEmail: string;

  @column({ columnName: 'is_active' })
  declare isActive: boolean;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime;

  @belongsTo(() => PlanSection)
  declare planSection: BelongsTo<typeof PlanSection>;

  @hasMany(() => User)
  declare users: HasMany<typeof User>;

  @hasMany(() => ImageUpload)
  declare imageUploads: HasMany<typeof ImageUpload>;
}
