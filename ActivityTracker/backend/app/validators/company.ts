import vine from '@vinejs/vine'

export const companySignupValidator = vine.compile(
  vine.object({
    ownerName: vine.string().trim().minLength(2).maxLength(255),
    ownerEmail: vine.string().trim().email().normalizeEmail(),
    companyName: vine.string().trim().minLength(2).maxLength(255),
    password: vine.string().minLength(8).maxLength(255),
    planSectionId: vine.number().positive(),
  })
)

