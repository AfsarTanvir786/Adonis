import vine from '@vinejs/vine';

export const createCartItemValidator = vine.compile(
  vine.object({
    cartId: vine.number().exists({ table: 'carts', column: 'id' }),
    productId: vine.number().exists(async (db, value) => {
      return db.from('products').where('id', value).first();
    }),
    quantity: vine.number().positive(),
  }),
);

export const updateCartItemValidator = vine.compile(
  vine.object({
    cartId: vine.number().exists({ table: 'carts', column: 'id' }).optional(),
    productId: vine
      .number()
      .exists(async (db, value) => {
        return db.from('products').where('id', value).first();
      })
      .optional(),
    quantity: vine.number().positive().optional(),
  }),
);
