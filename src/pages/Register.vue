<template>
<q-page class="flex flex-center">
    <q-card square class="shadow-24 login-card">
        <q-card-section class="bg-primary">
        <h4 class="text-h5 q-my-md title">Cadastro</h4>
        </q-card-section>
        <q-card-section>
            <q-form class="forms">
                <q-input square clearable v-model="firstName" type="text" label="Nome">
                    <template v-slot:prepend>
                        <q-icon name="person" />
                    </template>
                </q-input>
                <q-input square clearable v-model="lastName" type="text" label="Sobrenome">
                    <template v-slot:prepend>
                        <q-icon name="portrait" />
                    </template>
                </q-input>
                <q-input square clearable v-model="username" type="text" label="Username">
                    <template v-slot:prepend>
                        <q-icon name="alternate_email" />
                    </template>
                </q-input>
                <q-input square clearable v-model="password" type="password" label="Senha">
                    <template v-slot:prepend>
                        <q-icon name="lock" />
                    </template>
                </q-input>
                <q-input square clearable v-model="passwordConfirmation" type="password" label="Repita sua senha">
                    <template v-slot:prepend>
                        <q-icon name="vpn_key" />
                    </template>
                </q-input>
            </q-form>
        </q-card-section>
        <q-card-actions class="q-px-lg">
            <q-btn unelevated size="lg" color="primary" class="full-width text-white" label="Entrar" />
        </q-card-actions>
        <q-card-section class="text-center q-pa-sm">
            <button class="link-button" v-on:click="() => $router.push({ name: 'login' })">
              Já possui cadastro?
            </button>
        </q-card-section>
    </q-card>
    </q-page>
</template>

<script>
export default {
  name: 'Register',
  data () {
    return {
      firstName: '',
      lastName: '',
      username: '',
      password: '',
      passwordConfirmation: ''
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
    height: 550px;
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
