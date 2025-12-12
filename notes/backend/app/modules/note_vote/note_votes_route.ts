import router from '@adonisjs/core/services/router';
import { middleware } from '#start/kernel';
import NoteVoteController from './note_votes_controller.js';
router
  .group(() => {
    router.post('/', [NoteVoteController, 'create'])
  })
  .prefix('/api/noteVotes')
  .use(middleware.auth())
