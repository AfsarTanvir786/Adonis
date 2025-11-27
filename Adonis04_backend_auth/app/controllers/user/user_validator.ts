import vine from '@vinejs/vine';

export const paginatedUserValidator = vine.compile(
  vine.object({
    page: vine.number().positive().optional(),
    limit: vine.number().positive().optional(),
    sort_by: vine.string().optional(),
    sort_order: vine.enum(['asc', 'desc']).optional()
  }),
);
