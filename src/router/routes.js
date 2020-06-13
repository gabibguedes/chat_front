import store from '../store'

const beforeEnter = (to, from, next) => {
  setTimeout(() => {
    if (store().getters['userStore/authStatus']) {
      return next('/')
    } else {
      return next()
    }
  }, 250)
}

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/',
        name: 'contacts',
        component: () => import('pages/Index.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/chat',
        name: 'chat',
        component: () => import('pages/Chat.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/login',
        name: 'login',
        component: () => import('pages/Login.vue'),
        beforeEnter: beforeEnter
      },
      {
        path: '/register',
        name: 'register',
        component: () => import('pages/Register.vue'),
        beforeEnter: beforeEnter
      }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
