import { BaseSeeder } from '@adonisjs/lucid/seeders'
import app from '@adonisjs/core/services/app'

export default class IndexSeeder extends BaseSeeder {
  private async seed(Seeder: { default: typeof BaseSeeder }) {
    if (
      !Seeder.default.environment ||
      (!Seeder.default.environment.includes('development') && app.inDev) ||
      (!Seeder.default.environment.includes('testing') && app.inTest) ||
      (!Seeder.default.environment.includes('production') && app.inProduction)
    ) {
      return
    }

    await new Seeder.default(this.client).run()
  }

  async run() {
    await this.seed(await import('./1_company_seeder.js'))
    await this.seed(await import('./2_tag_seeder.js'))
    await this.seed(await import('./3_user_seeder.js'))
    await this.seed(await import('./4_workspace_seeder.js'))
    await this.seed(await import('./5_note_seeder.js'))
    await this.seed(await import('./6_note_vote_seeder.js'))
    await this.seed(await import('./7_note_history_seeder.js'))
    console.log('Database seeding completed!')
  }
}