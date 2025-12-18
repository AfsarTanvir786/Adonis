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

const workspaceMessages = new SimpleMessagesProvider({
  'name.required': 'Workspace name is required',
  'name.minLength': 'Workspace name must be at least 3 characters',
  'name.maxLength': 'Workspace name must not exceed 255 characters',

  'description.maxLength': 'Description must not exceed 511 characters',
});

createWorkspaceValidator.messagesProvider = workspaceMessages;
updateWorkspaceValidator.messagesProvider = workspaceMessages;
