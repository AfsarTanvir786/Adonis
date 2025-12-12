import { middleware } from '#start/kernel';
import router from '@adonisjs/core/services/router';
import AuthController from './auth_controller.js';

router
  .group(() => {
    router.get('/', async () => {
      return {
        message: 'Auth Module is working',
      }
    })
    router.post('/register', [AuthController, 'register'])
    router.post('/login', [AuthController, 'login'])

    router
      .group(() => {
        router.get('/profile', [AuthController, 'profile'])
        router.get('/users', [AuthController, 'getUserList'])
        router.delete('/logout', [AuthController, 'logout'])
      })
      .use(middleware.auth())
  })
  .prefix('/api/auth')
