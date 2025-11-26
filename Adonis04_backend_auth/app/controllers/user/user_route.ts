import router from '@adonisjs/core/services/router';

const UsersController = () => import('#controllers/user/user_controller');

router
  .group(() => {
    router.get('/users', [UsersController, 'index']); // Get all users
    router.get('/users/paginated', [UsersController, 'paginatedList']); // Get paginated users
    /* router.get('/user/:id', [UsersController, 'show']); // Get single user
    router.post('/user', [UsersController, 'store']); // Create user
    router.put('/user/:id', [UsersController, 'update']); // Update user
    router.delete('/user/:id', [UsersController, 'destroy']); // Delete user */
  })
  .prefix('/api');
