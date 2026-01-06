import factory from '@adonisjs/lucid/factories'
import User from '#models/user'
import { CompanyFactory } from './company_factory.js'

export const UserFactory = factory
  .define(User, async ({ faker }) => {
    return {
      name: faker.person.fullName(),
      email: faker.internet.email().toLowerCase(),
      password: 'Password@123', // Default password for testing
      role: faker.helpers.arrayElement(['employee', 'admin']), // Fixed: added 'owner'
    }
  })
  .relation('company', () => CompanyFactory)
  .build()