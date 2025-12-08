import router from '@adonisjs/core/services/router';
import CategoriesController from '#controllers/categories_controller';
import { middleware } from '../kernel.js';

router
  .group(() => {
    router.get('/:id', [CategoriesController, 'index']);
    router.post('/', [CategoriesController, 'create']);
    router.put('/:id', [CategoriesController, 'update']);
    router.get('/', [CategoriesController, 'getCategoryList']);
  })
  .prefix('/api/categories')
  .use(middleware.auth());