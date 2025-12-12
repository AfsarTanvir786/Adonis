import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'notes'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('workspace_id')
        .unsigned()
        .references('id')
        .inTable('workspaces')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
        .notNullable()
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
        .notNullable()
      table.string('title').notNullable()
      table.text('content').nullable()
      table.enum('type', ['public', 'private']).defaultTo('private')
      table.boolean('is_draft').defaultTo(true)
      table.timestamp('published_at').nullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')

      table.index(['workspace_id'])
      table.index(['user_id'])
      table.index(['type'])
      table.index(['is_draft'])
      table.index(['published_at'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
