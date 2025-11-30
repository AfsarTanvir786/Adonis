import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'products'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()

      table.string('title').notNullable()
      table.text('description').nullable()
      table.decimal('price', 10, 2).notNullable().defaultTo(0)
      table.integer('stock').unsigned().notNullable().defaultTo(0)

      table
        .integer('category_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('categories')
        .onUpdate('CASCADE')
        .onDelete('RESTRICT')

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable();
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}