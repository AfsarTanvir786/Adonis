import router from '@adonisjs/core/services/router';
import { HttpContext } from '@adonisjs/core/http';
import { middleware } from './kernel.js';

const AuthController = () => import('#controllers/auth_controller');
const CompanyController = () => import('#controllers/companies_controller');
const PlansController = () => import('../app/controllers/plans_controller.js');

router
  .group(() => {
    router.post('/signup', [CompanyController, 'signUp']);
    router.post('/login', [AuthController, 'login']);
  })
  .prefix('/api/auth');

router.get('/show', [PlansController, 'show']).prefix('/api/plan');

router.get('/', async ({auth}: HttpContext) => {
  return {
    hello: 'world',
    user: auth.user,
  };
});

// Protected routes
router
  .group(() => {
    router.get('/auth/profile', [AuthController, 'profile']);
    router.post('/auth/logout', [AuthController, 'logout']);

    /*  // Screenshot upload (for employees)
  router.post('/screenshots/upload', [ScreenshotController, 'upload'])
  
  // Admin only routes
  router.group(() => {
    // Employee management
    router.post('/employees', [EmployeeController, 'create'])
    router.get('/employees', [EmployeeController, 'list'])
    router.get('/employees/:id', [EmployeeController, 'show'])
    router.put('/employees/:id', [EmployeeController, 'update'])
    router.delete('/employees/:id', [EmployeeController, 'delete'])
    
    // Screenshot viewing
    router.get('/screenshots', [ScreenshotController, 'list'])
    router.get('/screenshots/:id', [ScreenshotController, 'show'])
  }).use(middleware.admin()) */
  })
  .prefix('/api')
  .use(middleware.auth());
