import { DateTime } from 'luxon';
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm';
import type { BelongsTo } from '@adonisjs/lucid/types/relations';
import Category from './category.js';

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare title: string;

  @column()
  declare description: string;

  @column()
  declare price: number;

  @column()
  declare stock: number;

  @column({ columnName: 'category_id' })
  declare categoryId: number;

  @belongsTo(() => Category)
  declare category: BelongsTo<typeof Category>;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime;
}
