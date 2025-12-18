import router from '@adonisjs/core/services/router';
import DashboardController from './dashboard_controller.js';
import { middleware } from '#start/kernel';

router
  .get('/api/dashboard', [DashboardController, 'index'])
  .use(middleware.auth());
