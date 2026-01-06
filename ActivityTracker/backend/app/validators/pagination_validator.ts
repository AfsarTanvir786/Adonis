import vine, { SimpleMessagesProvider } from '@vinejs/vine';

export const paginationValidator = vine.compile(
  vine.object({
    page: vine.number().min(1).optional(),
    limit: vine.number().min(1).max(20).optional(),
    sortBy: vine.enum(['name', 'lastLoginAt'] as const).optional(),
    orderBy: vine.enum(['asc', 'desc'] as const).optional(),
    search: vine.string().trim().optional(),
  }),
);

paginationValidator.messagesProvider = new SimpleMessagesProvider({
  'page.number': 'page must be in number',
  'page.min': 'Page must be at least 1',
  'limit.number': 'limit must be in number',
  'limit.max': 'Limit cannot exceed 20',
  'limit.min': 'Limit must be at least 1',
  'sortBy.enum': 'Sort field must be lastLoginAt or name',
});
