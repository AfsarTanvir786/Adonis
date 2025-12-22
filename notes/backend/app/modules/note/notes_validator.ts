import vine, { SimpleMessagesProvider } from '@vinejs/vine';

export const createNoteValidator = vine.compile(
  vine.object({
    workspaceId: vine.number(),
    title: vine.string().trim().minLength(3).maxLength(255),
    content: vine.string().trim().maxLength(511).optional(),
    type: vine.enum(['public', 'private']),
    isDraft: vine.boolean(),
  }),
);

export const updateNoteValidator = vine.compile(
  vine.object({
    workspaceId: vine
      .number()
      .exists({ table: 'workspaces', column: 'id' })
      .optional(),
    title: vine.string().trim().minLength(3).maxLength(255).optional(),
    content: vine.string().trim().maxLength(511).optional(),
    type: vine.enum(['public', 'private']),
    isDraft: vine.boolean(),
  }),
);

const noteMessages = new SimpleMessagesProvider({
  'workspaceId.required': 'Workspace is required',

  'title.required': 'Title is required',
  'title.minLength': 'Title must be at least 3 characters',
  'title.maxLength': 'Title must not exceed 255 characters',

  'content.maxLength': 'Content is too long',

  'type.enum': 'Note type must be public or private',
  'isDraft.boolean': 'Draft value must be true or false',
});

createNoteValidator.messagesProvider = noteMessages;
updateNoteValidator.messagesProvider = noteMessages;
