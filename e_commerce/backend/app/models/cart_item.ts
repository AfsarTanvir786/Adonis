import { DateTime } from 'luxon';
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm';
import type { BelongsTo } from '@adonisjs/lucid/types/relations';
import Product from './product.js';
import Cart from './cart.js';

export default class CartItem extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column({ columnName: 'cart_id' })
  declare cartId: number;

  @belongsTo(() => Cart)
  declare cart: BelongsTo<typeof Cart>;

  @column({ columnName: 'product_id' })
  declare productId: number;

  @belongsTo(() => Product)
  declare product: BelongsTo<typeof Product>;

  @column()
  declare quantity: number;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime;
}
