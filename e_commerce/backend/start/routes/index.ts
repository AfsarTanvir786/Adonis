import router from '@adonisjs/core/services/router';
import './auth.js';
import './cart_items.js';
import './categories.js';
import './orders.js';
import './products.js';
import './order_items.js';

router.get('/', async () => {
  return {
    hello: 'e-commerce project home',
  };
});
