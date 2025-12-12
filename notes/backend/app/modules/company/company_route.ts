import router from '@adonisjs/core/services/router';
import { middleware } from '#start/kernel';
import CompanysController from './company_controller.js';
router
  .group(() => {
    router.get('/', [CompanysController, 'list'])
    router.get('/:id', [CompanysController, 'show'])
    router
      .post('/', [CompanysController, 'create'])
      .use(middleware.role(['admin'])) /* only admin can */
    router.put('/:id', [CompanysController, 'update'])
    router.delete('/:id', [CompanysController, 'delete'])
  })
  .prefix('/api/companys')
  .use(middleware.auth())
