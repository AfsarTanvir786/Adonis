import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'plan_sections';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.string('name', 100).notNullable().unique();
      table.decimal('cost_per_seat', 10, 2).notNullable();
      table.text('description').nullable();
      table.boolean('is_active').defaultTo(true);

      table.timestamps(true);
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
