import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

const AuthController = () => import('#controllers/auth_controller')
const CompanyController = () => import('#controllers/companies_controller')
const PlansController = () => import('#controllers/plans_controller')
const ScreenshotController = () => import('#controllers/screenshots_controller')

/**
 * Public auth routes
 */
router.group(() => {
  router.post('/register', [CompanyController, 'register'])
  router.post('/login', [AuthController, 'login'])
}).prefix('/api/auth')

/**
 * Public plan routes
 */
router.group(() => {
  router.get('/', [PlansController, 'show'])
}).prefix('/api/plan')

/**
 * Protected routes
 */
router
  .group(() => {
    router.group(() => {
      router.get('/profile', [AuthController, 'profile'])
      router.delete('/logout', [AuthController, 'logout'])
      router
        .get('/admin-dashboard', [AuthController, 'adminDashboard'])
        .use(middleware.role(['admin']))
    }).prefix('/auth')

    router.group(() => {
      router.post('/upload', [ScreenshotController, 'upload'])
      router.post('/bulk-upload', [ScreenshotController, 'bulkUpload'])
      router.get('/', [ScreenshotController, 'list'])
      router.get('/grouped', [ScreenshotController, 'grouped'])
      router.delete('/:id', [ScreenshotController, 'delete'])
    }).prefix('/screenshots')
  })
  .prefix('/api')
  .use(middleware.auth())
