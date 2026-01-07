import { BaseSeeder } from '@adonisjs/lucid/seeders';
import Company from '#models/company';

export default class CompanySeeder extends BaseSeeder {
  async run() {
    const companies = [];

    for (let i = 1; i <= 100; i++) {
      const index = i.toString().padStart(4, '0');

      companies.push({
        planSectionId: Math.floor(Math.random() * 4) + 1, // 1–4
        name: `company${index}`,
        ownerName: `owner_company${index}`,
        ownerEmail: `owner@company${index}.com`,
        isActive: true,
      });
    }

    await Company.createMany(companies);
  }
}
