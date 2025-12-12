import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'vote_counts'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table
        .integer('note_id')
        .unsigned()
        .references('id')
        .inTable('notes')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
        .notNullable()
      table.integer('up_vote_count').defaultTo(0)
      table.integer('down_vote_count').defaultTo(0)

      table.timestamp('created_at')
      table.timestamp('updated_at')
      
      table.index(['note_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}