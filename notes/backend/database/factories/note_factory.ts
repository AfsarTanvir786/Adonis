import Factory from '@adonisjs/lucid/factories'
import Note from '#models/note'
import WorkspaceFactory from './workspace_factory.js'
import { UserFactory } from './user_factory.js'
import { DateTime } from 'luxon'

export default Factory.define(Note, ({ faker }) => {
  const isDraft = faker.datatype.boolean({ probability: 0.3 }) // 30% chance of draft

  return {
    title: faker.lorem.sentence({ min: 3, max: 8 }),
    content: faker.lorem.paragraphs(3),
    type: faker.helpers.arrayElement(['public', 'private']),
    isDraft: isDraft,
    publishedAt: isDraft
      ? null
      : DateTime.now().minus({ days: faker.number.int({ min: 0, max: 30 }) }),
  }
})
  .relation('workspace', () => WorkspaceFactory)
  .relation('user', () => UserFactory)
  .build()