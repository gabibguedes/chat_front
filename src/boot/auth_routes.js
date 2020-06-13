export default ({ router, store, Vue }) => {
  router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
    if (store.getters['userStore/authStatus'] && (to.path === '/login' || to.path === '/register')) {
      return next('/')
    }
    if (requiresAuth && !store.getters['userStore/authStatus']) {
      return next({ path: '/login' })
    }

    next()
  })
}
