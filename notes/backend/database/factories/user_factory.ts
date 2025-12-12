import factory from '@adonisjs/lucid/factories'
import User from '#models/user'

export const UserFactory = factory
  .define(User, ({ faker }) => {
    return {
      name: faker.person.fullName(),
      email: faker.internet.email().toLowerCase(),
      password: 'TEMP_PASS', // will be overridden in after hook
      role: faker.helpers.arrayElement(['admin', 'member']),
    }
  })
  .build()
