import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import Workspace from './workspace.js'
import User from './user.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class Company extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @hasMany(() => User)
  declare users: HasMany<typeof User>

  @hasMany(() => Workspace)
  declare workspaces: HasMany<typeof Workspace>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}