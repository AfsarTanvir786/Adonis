import Factory from '@adonisjs/lucid/factories'
import NoteVote from '#models/note_vote'
import { UserFactory } from './user_factory.js'
import NoteFactory from './note_factory.js'

export default Factory.define(NoteVote, ({ faker }) => {
  return {
    vote: faker.helpers.arrayElement(['up', 'down']),
  }
})
  .relation('note', () => NoteFactory)
  .relation('user', () => UserFactory)
  .build()