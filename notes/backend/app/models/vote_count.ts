import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Note from './note.js'

export default class VoteCount extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'up_vote_count' })
  declare upVoteCount: number

  @column({ columnName: 'down_vote_count' })
  declare downVoteCount: number

  @column({ columnName: 'note_id' })
  declare noteId: number

  @belongsTo(() => Note)
  declare note: BelongsTo<typeof Note>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}