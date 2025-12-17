import vine from '@vinejs/vine';

const password = vine.string().minLength(8).maxLength(64);

export const registerValidator = vine.compile(
  vine.object({
    name: vine.string().trim().maxLength(255),
    email: vine
      .string()
      .email()
      .normalizeEmail()
      .unique(async (db, value) => {
        const match = await db.from('users').select('id').where('email', value).first()
        return !match
      }),
    password,
  })
)

export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().email().normalizeEmail(),
    password,
  })
)

// const password = vine
//   .string()
//   .minLength(8)
//   .maxLength(64)
//   .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/)
