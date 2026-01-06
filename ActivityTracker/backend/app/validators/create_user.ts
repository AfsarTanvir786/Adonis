import vine, { SimpleMessagesProvider } from '@vinejs/vine';

const password = vine.string().minLength(8).maxLength(64);

export const createUserValidator = vine.compile(
  vine.object({
    name: vine.string().trim().maxLength(255),
    email: vine
      .string()
      .email()
      .normalizeEmail()
      .unique({ table: 'users', column: 'email' }),
    password,
    role: vine.enum(['employee', 'admin']).optional(),
  }),
);


createUserValidator.messagesProvider = new SimpleMessagesProvider({
  'required': '{{ field }} is required',
  'database.unique': 'Email already exists, try another one',
});
