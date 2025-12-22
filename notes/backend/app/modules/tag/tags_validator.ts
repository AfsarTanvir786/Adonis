import vine from '@vinejs/vine';

export const createTagValidator = vine.compile(
  vine.object({
    name: vine
      .string()
      .trim()
      .minLength(3)
      .maxLength(255)
      .unique({ table: 'tags', column: 'name' }),
  }),
);

export const updateTagValidator = vine.compile(
  vine.object({
    name: vine
      .string()
      .trim()
      .minLength(3)
      .maxLength(255)
      .unique({ table: 'tags', column: 'name' }),
  }),
);
