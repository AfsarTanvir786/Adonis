import vine from '@vinejs/vine'

export const createProductValidator = vine.compile(
  vine.object({
    title: vine.string().trim().maxLength(255),
    description: vine.string().trim().maxLength(511).optional(),
    price: vine.number().positive(),
    stock: vine.number().positive(),
    
  }),
);

export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().email().normalizeEmail(),
  })
)
