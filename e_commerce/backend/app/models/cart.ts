import { DateTime } from 'luxon';
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm';
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations';
import User from './user.js';
import CartItem from './cart_item.js';

export default class Cart extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column({ columnName: 'user_id' })
  declare userId: number;

  @belongsTo(() => User)
  declare customer: BelongsTo<typeof User>;

  @hasMany(() => CartItem)
  declare items: HasMany<typeof CartItem>;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime;
}
