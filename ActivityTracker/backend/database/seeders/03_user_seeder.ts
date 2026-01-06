import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Company from '#models/company'
import { UserFactory } from '../factories/user_factory.js'

export default class UserSeeder extends BaseSeeder {
  async run() {
    // Get all companies
    const companies = await Company.all();

    if (companies.length === 0) {
      // console.log('No companies found. Please run company seeder first.');
      return;
    }

    // Create users for each company
    for (const company of companies) {
      // Create owner
      await UserFactory.merge({
        companyId: company.id,
        role: 'admin',
        email: `owner@${company.name.toLowerCase().replace(/\s+/g, '')}.com`,
        name: `${company.name} Owner`,
      }).create();

      // Create members
      await UserFactory.merge({
        companyId: company.id,
        role: 'employee',
      }).createMany(9);
    }
  }
}