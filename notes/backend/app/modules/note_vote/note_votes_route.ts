import router from '@adonisjs/core/services/router';
import { middleware } from '#start/kernel';
import NoteVoteController from './note_votes_controller.js';
router
  .group(() => {
    router.post('/:id', [NoteVoteController, 'create'])
    router.get('/:id', [NoteVoteController, 'show'])

  })
  .prefix('/api/noteVotes')
  .use(middleware.auth())


router
  .group(() => {
    router.get('/:id', [NoteVoteController, 'showTotalVoteCount']) // get total vote count
  })
  .prefix('/api/voteCounts')
  .use(middleware.auth())
