import vine from '@vinejs/vine'

export const createNoteValidator = vine.compile(
  vine.object({
    workspaceId: vine.number(),
    title: vine.string().trim().minLength(3).maxLength(255),
    content: vine.string().trim().maxLength(511).optional(),
    type: vine.enum(['public', 'private']),
    isDraft: vine.boolean(),
  })
)

export const updateNoteValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(3).maxLength(255).optional(),
    content: vine.string().trim().maxLength(511).optional(),
    type: vine.enum(['public', 'private']),
    isDraft: vine.boolean(),
  })
)
