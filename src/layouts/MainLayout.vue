<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          Chat-System
        </q-toolbar-title>
        <q-btn v-if="authStatus" flat round dense v-on:click="logoutAPI()">
          Logout
        </q-btn>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import API from '../api'
export default {
  name: 'MainLayout',
  computed: {
    ...mapGetters('userStore', ['authStatus', 'getUser'])
  },
  methods: {
    ...mapActions('userStore', ['logout']),
    logoutAPI () {
      API.post('/auth/logout/', {}, {
        headers: {
          Authorization: `Token ${this.getUser.token}`
        }
      })
        .then((res) => {
          this.logout()
          this.$q.notify({
            icon: 'done',
            color: 'positive',
            message: 'Volte sempre!'
          })
          this.$router.push({ name: 'login' })
        })
        .catch((err) => {
          console.log(err.response)
        })
    }
  }
}
</script>
