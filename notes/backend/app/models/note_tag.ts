import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import Note from './note.js'
import Tag from './tag.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class NoteTag extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'note_id' })
  declare noteId: number

  @belongsTo(() => Note)
  declare note: BelongsTo<typeof Note>

  @column({ columnName: 'tag_id' })
  declare tagId: number

  @belongsTo(() => Tag)
  declare tag: BelongsTo<typeof Tag>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
