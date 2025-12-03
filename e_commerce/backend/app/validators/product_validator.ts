import vine from '@vinejs/vine';

export const createProductValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(3).maxLength(255),
    description: vine.string().trim().maxLength(511).optional(),
    price: vine.number().min(0),
    stock: vine.number().min(0),
    category_id: vine.number().exists(async (db, value) => {
      return db.from('categories').where('id', value).first();
    }),
  }),
);

export const updateProductValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(3).maxLength(255).optional(),
    description: vine.string().trim().maxLength(511).optional(),
    price: vine.number().min(0).optional(),
    stock: vine.number().min(0).optional(),
    category_id: vine
      .number()
      .exists(async (db, value) => {
        return db.from('categories').where('id', value).first();
      })
      .optional(),
  }),
);
