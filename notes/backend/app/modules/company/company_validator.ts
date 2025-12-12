import vine from '@vinejs/vine'

export const createCompanyValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(3).maxLength(255)
      .unique({ table: 'company', column: 'name' }),
  })
)

export const updateCompanyValidator = vine.compile(
  vine.object({
    name: vine
      .string()
      .trim()
      .minLength(3)
      .maxLength(255)
      .unique({ table: 'company', column: 'name' }),
  })
)
