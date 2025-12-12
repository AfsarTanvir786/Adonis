import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'companies'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable().unique()

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()

      table.index(['name'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}