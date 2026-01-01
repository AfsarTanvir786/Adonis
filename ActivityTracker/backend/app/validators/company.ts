import vine, { SimpleMessagesProvider } from '@vinejs/vine';

export const companySignupValidator = vine.compile(
  vine.object({
    ownerName: vine.string().trim().minLength(2).maxLength(255),
    ownerEmail: vine
      .string()
      .trim()
      .email()
      .normalizeEmail()
      .unique({ table: 'users', column: 'id' }),
    companyName: vine.string().trim().minLength(2).maxLength(255),
    password: vine.string().minLength(8).maxLength(32),
    planSectionId: vine.number().positive(),
  }),
);

companySignupValidator.messagesProvider = new SimpleMessagesProvider({
  'ownerName.required': 'Owner Name is required',
  'ownerName.minLength': 'Owner Name must be at least 2 characters',
  'ownerName.maxLength': 'Owner Name must not exceed 255 characters',

  'ownerEmail.required': 'Owner Email is required',
  'ownerEmail.database.unique': 'Owner Email already exists',

  'companyName.required': 'Company Name is required',
  'companyName.minLength': 'Company Name must be at least 2 characters',
  'companyName.maxLength': 'Company Name must not exceed 255 characters',

  'password.required': 'Password is required',
  'password.minLength': 'Password must be at least 8 characters',
  'password.maxLength': 'Password must not exceed 32 characters',

  'planSectionId.required': 'Plan Section is required',
});
