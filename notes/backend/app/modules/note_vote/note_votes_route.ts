import router from '@adonisjs/core/services/router';
import { middleware } from '#start/kernel';
import NoteVoteController from './note_votes_controller.js';
router
  .group(() => {
    router.get('/:id', [NoteVoteController, 'show']);
    router.post('/:id', [NoteVoteController, 'create']);
    router.delete('/:id', [NoteVoteController, 'destroy']);
  })
  .prefix('/api/noteVotes')
  .use(middleware.auth());
