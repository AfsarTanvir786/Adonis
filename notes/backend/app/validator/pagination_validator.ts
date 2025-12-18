import vine, { SimpleMessagesProvider } from '@vinejs/vine';

export const paginationValidator = vine.compile(
  vine.object({
    page: vine.number().min(0).optional(),
    pageSize: vine.number().min(1).max(20).optional(),
    sortBy: vine.string().optional(),
    order: vine.enum(['asc', 'desc'] as const).optional(),
  }),
);

paginationValidator.messagesProvider = new SimpleMessagesProvider({
  'page.min': 'Page must be greater than 0',
  'pageSize.max': 'Page size cannot exceed 20',
  'pageSize.min': 'Page size must be at least 1',
  'sortBy.enum': 'Invalid sort field',
});
