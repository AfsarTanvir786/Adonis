import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Company from '#models/company'

export default class CompanySeeder extends BaseSeeder {
  async run() {
    await Company.updateOrCreateMany('name', [
      { name: 'Acme Corporation' },
      { name: 'TechStart Inc' },
      { name: 'Digital Solutions Ltd' },
    ])
  }
}