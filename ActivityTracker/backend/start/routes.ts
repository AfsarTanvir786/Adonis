import router from '@adonisjs/core/services/router';
import { middleware } from './kernel.js';

const AuthController = () => import('#controllers/auth_controller');
const AdminController = () => import('#controllers/admin_controller');
const CompanyController = () => import('#controllers/companies_controller');
const PlansController = () => import('#controllers/plans_controller');
const ScreenshotController = () =>
  import('#controllers/screenshots_controller');

/**
 * Public auth routes
 */
router
  .group(() => {
    router.post('/register', [CompanyController, 'register']);
    router.post('/login', [AuthController, 'login']);
  })
  .prefix('/api/auth');

/**
 * Public plan routes
 */
router
  .group(() => {
    router.get('/', [PlansController, 'show']);
  })
  .prefix('/api/plans');

/**
 * Protected routes
 */
router
  .group(() => {
    router
      .group(() => {
        router.get('/profile', [AuthController, 'profile']);
        router.delete('/logout', [AuthController, 'logout']);

        router
          .group(() => {
            router
              .group(() => {
                router.get('/min', [AdminController,'screenshotsGrouped10Min']);
                router.get('/hour', [AdminController,'screenshotsGroupedByHour']);
                router.get('/', [AdminController, 'screenshots']);
              })
              .prefix('/screenshots');
            router.get('/users', [AdminController, 'users']);
            router.post('/add-user', [AdminController, 'addUser']);
            router.get('/admin-dashboard', [AdminController, 'adminDashboard']);
            router.delete('/admin/user/:id', [AdminController, 'destroy']);
          })
          .use(middleware.role(['admin']));
      })
      .prefix('/auth');

    router
      .group(() => {
        router.post('/upload', [ScreenshotController, 'upload']);
      })
      .prefix('/screenshots');
  })
  .prefix('/api')
  .use(middleware.auth());
