<template>
  <div class="q-pa-md col justify-center row" style="vertical-align: bottom;">
    <div style="width: 100%; max-width: 80vw;">
      <q-chat-message
        name="me"
        :text="['hey, how are you?']"
        stamp="7 minutes ago"
        sent
        bg-color="primary"
        text-color="white"
      />
      <q-chat-message
        name="someone"
        :text="['doing fine, how r you?']"
        stamp="1 minute ago"
        bg-color="secondary"
        text-color="white"
      />
    </div>

      <q-input class="send-message" bottom-slots v-model="text" label="Mensagem" counter maxlength="12" :dense="dense">
        <template v-slot:after>
          <q-btn round dense flat icon="send" color="primary"/>
        </template>
      </q-input>
  </div>
</template>
<script>
export default {
  name: 'Chat',
  data () {
    return {
      text: ''
    }
  }
}
</script>
<style scoped>
.send-message {
    width: 90%;
    margin: 10px;
    position:fixed;
    bottom:0px;
}

</style>
