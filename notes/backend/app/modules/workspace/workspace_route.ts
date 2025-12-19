import router from '@adonisjs/core/services/router';
import { middleware } from '#start/kernel';
import WorkspacesController from './workspace_controller.js';
router
  .group(() => {
    router.get('/', [WorkspacesController, 'list']);
    router.post('/', [WorkspacesController, 'create']);
    router.get('/:id/notes', [WorkspacesController, 'listPublicNotes']);
    router.get('/:id', [WorkspacesController, 'show']);
    router.put('/:id', [WorkspacesController, 'update']);
    router.delete('/:id', [WorkspacesController, 'destroy']);
  })
  .prefix('/api/workspaces')
  .use(middleware.auth());
