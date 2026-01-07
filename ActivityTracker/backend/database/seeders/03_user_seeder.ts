import { BaseSeeder } from '@adonisjs/lucid/seeders';
import User from '#models/user';
import { DateTime } from 'luxon';

export default class UserSeeder extends BaseSeeder {
  async run() {
    const users = [];
    let globalUserIndex = 1;

    for (let companyId = 1; companyId <= 100; companyId++) {

        const index0 = companyId.toString().padStart(4, '0');

      users.push({
        name: `owner_company${index0}`,
        email: `owner@company${index0}.com`,
        password: 'password@123',
        role: 'admin' as 'admin' | 'employee',
        companyId,
        isActive: Math.random() > 0.3, // 70% active
        lastLoginAt: DateTime.fromISO('2026-01-01')
          .plus({ days: Math.floor(Math.random() * 7) })
          .toUTC(),
      });

      for (let i = 1; i <= 50; i++) {
        const index = globalUserIndex.toString().padStart(4, '0');

        users.push({
          name: `employee${index}`,
          email: `employee${index}@gmail.com`,
          password: 'password@123',
          role: 'employee' as 'admin' | 'employee',
          companyId,
          isActive: Math.random() > 0.3, // 70% active
          lastLoginAt: DateTime.fromISO('2026-01-01')
            .plus({ days: Math.floor(Math.random() * 7) })
            .toUTC(),
        });

        globalUserIndex++;
      }
    }

    await User.createMany(users);
  }
}
