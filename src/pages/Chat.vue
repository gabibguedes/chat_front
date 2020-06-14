<template>
    <div class="justify-center row scroll">
        <div class="title-div">
          <h1 class="text-h5 q-my-md title">{{fullName}}</h1>
        </div>
      <div v-if="!loading" class="q-pa-md  messages">
          <q-chat-message
            v-for="message in messages" v-bind:key="message.id"
            :name=" message.sender === getUser.username ? 'Eu' : name"
            :text="[message.message]"
            :stamp="message.timestamp"
            :sent="message.sender === getUser.username"
            :bg-color=" message.sender === getUser.username ? 'primary' : 'secondary'"
            text-color="white"
          />
      </div>
      <q-spinner-ball v-else class="fixed-center text-center" color="primary" size="5.5em"/>
      <div class="send-message" >
      <q-input bottom-slots v-model="text" label="Mensagem" counter maxlength="280">
        <template v-slot:after>
          <q-btn :disabled="text === ''" @click="sendMessage()" round dense flat icon="send" color="primary"/>
        </template>
      </q-input>
      </div>
    </div>
</template>
<script>
import API from '../api'
import { mapGetters } from 'vuex'

export default {
  name: 'Chat',
  data () {
    return {
      fullName: '',
      name: '',
      text: '',
      loading: true,
      messages: []
    }
  },
  computed: {
    ...mapGetters('userStore', ['getUser']),
    username () {
      return this.$route.params.username
    }
  },
  async created () {
    await this.getUserToChat()
    await this.getMessages()
    this.loading = false
  },
  mounted () {
    this.scrollToEnd()
  },
  updated () {
    this.scrollToEnd()
  },
  methods: {
    showTime (dateString) {
      const date = new Date(dateString)
      return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    },
    scrollToEnd () {
      var container = document.querySelector('.scroll')
      var scrollHeight = container.scrollHeight
      container.scrollTop = scrollHeight
    },
    getMessages () {
      API.get(`/messages/?chat_with=${this.username}`, {
        headers: {
          Authorization: `Token ${this.getUser.token}`
        }
      })
        .then(res => {
          this.messages = res.data
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    getUserToChat () {
      API.get(`/users/${this.username}/`, {
        headers: {
          Authorization: `Token ${this.getUser.token}`
        }
      })
        .then(res => {
          console.log(res.data)
          this.fullName = res.data.first_name + ' ' + res.data.last_name
          this.name = res.data.first_name
        })
        .catch(err => {
          if (err.response.status === 500) {
            this.$q.notify({
              icon: 'error',
              color: 'negative',
              message: 'Usuário não existe'
            })
            this.$router.push({ name: 'contacts' })
          }
          console.log(err.response)
        })
    },
    sendMessage () {
      if (this.text !== '') {
        API.post('/messages/', {
          receiver: this.username,
          message: this.text
        }, {
          headers: {
            Authorization: `Token ${this.getUser.token}`
          }
        })
          .then((res) => {
            this.text = ''
            this.getMessages()
          })
          .catch((err) => {
            this.$q.notify({
              icon: 'error',
              color: 'negative',
              message: 'Falha ao enviar a mensagem'
            })
            console.log(err)
          })
      }
    }
  }
}
</script>
<style scoped>
.send-message {
    width: 100%;
    padding: 10px;
    position:fixed;
    bottom:0px;
    z-index: 1;
    background-color: white;
}
.title {
  margin-top: 50px;
  margin-left: 20px;
  font-weight: 15px;
}
.title-div {
  top: 0px;
  position:fixed;
  width: 100%;
  z-index: 1;
  background-color: white;
  padding: 5px;
}

.messages {
  display: flex;
  flex-direction: column-reverse;
  width: 100%;
  max-width: 80vw;
  margin-top: 60px;
  margin-bottom: 100px;
}

.scroll {
  overflow: scroll;
  height: 90vh;
}

</style>
