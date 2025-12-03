import AuthController from '#controllers/auth_controller';
import router from '@adonisjs/core/services/router';
import { middleware } from './kernel.js';
import CategoriesController from '#controllers/categories_controller';
import ProductsController from '#controllers/products_controller';
import CartsController from '#controllers/carts_controller';
import CartItemsController from '#controllers/cart_items_controller';

router.get('/', async () => {
  return {
    hello: 'e-commerce project home',
  };
});

router
  .group(() => {
    router.post('/register', [AuthController, 'register']);
    router.post('/login', [AuthController, 'login']);

    router
      .group(() => {
        router.get('/profile', [AuthController, 'profile']);
        router.get('/users', [AuthController, 'getUserList']);
        router.delete('/logout', [AuthController, 'logout']);
      })
      .use(middleware.auth());
  })
  .prefix('/api/auth');

router
  .group(() => {
    router.get('/:id', [CategoriesController, 'index']);
    router.post('/', [CategoriesController, 'create']);
    router.put('/:id', [CategoriesController, 'update']);
    router.get('/', [CategoriesController, 'getCategoryList']);
  })
  .prefix('/api/categories');

router
  .group(() => {
    router.get('/', [ProductsController, 'list']);
    router.get('/:id', [ProductsController, 'show']);
    router.post('/', [ProductsController, 'create']);
    router.put('/:id', [ProductsController, 'update']);
    router.delete('/:id', [ProductsController, 'delete']);
  })
  .prefix('/api/products');

router
  .group(() => {
    router.get('/', [CartsController, 'list']);
    router.get('/:id', [CartsController, 'show']);
    router.post('/', [CartsController, 'create']);
    router.delete('/:id', [CartsController, 'delete']);
  })
  .prefix('/api/carts');

router
  .group(() => {
    router.get('/', [CartItemsController, 'list']);
    router.get('/:id', [CartItemsController, 'show']);
    router.post('/', [CartItemsController, 'create']);
    router.put('/:id', [CartItemsController, 'update']);
    router.delete('/:id', [CartItemsController, 'delete']);
  })
  .prefix('/api/cartItems');

