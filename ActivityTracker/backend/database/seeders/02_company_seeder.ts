import { BaseSeeder } from '@adonisjs/lucid/seeders';
import Company from '#models/company';

export default class CompanySeeder extends BaseSeeder {
  async run() {
    await Company.updateOrCreateMany('name', [
      {
        name: 'Appifylab',
        ownerName: 'John Doe',
        ownerEmail: 'owner@appifylab.com',
        planSectionId: 1,
        isActive: true,
      },
      {
        name: 'Ezycourse',
        ownerName: 'Jane Smith',
        ownerEmail: 'owner@ezycourse.com',
        planSectionId: 2,
        isActive: true,
      },
      {
        name: 'localhost',
        ownerName: 'Afsar Tanvir',
        ownerEmail: 'owner@localhost.com',
        planSectionId: 4,
        isActive: true,
      },
    ]);
  }
}
