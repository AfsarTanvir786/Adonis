import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'note_tags'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('note_id')
        .unsigned()
        .references('id')
        .inTable('notes')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
        .notNullable()
      table
        .integer('tag_id')
        .unsigned()
        .references('id')
        .inTable('tags')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
        .notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')

      table.unique(['note_id', 'tag_id'])
      table.index(['tag_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
