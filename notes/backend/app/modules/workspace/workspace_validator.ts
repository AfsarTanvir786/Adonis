import vine, { SimpleMessagesProvider } from '@vinejs/vine';

export const createWorkspaceValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(3).maxLength(255),
    description: vine.string().trim().maxLength(511).optional(),
  }),
);

export const updateWorkspaceValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(3).maxLength(255).optional(),
    description: vine.string().trim().maxLength(511).optional(),
  }),
);

export const paginationWorkspaceNoteList = vine.compile(
  vine.object({
    page: vine.number().optional(),
    pageSize: vine.number().optional(),
    sortBy: vine.string().optional(),
    order: vine.enum(['asc', 'desc'] as const).optional(),
  }),
);

const workspaceMessages = new SimpleMessagesProvider({
  'name.required': 'Workspace name is required',
  'name.minLength': 'Workspace name must be at least 3 characters',
  'name.maxLength': 'Workspace name must not exceed 255 characters',

  'description.maxLength': 'Description must not exceed 511 characters',
});

createWorkspaceValidator.messagesProvider = workspaceMessages;
updateWorkspaceValidator.messagesProvider = workspaceMessages;

paginationWorkspaceNoteList.messagesProvider = new SimpleMessagesProvider({
  'page.min': 'Page must be greater than 0',
  'pageSize.max': 'Page size cannot exceed 100',
  'sortBy.enum': 'Invalid sort field',
});
