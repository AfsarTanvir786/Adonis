import vine from '@vinejs/vine'

export const createWorkspaceValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(3).maxLength(255),
    description: vine.string().trim().maxLength(511).optional(),
  })
)

export const updateWorkspaceValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(3).maxLength(255).optional(),
    description: vine.string().trim().maxLength(511).optional(),
  })
)
