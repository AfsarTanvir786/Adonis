import vine from '@vinejs/vine';

export const createCartValidator = vine.compile(
  vine.object({
    userId: vine.number().exists(async (db, value) => {
      return db.from('users').where('id', value).first();
    }),
  }),
);
