import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Company from '#models/company'

export default class CompanySeeder extends BaseSeeder {
  async run() {
    await Company.updateOrCreateMany('name', [
      { name: 'appifylab' },
      { name: 'ezycourse' },
      { name: 'localhost' },
      /* { name: 'dreaming_boys' },
      { name: 'company1' },
      { name: 'company2' },
      { name: 'company3' },
      { name: 'company4' },
      { name: 'company5' },
      { name: 'company6' }, */
    ])
  }
}