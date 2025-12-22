import vine, { SimpleMessagesProvider } from '@vinejs/vine';

export const createCompanyValidator = vine.compile(
  vine.object({
    name: vine
      .string()
      .trim()
      .minLength(3)
      .maxLength(255)
      .unique({ table: 'company', column: 'name' }),
  }),
);

export const updateCompanyValidator = vine.compile(
  vine.object({
    name: vine
      .string()
      .trim()
      .minLength(3)
      .maxLength(255)
      .unique({ table: 'company', column: 'name' }),
  }),
);

const companyMessages = new SimpleMessagesProvider({
  'name.required': 'Company name is required',
  'name.minLength': 'Company name must be at least 3 characters',
  'name.maxLength': 'Company name must not exceed 255 characters',
  'name.database.unique': 'Company name already exists',
});

createCompanyValidator.messagesProvider = companyMessages;
updateCompanyValidator.messagesProvider = companyMessages;
