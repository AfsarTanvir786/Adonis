import Factory from '@adonisjs/lucid/factories'
import Tag from '#models/tag'

export default Factory.define(Tag, ({ faker }) => {
  return {
    name: faker.hacker.noun(),
  }
}).build()
