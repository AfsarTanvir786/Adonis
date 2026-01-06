import vine, { SimpleMessagesProvider } from '@vinejs/vine';

export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().trim().email().normalizeEmail(),
    password: vine.string().minLength(1),
  }),
);

loginValidator.messagesProvider = new SimpleMessagesProvider({
  'email.required': 'Email is required',
  'password.required': 'Password is required',
});
