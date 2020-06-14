<template>
    <q-dialog v-model="open" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Novo chat</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense maxlength="40" label="Usuário de destino" v-model="username" />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancelar" v-on:click="() => this.close()"/>
          <q-btn flat label="Iniciar chat" v-on:click="() => this.closeAndChat()"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
</template>

<script>
export default {
  name: 'NewChat',
  data () {
    return {
      username: '',
      closeValue: 0
    }
  },
  props: [
    'open',
    'close'
  ],
  methods: {
    closeAndChat () {
      this.close()
      this.$router.push({ path: `/chat/${this.username}` })
    }
  }
}
</script>

<style>

</style>
