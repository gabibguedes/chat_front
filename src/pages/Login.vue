<template>
  <q-page class="flex flex-center">
    <q-card square class="shadow-24 login-card">
      <q-card-section class="bg-primary">
        <h4 class="text-h5 q-my-md title">Login</h4>
      </q-card-section>
      <q-form class="forms"  @submit="loginAPI()">
        <q-card-section>
          <q-input square maxlength="40" v-model="user.username" type="username" label="Username">
            <template v-slot:prepend>
              <q-icon name="alternate_email" />
            </template>
          </q-input>
            <q-input square maxlength="40" v-model="user.password" :type="isPwd ? 'password' : 'text'" label="Senha">
              <template v-slot:prepend>
                <q-icon name="lock" />
              </template>
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
          </q-card-section>
          <q-card-actions class="q-px-lg">
            <q-btn unelevated size="lg" type="submit" :disabled="emptyFields()" color="primary" class="full-width text-white" label="Entrar"/>
          </q-card-actions>
          <q-card-section class="text-center q-pa-sm">
            <button class="link-button" v-on:click="() => $router.push({ name: 'register' })">
              Ainda não está cadastrado?
            </button>
          </q-card-section>
      </q-form>
    </q-card>
  </q-page>
</template>

<script>
import API from '../api'
import { mapActions } from 'vuex'

export default {
  name: 'Login',
  data () {
    return {
      user: {
        username: '',
        password: ''
      },
      isPwd: true
    }
  },
  methods: {
    ...mapActions('userStore', ['login']),
    loginAPI () {
      if (!this.emptyFields()) {
        API.post('auth/login/', this.user)
          .then((res) => {
            this.login(res.data)
            this.$q.notify({
              icon: 'done',
              color: 'positive',
              message: 'Você está logado!'
            })
            this.$router.push({ name: 'contacts' })
          })
          .catch((err) => {
            if (err.response.data[0] === 'Invalid username/password. Please try again!') {
              this.$q.notify({
                icon: 'error',
                color: 'negative',
                message: 'Usuário ou senha incorretos.'
              })
            } else {
              console.log(err.response)
            }
          })
      }
    },
    emptyFields () {
      if (this.user.username === '' || this.user.password === '') {
        return true
      }
      return false
    }
  }
}
</script>

<style lang="scss" scoped>
.forms {
    padding: 10px;
}

.login-card {
    width:300px;
    height: 400px;
}

.title {
    color: white;
    font-weight: 15px;
}
.link-button {
  color: grey;
  background-color: inherit;
  border: none;
}
</style>
