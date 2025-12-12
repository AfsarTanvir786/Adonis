import factory from '@adonisjs/lucid/factories'
import Company from '#models/company'

export const CompanyFactory = factory
  .define(Company, async ({ faker }) => {
    return {
      name: faker.company.name(),
    }
  })
  .build()