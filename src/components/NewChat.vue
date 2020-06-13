<template>
    <q-dialog v-model="open" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Novo chat</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense v-model="username" autofocus @keyup.enter="prompt = false" />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancelar" v-close-popup />
          <q-btn flat label="Iniciar chat" v-on:click="() => $router.push({ name: 'chat' })"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
</template>

<script>
export default {
  name: 'NewChat',
  data () {
    return {
      username: ''
    }
  },
  props: [
    'open'
  ]
}
</script>

<style>

</style>
