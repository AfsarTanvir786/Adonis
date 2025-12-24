import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
  protected tableName = 'note_histories';

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table
        .integer('note_id')
        .unsigned()
        .references('id')
        .inTable('notes')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
        .notNullable();
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
        .notNullable();
      table
        .integer('workspace_id')
        .unsigned()
        .references('id')
        .inTable('workspaces')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
        .notNullable();
      table.string('old_title').notNullable();
      table.text('old_content').nullable();
      table.enum('old_type', ['public', 'private']).defaultTo('private');
      table.boolean('old_is_draft');
      table.timestamp('old_published_at').nullable();

      table.timestamps(true);
    });
  }

  async down() {
    this.schema.dropTable(this.tableName);
  }
}
