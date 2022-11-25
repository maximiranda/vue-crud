import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      alias: '/books',
      name: 'books',
      component: () => import("../components/BookList.vue")
    },
    {
      path: '/books/:id',
      name: 'books-details',
      component: () => import("../components/Book.vue")
    },
    {
      path: '/add',
      name: 'add',
      component: () => import("../components/addBook.vue")
    }

  ]
})

export default router
