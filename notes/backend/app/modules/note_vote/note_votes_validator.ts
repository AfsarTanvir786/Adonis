import vine from '@vinejs/vine'

export const createNoteVoteValidator = vine.compile(
  vine.object({
    vote: vine.enum(['up', 'down'])
  })
)

export const updateNoteVoteValidator = vine.compile(
  vine.object({
    vote: vine.enum(['up', 'down']),
  })
)
