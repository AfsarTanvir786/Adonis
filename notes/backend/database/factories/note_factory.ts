import Factory from '@adonisjs/lucid/factories'
import Note from '#models/note'
import WorkspaceFactory from './workspace_factory.js'
import { UserFactory } from './user_factory.js'
import Tag from '#models/tag'
import { DateTime } from 'luxon'

export default Factory.define(Note, ({ faker }) => {
  return {
    title: faker.lorem.sentence(4),
    content: faker.lorem.paragraph(),
    type: faker.helpers.arrayElement(['public', 'private']),
    isDraft: false,
    publishedAt: DateTime.now(),
  }
})
  .relation('workspace', () => WorkspaceFactory)
  .relation('user', () => UserFactory)
  .after('create', async (_, note, { faker }) => {
    // note = real Lucid model instance
    if (!note) return

    const tags = await Tag.query().orderByRaw('RAND()').limit(10)
    const tagIds = tags.map((t) => t.id)

    await note.related('tags').attach(faker.helpers.arrayElements(tagIds, { min: 2, max: 4 }))
  })
  .build()
