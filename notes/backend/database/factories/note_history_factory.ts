import Factory from '@adonisjs/lucid/factories'
import NoteHistory from '#models/note_history'
import NoteFactory from './note_factory.js'
import {UserFactory} from './user_factory.js'

export default Factory.define(NoteHistory, ({ faker }) => {
  return {
    oldTitle: faker.lorem.sentence(),
    oldContent: faker.lorem.paragraph(),
  }
})
  .relation('note', () => NoteFactory)
  .relation('user', () => UserFactory)
  .build()
