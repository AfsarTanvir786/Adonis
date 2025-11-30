import AuthController from '#controllers/auth_controller';
import router from '@adonisjs/core/services/router';
import { middleware } from './kernel.js';

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
