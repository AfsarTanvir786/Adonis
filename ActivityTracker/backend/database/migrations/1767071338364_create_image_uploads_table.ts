import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'image_uploads';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
        .notNullable();
      table
        .integer('company_id')
        .unsigned()
        .references('id')
        .inTable('companies')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
        .notNullable();
      table.string('file_name', 255).notNullable()
      table.string('file_path', 500).notNullable()
      table.integer('file_size').unsigned().nullable()
      table.timestamp('activity_time', { useTz: true }).notNullable()

      table.timestamps(true);

      table.index(['user_id', 'activity_time'], 'idx_user_activity')
      table.index(['company_id', 'activity_time'], 'idx_company_activity')
      table.index('activity_time', 'idx_activity_time');
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
