import { DateTime } from 'luxon';
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm';
import type { BelongsTo } from '@adonisjs/lucid/types/relations';
import User from './user.js';

export default class Order extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column({ columnName: 'order_items' })
  declare orderItems: number;

  @column({ columnName: 'total_price' })
  declare totalPrice: number;

  @column({ columnName: 'order_status' })
  declare orderStatus: string;

  @column({ columnName: 'payment_status' })
  declare paymentStatus: string;

  @column({ columnName: 'customer_id' })
  declare customerId: number;

  @belongsTo(() => User, {
    localKey: 'customerId',
    foreignKey: 'id',
  })
  declare user: BelongsTo<typeof User>;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime;
}
