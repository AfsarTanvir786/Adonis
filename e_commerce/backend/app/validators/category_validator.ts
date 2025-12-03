import vine from '@vinejs/vine';

export const createCategoryValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(3).maxLength(255),
    description: vine.string().trim().maxLength(511).optional(),
  }),
);

export const updateCategoryValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(3).maxLength(255).optional(),
    description: vine.string().trim().maxLength(511).optional(),
  }),
);
