import router from '@adonisjs/core/services/router';
import { middleware } from '#start/kernel';
import TagsController from './tags_controller.js';
router
  .group(() => {
    router.get('/', [TagsController, 'list'])
    router.get('/:id', [TagsController, 'show']) 
    router
      .group(() => {
        router.post('/', [TagsController, 'create']) /* only admin can */
        router.put('/:id', [TagsController, 'update']) /* only admin can */
        router.delete('/:id', [TagsController, 'delete']) /* only admin can */
      })
      .use(middleware.role(['admin']))
  })
  .prefix('/api/tags')
  .use(middleware.auth())
