import router from '@adonisjs/core/services/router';

import '../app/controllers/user/user_route.js';
import '../app/controllers/order/order_route.js';

router.get('/api/dashboard', async () => {
  return {
    home: 'I am at dashboard',
    error: 'No error',
  };
});

