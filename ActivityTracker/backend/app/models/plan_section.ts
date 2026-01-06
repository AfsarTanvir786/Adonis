import { DateTime } from 'luxon';
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm';
import type { HasMany } from '@adonisjs/lucid/types/relations';
import Company from './company.js';

export default class PlanSection extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare name: string;

  @column({ columnName: 'cost_per_seat' })
  declare costPerSeat: number;

  @column()
  declare description: string | null;

  @column({ columnName: 'is_active' })
  declare isActive: boolean;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime;

  @hasMany(() => Company)
  declare companies: HasMany<typeof Company>;
}
