import Vue from 'vue'
import Vuex from 'vuex'
import userStore from './module-user'
import createPersistedState from 'vuex-persistedstate'

// import example from './module-example'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */
// eslint-disable-next-line new-cap
const userState = new createPersistedState()

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      userStore
      // example
    },
    plugins: [userState],

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
