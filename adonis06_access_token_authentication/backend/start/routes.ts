import router from '@adonisjs/core/services/router';
import { middleware } from './kernel.js';
const AuthController = () => import('#controllers/auth_controller');

router
  .get('/', async () => {
    return {
      project: 'adonis06 access token authentication.',
    };
  })
  .use(middleware.auth());

router.post('/register', [AuthController, 'register']);
router.post('/login', [AuthController, 'login']);
router.delete('/logout', [AuthController, 'logout']).use(middleware.auth());
router.get('/me', [AuthController, 'me']);
