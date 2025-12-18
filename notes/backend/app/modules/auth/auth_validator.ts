import vine, { SimpleMessagesProvider } from '@vinejs/vine';

const password = vine.string().minLength(8).maxLength(64);

export const registerValidator = vine.compile(
  vine.object({
    name: vine.string().trim().maxLength(255),
    email: vine
      .string()
      .email()
      .normalizeEmail()
      .unique(async (db, value) => {
        const match = await db
          .from('users')
          .select('id')
          .where('email', value)
          .first();
        return !match;
      }),
    password,
  }),
);

export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().email().normalizeEmail(),
    password,
  }),
);

// const password = vine
//   .string()
//   .minLength(8)
//   .maxLength(64)
//   .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/)

registerValidator.messagesProvider = new SimpleMessagesProvider({
  // Name
  'name.required': 'Name is required',
  'name.minLength': 'Name must be at least 2 characters',
  'name.maxLength': 'Name must not exceed 255 characters',

  // Email
  'email.required': 'Email is required',
  'email.email': 'Enter a valid email address',
  'email.database.unique': 'Email is already registered',

  // Password
  'password.required': 'Password is required',
  'password.minLength': 'Password must be at least 8 characters',
  'password.maxLength': 'Password must not exceed 64 characters',
  'password.regex':
    'Password must include uppercase, lowercase, number, and special character',
});

loginValidator.messagesProvider = new SimpleMessagesProvider({
  'email.required': 'Email is required',
  'email.email': 'Enter a valid email address',

  'password.required': 'Password is required',
  'password.minLength': 'Password must be at least 8 characters',
  'password.maxLength': 'Password must not exceed 64 characters',
});
