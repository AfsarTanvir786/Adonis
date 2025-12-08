import router from '@adonisjs/core/services/router';
import AuthController from '#controllers/auth_controller';
import { middleware } from '../kernel.js';

router
  .group(() => {
    router.post('/register', [AuthController, 'register']);
    router.post('/login', [AuthController, 'login']);

    router
      .group(() => {
        router.get('/profile', [AuthController, 'profile']);
        router
          .get('/users', [AuthController, 'getUserList'])
          .use(middleware.role(['admin']));
        router.delete('/logout', [AuthController, 'logout']);
      })
      .use(middleware.auth());
  })
  .prefix('/api/auth');
