import vine from '@vinejs/vine';

export const createOrderValidator = vine.compile(
  vine.object({
    orderItems: vine.number(),
    totalPrice: vine.number(),
    orderStatus: vine.string(),
    paymentStatus: vine.string(),
    customerId: vine.number().exists({ table: 'customers', column: 'id' }),
  }),
);

export const updateOrderValidator = vine.compile(
  vine.object({
    orderItems: vine.number().optional(),
    totalPrice: vine.number().optional(),
    orderStatus: vine.string().optional(),
    paymentStatus: vine.string().optional(),
    customerId: vine
      .number()
      .exists({ table: 'customers', column: 'id' })
      .optional(),
  }),
);
