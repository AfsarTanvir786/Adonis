import router from '@adonisjs/core/services/router';
import { middleware } from '../kernel.js';
import OrderItemsController from '#controllers/order_items_controller';

router
  .group(() => {
    router.get('/', [OrderItemsController, 'list']);
    router.post('/', [OrderItemsController, 'create']);
    router.get('/:id', [OrderItemsController, 'show']);
    router.put('/:id', [OrderItemsController, 'update']);
    router.delete('/:id', [OrderItemsController, 'delete']);
  })
  .prefix('/api/orderItems')
  .use(middleware.auth());
