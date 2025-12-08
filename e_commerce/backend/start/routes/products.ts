import router from '@adonisjs/core/services/router';
import ProductsController from '#controllers/products_controller';
import { middleware } from '../kernel.js';

router
  .group(() => {
    router.get('/', [ProductsController, 'list']);
    router.get('/:id', [ProductsController, 'show']);
    router
      .post('/', [ProductsController, 'create'])
      .use(middleware.role(['admin', 'employee']));
    router
      .put('/:id', [ProductsController, 'update'])
      .use(middleware.role(['admin', 'employee']));
    router
      .delete('/:id', [ProductsController, 'delete'])
      .use(middleware.role(['admin', 'employee']));
  })
  .prefix('/api/products')
  .use(middleware.auth());
