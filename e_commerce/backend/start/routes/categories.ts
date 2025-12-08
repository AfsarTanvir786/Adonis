import router from '@adonisjs/core/services/router';
import CategoriesController from '#controllers/categories_controller';
import { middleware } from '../kernel.js';

router
  .group(() => {
    router.get('/:id', [CategoriesController, 'index']);
    router
      .post('/', [CategoriesController, 'create'])
      .use(middleware.role(['admin', 'employee']));
    router
      .put('/:id', [CategoriesController, 'update'])
      .use(middleware.role(['admin', 'employee']));
    router
      .delete('/:id', [CategoriesController, 'update'])
      .use(middleware.role(['admin', 'employee']));
    router.get('/', [CategoriesController, 'getCategoryList']);
  })
  .prefix('/api/categories')
  .use(middleware.auth());
