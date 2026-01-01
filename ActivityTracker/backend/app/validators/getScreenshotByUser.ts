import vine, { SimpleMessagesProvider } from '@vinejs/vine';

export const getScreenshotByUserValidator = vine.compile(
  vine.object({
    userId: vine.number().exists({ table: 'users', column: 'id' }),
    date: vine.date(),
  }),
);

getScreenshotByUserValidator.messagesProvider = new SimpleMessagesProvider({
  'userId.required': 'user is required',
  'userId.database.unique': 'User does not exists',
  'date.required': 'date is required',
});
