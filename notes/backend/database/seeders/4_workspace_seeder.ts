import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Company from '#models/company'
import User from '#models/user'
import WorkspaceFactory from '../factories/workspace_factory.js'

export default class WorkspaceSeeder extends BaseSeeder {
  async run() {
    const companies = await Company.all()
    
    for (const company of companies) {
      // Get users from this company
      const users = await User.query().where('companyId', company.id).limit(3)
      
      if (users.length === 0) continue

      // Create workspaces for each user
      for (const user of users) {
        await WorkspaceFactory.merge({
          companyId: company.id,
          userId: user.id,
        }).createMany(2)
      }
    }
  }
}
