import vine from '@vinejs/vine';

export const createOrderItemValidator = vine.compile(
  vine.object({
    quantity: vine.number(),
    unit_price: vine.number(),
    sub_total: vine.number(),
    product_id: vine.number().exists({ table: 'products', column: 'id' }),
    order_id: vine.number().exists({ table: 'orders', column: 'id' }),
  }),
);

export const updateOrderItemValidator = vine.compile(
  vine.object({
    quantity: vine.number().optional(),
    unit_price: vine.number().optional(),
    sub_total: vine.number().optional(),
    order_id: vine
      .number()
      .exists({ table: 'orders', column: 'id' })
      .optional(),
    product_id: vine
      .number()
      .exists({ table: 'products', column: 'id' })
      .optional(),
  }),
);
