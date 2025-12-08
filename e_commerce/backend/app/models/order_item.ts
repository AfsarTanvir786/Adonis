import { DateTime } from 'luxon';
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm';
import type { BelongsTo } from '@adonisjs/lucid/types/relations';
import Order from './order.js';
import Product from './product.js';

export default class OrderItem extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare quantity: number;

  @column({ columnName: 'unit_price' })
  declare unitPrice: number;

  @column({ columnName: 'sub_total' })
  declare subTotal: number;

  @column({ columnName: 'product_id' })
  declare productId: number;

  @belongsTo(() => Product)
  declare product: BelongsTo<typeof Product>;

  @column({ columnName: 'order_id' })
  declare orderId: number;

  @belongsTo(() => Order)
  declare order: BelongsTo<typeof Order>;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime;
}
