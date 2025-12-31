import vine from '@vinejs/vine';

export const getScreenshotByUserValidator = vine.compile(
  vine.object({
    userId: vine.number().exists({ table: 'users', column: 'id' }),
    date: vine.date(),
  }),
);