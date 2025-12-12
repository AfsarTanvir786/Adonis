import Factory from '@adonisjs/lucid/factories'
import Workspace from '#models/workspace'
import { UserFactory } from './user_factory.js'

export default Factory.define(Workspace, ({ faker }) => {
  return {
    name: faker.commerce.department(),
    description: faker.lorem.sentence(),
  }
})
  .relation('user', () => UserFactory)
  .build()
