import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Company from '#models/company'
import { UserFactory } from '../factories/user_factory.js'
import WorkspaceFactory from '../factories/workspace_factory.js'
import NoteFactory from '../factories/note_factory.js'
import Tag from '#models/tag'

export default class DatabaseSeeder extends BaseSeeder {
  async run() {
    // Create Tags
    await Tag.updateOrCreateMany('name', [
      { name: 'javascript' },
      { name: 'typescript' },
      { name: 'backend' },
      { name: 'frontend' },
      { name: 'database' },
      { name: 'adonisjs' },
      { name: 'api' },
      { name: 'design' },
    ])

    // Create one company
    const company = await Company.firstOrFail()

    // Create users via factory
    const users = await UserFactory.merge({ companyId: company.id }).createMany(5)

    // Create workspaces
    const workspaces = await WorkspaceFactory.merge({ companyId: company.id }).createMany(3)

    // Create notes
    await NoteFactory.merge({
      userId: users[0].id,
      workspaceId: workspaces[0].id,
    }).createMany(20)
  }
}
