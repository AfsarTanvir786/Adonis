import Factory from '@adonisjs/lucid/factories'
import Workspace from '#models/workspace'
import { UserFactory } from './user_factory.js'
import { CompanyFactory } from './company_factory.js'

export default Factory.define(Workspace, ({ faker }) => {
  return {
    name: faker.commerce.department(),
    description: faker.lorem.sentence(),
  }
})
  .relation('company', () => CompanyFactory)
  .relation('user', () => UserFactory)
  .build()