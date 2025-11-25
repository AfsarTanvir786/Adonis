import router from '@adonisjs/core/services/router'
import { HttpContext } from '@adonisjs/core/http'
import { middleware } from './kernel.js'
import auth from '@adonisjs/auth/services/main'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.get('/api/employee', async () => {
  return [
    {
      id: 1001,
      name: 'Afsar Tanvir',
      date_of_birth: '24-10-2025',
    },
    {
      id: 1002,
      name: 'Md. Faysal Numin',
      date_of_birth: '24-10-2023',
    },
    {
      id: 1003,
      name: 'Mohammad Arman Ahmed Adil',
      date_of_birth: '24-10-2020',
    },
    {
      id: 1004,
      name: 'Anamul Hasan',
      date_of_birth: '24-05-2023',
    },
    {
      id: 1005,
      name: 'Nahim',
      date_of_birth: '14-10-2025',
    },
    {
      id: 1006,
      name: 'kalid Azad',
      date_of_birth: '24-10-2026',
    },
  ]
})

router
  .post('/api/logout', async ({ auth, response }: HttpContext) => {
    await auth.use('web').logout()
    return response.redirect('/api/login')
  })
  .use(middleware.auth())

// router.post('api/login', async ({ auth, response }: HttpContext) => {
//   // await auth.use('web').login
//   return {
//     message: 'Hello afsar',
//     error: 'should i show errors',
//   }
// })
// import router from '@adonisjs/core/services/router'
// const MoviesController = () => import('#controllers/movies_controller')
// const BooksController = () => import('#controllers/books_controller')

// router.get('/', [MoviesController, 'movieControllerIndex']).as('home')

// // router
// //   .get('/movies/:slug', [MoviesController, 'show'])
// //   .as('movies.show')
// //   .where('slug', router.matchers.slug())

// // Movies
// router.get('/movies', [MoviesController, 'movieControllerIndex']).as('movies.index')
// router
//   .get('/movies/:slug', [MoviesController, 'movieControllerShow'])
//   .as('movies.show')
//   .where('slug', router.matchers.slug())

// // Books
// router.get('/books', [BooksController, 'bookControllerIndex']).as('books.index')
// router
//   .get('/books/:slug', [BooksController, 'bookControllerShow'])
//   .as('books.show')
//   .where('slug', router.matchers.slug())


const UsersController = () => import('#controllers/users_controller')

router.group(() => {
  router.get('/users', [UsersController, 'index'])           // Get all users
  router.get('/users/paginated', [UsersController, 'paginatedList'])  // Get paginated users
  router.get('/users/:id', [UsersController, 'show'])        // Get single user
  router.post('/users', [UsersController, 'store'])          // Create user
  router.put('/users/:id', [UsersController, 'update'])      // Update user
  router.delete('/users/:id', [UsersController, 'destroy'])  // Delete user
}).prefix('/api')

router.get('/api/dashboard', async () => {
  return {
    home: 'I am at dashboard',
    error: 'No error'
  }
})