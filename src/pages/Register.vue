<template>
<q-page class="flex flex-center">
    <q-card square class="shadow-24 login-card">
        <q-card-section class="bg-primary">
        <h4 class="text-h5 q-my-md title">Cadastro</h4>
        </q-card-section>
        <q-form class="forms" @submit="registerAPI">
          <q-card-section>
                <q-input square v-model="user.first_name" type="text" label="Nome"
                  maxlength="100"
                  :error-message="this.errors.first_name[0]"
                  :error="this.errors.first_name.length > 0 && (this.user.first_name === this.old.first_name)">
                    <template v-slot:prepend>
                        <q-icon name="person" />
                    </template>
                </q-input>
                <q-input square v-model="user.last_name" type="text" label="Sobrenome"
                  maxlength="100"
                  :error-message="this.errors.last_name[0]"
                  :error="this.errors.last_name.length > 0 && (this.user.last_name === this.old.last_name)">
                    <template v-slot:prepend>
                        <q-icon name="portrait" />
                    </template>
                </q-input>
                <q-input square v-model="user.username" type="text" label="Username"
                        maxlength="40"
                        :error-message="this.errors.username[0]"
                        :error="this.errors.username.length > 0 && (this.user.username === this.old.username)">
                    <template v-slot:prepend>
                        <q-icon name="alternate_email" />
                    </template>
                </q-input>
                <q-input square v-model="user.password"  :type="isPwd1 ? 'password' : 'text'" label="Senha"
                        maxlength="40"
                        :error-message="this.errors.password[0]"
                        :error="this.errors.password.length > 0 && (this.user.password === this.old.password)">
                    <template v-slot:prepend>
                        <q-icon name="lock" />
                    </template>
                    <template v-slot:append>
                      <q-icon
                        :name="isPwd1 ? 'visibility_off' : 'visibility'"
                        class="cursor-pointer"
                        @click="isPwd1 = !isPwd1"
                      />
                    </template>
                </q-input>
                <q-input square v-model="passwordConfirmation"  :type="isPwd2 ? 'password' : 'text'" label="Repita sua senha"
                        error-message="Confirmação de senha deve ser igual a senha."
                        :error="this.user.password !== this.passwordConfirmation">
                    <template v-slot:prepend>
                        <q-icon name="vpn_key" />
                    </template>
                    <template v-slot:append>
                      <q-icon
                        :name="isPwd2 ? 'visibility_off' : 'visibility'"
                        class="cursor-pointer"
                        @click="isPwd2 = !isPwd2"
                      />
                    </template>
                </q-input>
          </q-card-section>
          <q-card-actions class="q-px-lg">
              <q-btn type="submit" :disabled="emptyFields()" unelevated size="lg" color="primary" class="full-width text-white" label="Entrar"/>
          </q-card-actions>
        </q-form>
        <q-card-section class="text-center q-pa-sm">
            <button class="link-button" v-on:click="() => $router.push({ name: 'login' })">
              Já possui cadastro?
            </button>
        </q-card-section>
    </q-card>
    </q-page>
</template>

<script>
import API from '../api'
import { mapActions } from 'vuex'

export default {
  name: 'Register',
  data () {
    return {
      user: {
        first_name: '',
        last_name: '',
        username: '',
        password: ''
      },
      passwordConfirmation: '',
      isPwd1: true,
      isPwd2: true,
      old: {},
      errors: {
        first_name: [],
        last_name: [],
        username: [],
        password: []
      }
    }
  },
  methods: {
    ...mapActions('userStore', ['login']),
    registerAPI () {
      if (!this.emptyFields()) {
        API.post('auth/register/', this.user)
          .then((res) => {
            this.old = {}
            this.login(res.data)
            this.$q.notify({
              icon: 'done',
              color: 'positive',
              message: 'Você está logado!'
            })
            this.$router.push({ name: 'contacts' })
          })
          .catch((err) => {
            this.old = JSON.parse(JSON.stringify(this.user))
            const error = err.response.data
            this.errors = {
              first_name: error.first_name ? error.first_name : [],
              last_name: error.last_name ? error.last_name : [],
              username: error.username ? error.username : [],
              password: error.password ? error.password : []
            }
            console.log(err.response)
          })
      }
    },
    emptyFields () {
      if (this.user.first_name === '' ||
          this.user.last_name === '' ||
          this.user.username === '' ||
          this.user.password === '' ||
          this.user.password !== this.passwordConfirmation) {
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
    height: 650px;
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
