import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import Workspace from './workspace.js'
import User from './user.js'
import NoteHistory from './note_history.js'
import Tag from './tag.js'
import NoteVote from './note_vote.js'

import type { BelongsTo, HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'

export default class Note extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'workspace_id' })
  declare workspaceId: number

  @belongsTo(() => Workspace)
  declare workspace: BelongsTo<typeof Workspace>

  @column({ columnName: 'user_id' })
  declare userId: number

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @column()
  declare title: string

  @column()
  declare content: string

  @column()
  declare type: 'public' | 'private'

  @column()
  declare isDraft: boolean

  @column.dateTime()
  declare publishedAt: DateTime | null

  @hasMany(() => NoteHistory)
  declare histories: HasMany<typeof NoteHistory>

  @manyToMany(() => Tag, {
    pivotTable: 'note_tags',
    pivotForeignKey: 'note_id',
    pivotRelatedForeignKey: 'tag_id',
  })
  declare tags: ManyToMany<typeof Tag>

  @hasMany(() => NoteVote)
  declare votes: HasMany<typeof NoteVote>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
