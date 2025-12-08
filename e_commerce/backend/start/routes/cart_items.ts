import router from '@adonisjs/core/services/router';
import CartItemsController from '#controllers/cart_items_controller';
import { middleware } from '#start/kernel';

router
  .group(() => {
    router.get('/', [CartItemsController, 'list']);
    router.get('/:id', [CartItemsController, 'show']);
    router.post('/', [CartItemsController, 'create']);
    router.put('/:id', [CartItemsController, 'update']);
    router.delete('/:id', [CartItemsController, 'delete']);
  })
  .prefix('/api/cartItems')
  .use(middleware.auth());
