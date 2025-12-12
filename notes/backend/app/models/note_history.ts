import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import Note from './note.js'
import User from './user.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class NoteHistory extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'note_id' })
  declare noteId: number

  @belongsTo(() => Note)
  declare note: BelongsTo<typeof Note>

  @column({ columnName: 'user_id' })
  declare userId: number

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @column()
  declare oldTitle: string

  @column()
  declare oldContent: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
