import router from '@adonisjs/core/services/router'
import CartsController from '#controllers/carts_controller'
import { middleware } from '#start/kernel'

router
  .group(() => {
    router.get('/', [CartsController, 'list']);
    router.get('/:id', [CartsController, 'show']);
    router.post('/', [CartsController, 'create']);
    router.delete('/:id', [CartsController, 'delete']);
  })
  .prefix('/api/carts')
  .use(middleware.auth());