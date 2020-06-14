<template>
  <q-page>
    <new-chat :open="openNewChat" :close="() => openNewChat = false"/>
    <q-list >
      <q-item v-for="contact in contacts" :key="contact.id" class="q-my-sm" clickable  v-on:click="() => $router.push({ path: `chat/${contact.username}` })" v-ripple>
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white">
            {{ contact.first_name.charAt(0) + contact.last_name.charAt(0) }}
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ contact.first_name + ' ' + contact.last_name }}</q-item-label>
          <q-item-label caption lines="1">{{ contact.username }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-icon name="chat_bubble" color="green" />
        </q-item-section>
      </q-item>
    </q-list>
        <q-btn round color="primary" icon="add" class="new-chat" v-on:click="() => openNewChat = true"/>
  </q-page>
</template>

<script>
import NewChat from '../components/NewChat'
import { mapGetters } from 'vuex'
import API from '../api'

export default {
  components: {
    NewChat
  },
  data () {
    return {
      contacts: [],
      openNewChat: false,
      loading: true
    }
  },
  computed: {
    ...mapGetters('userStore', ['getUser'])
  },
  created () {
    API.get('chatting_with/', {
      headers: {
        Authorization: `Token ${this.getUser.token}`
      }
    })
      .then((res) => {
        this.contacts = res.data
        this.loading = false
      })
      .catch((err) => {
        this.$q.notify({
          icon: 'error',
          color: 'negative',
          message: 'Ocorreu algum erro.'
        })
        console.log(err)
      })
  }
}
</script>

<style scoped>
.new-chat {
  position:fixed;
  bottom:0px;
  right:0px;
  margin: 20px;
  height: 50px;
  width: 50px;
}
</style>
