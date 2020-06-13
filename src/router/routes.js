
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/', name: 'contacts', component: () => import('pages/Index.vue') },
      { path: '/chat', name: 'chat', component: () => import('pages/Chat.vue') },
      { path: '/login', name: 'login', component: () => import('pages/Login.vue') },
      { path: '/register', name: 'register', component: () => import('pages/Register.vue') }
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
