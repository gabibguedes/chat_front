<template>
  <q-page>
    <new-chat :open="openNewChat" :close="() => openNewChat = false"/>
    <q-list >
      <q-item v-for="contact in contacts" :key="contact.id" class="q-my-sm" clickable  v-on:click="() => $router.push({ name: 'chat' })" v-ripple>
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white">
            {{ contact.letter }}
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
const contacts = [{
  id: 1,
  first_name: 'Ruddy',
  last_name: 'Jedrzej',
  username: 'rjedrzej0',
  letter: 'R'
}, {
  id: 2,
  first_name: 'Mallorie',
  last_name: 'Alessandrini',
  username: 'malessandrini1',
  letter: 'M'
}, {
  id: 3,
  first_name: 'Elisabetta',
  last_name: 'Wicklen',
  username: 'ewicklen2',
  letter: 'E'
}, {
  id: 4,
  first_name: 'Seka',
  last_name: 'Fawdrey',
  username: 'sfawdrey3',
  letter: 'S'
}]

export default {
  components: {
    NewChat
  },
  data () {
    return {
      contacts,
      openNewChat: false
    }
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
