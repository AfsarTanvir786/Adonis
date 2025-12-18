import router from '@adonisjs/core/services/router';
import { middleware } from '#start/kernel';
import WorkspacesController from './workspace_controller.js';
router
  .group(() => {
    router.get('/', [WorkspacesController, 'list'])
    router.get('/:id/sortNotes', [WorkspacesController, 'sortList']);
    router.get('/:id/notes', [WorkspacesController, 'notes'])
    router.get('/:id', [WorkspacesController, 'show'])
    router.post('/', [WorkspacesController, 'create'])
    router.put('/:id', [WorkspacesController, 'update'])
    router.delete('/:id', [WorkspacesController, 'destroy']);
  })
  .prefix('/api/workspaces')
  .use(middleware.auth())
