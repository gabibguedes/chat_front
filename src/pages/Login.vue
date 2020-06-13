<template>
<q-page class="flex flex-center">
    <q-card square class="shadow-24 login-card">
        <q-card-section class="bg-primary">
        <h4 class="text-h5 q-my-md title">Login</h4>
        </q-card-section>
        <q-card-section>
            <q-form class="forms">
                <q-input square clearable v-model="username" type="username" label="Username">
                    <template v-slot:prepend>
                        <q-icon name="alternate_email" />
                    </template>
                </q-input>
                <q-input square clearable v-model="password" type="password" label="Senha">
                    <template v-slot:prepend>
                        <q-icon name="lock" />
                    </template>
                </q-input>
            </q-form>
        </q-card-section>
        <q-card-actions class="q-px-lg">
            <q-btn unelevated size="lg" color="primary" class="full-width text-white" label="Entrar" v-on:click="() => $router.push({ name: 'contacts' })"/>
        </q-card-actions>
        <q-card-section class="text-center q-pa-sm">
            <button class="link-button" v-on:click="() => $router.push({ name: 'register' })">
              Ainda não está cadastrado?
            </button>
        </q-card-section>
    </q-card>
</q-page>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: ''
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
