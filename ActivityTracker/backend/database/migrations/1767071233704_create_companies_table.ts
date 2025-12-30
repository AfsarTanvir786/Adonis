import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'companies';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table
        .integer('plan_section_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('plan_sections')
        .onUpdate('CASCADE')
        .onDelete('RESTRICT');
      table.string('name', 255).notNullable();
      table.string('owner_name', 255).notNullable();
      table.string('owner_email', 255).notNullable().unique();
      table.boolean('is_active').defaultTo(true);

      table.timestamps(true);
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
