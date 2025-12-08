import router from '@adonisjs/core/services/router';
import { middleware } from '../kernel.js';
import OrdersController from '#controllers/orders_controller';

router
  .group(() => {
    router.get('/:id', [OrdersController, 'show']);
    router.post('/', [OrdersController, 'create']);
    router.put('/:id', [OrdersController, 'update']);
    router.delete('/:id', [OrdersController, 'delete']);
    router.get('/', [OrdersController, 'list']);
  })
  .prefix('/api/orders')
  .use(middleware.auth());
