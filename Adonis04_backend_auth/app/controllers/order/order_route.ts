import router from '@adonisjs/core/services/router';

const OrdersController = () => import('#controllers/order/order_controller');

router
  .group(() => {
    router.get('/orders', [OrdersController, 'index']); // Get all users
    router.get('/orders/paginated', [OrdersController, 'paginatedList']); // Get paginated users
    router.get('/order/:id', [OrdersController, 'show']); // Get single user
    router.post('/order', [OrdersController, 'store']); // Create user
    router.delete('/order/:id', [OrdersController, 'destroy']); // Delete user
  })
  .prefix('/api');
