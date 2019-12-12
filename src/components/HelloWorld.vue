
<template>
  <div id="app">
    <button @click="disconnect" v-if="status === 'connected'">Disconnect</button>
    <button @click="connect" v-if="status === 'disconnected'">Connect</button> {{ status }}
    <br /><br />
    <div v-if="status === 'connected'">
      <form @submit.prevent="sendMessage" action="#">
        <input v-model="message"><button type="submit">Send Message</button>
      </form>
      <ul id="logs">
        <li v-for="log in logs" class="log">
          {{ log.event }}: {{ log.data }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
