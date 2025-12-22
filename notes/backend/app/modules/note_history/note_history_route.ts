import router from '@adonisjs/core/services/router';
import { middleware } from '#start/kernel';
import NoteHistoryController from './note_history_controller.js';
router
  .group(() => {
    router.get('/notes/:id', [NoteHistoryController, 'list']);
    router.get('/:id', [NoteHistoryController, 'show'])
    router.delete('/:id', [NoteHistoryController, 'delete']);
  })
  .prefix('/api/noteHistories')
  .use(middleware.auth());
