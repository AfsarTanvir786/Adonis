import router from '@adonisjs/core/services/router';
import NotesController from './notes_controller.js';
import { middleware } from '#start/kernel';
router
  .group(() => {
    router.get('/', [NotesController, 'list']);
    router.get('/my', [NotesController, 'getMyNoteList']);
    router.get('/notes/my', [NotesController, 'myNotes']);
    router.post('/', [NotesController, 'create']);
    router.get('/:id', [NotesController, 'show']);
    router.put('/:id', [NotesController, 'update']);
    router.delete('/:id', [NotesController, 'delete']);
  })
  .prefix('/api/notes')
  .use(middleware.auth());
