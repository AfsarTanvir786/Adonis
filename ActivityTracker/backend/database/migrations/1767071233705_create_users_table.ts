import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'users';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable();
      table
        .integer('company_id')
        .unsigned()
        .references('id')
        .inTable('companies')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
        .notNullable();
      table.string('name').notNullable();
      table.string('email', 254).notNullable().unique();
      table.string('password').notNullable();
      table.enum('role', ['admin', 'employee']).defaultTo('employee');
      table.boolean('is_active').defaultTo(true);
      table.timestamp('last_login_at').nullable();

      table.timestamps(true);
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
