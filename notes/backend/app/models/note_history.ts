import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import Note from './note.js'
import User from './user.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Workspace from './workspace.js'

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

  @column({ columnName: 'workspace_id' })
  declare workspaceId: number

  @belongsTo(() => Workspace)
  declare workspace: BelongsTo<typeof Workspace>

  @column()
  declare oldTitle: string

  @column()
  declare oldContent: string

  @column()
  declare oldType: 'public' | 'private';

  @column()
  declare oldIsDraft: boolean;

  @column.dateTime()
  declare oldPublishedAt: DateTime | null;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
