import router from '@adonisjs/core/services/router'
import ProductsController from '#controllers/products_controller'
import { middleware } from '../kernel.js'

router
  .group(() => {
    router.get('/', [ProductsController, 'list'])
    router.get('/:id', [ProductsController, 'show'])
    router.post('/', [ProductsController, 'create'])
    router.put('/:id', [ProductsController, 'update'])
    router.delete('/:id', [ProductsController, 'delete'])
  })
  .prefix('/api/products')
  .use(middleware.auth())
