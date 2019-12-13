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
  name: 'Home',
  data () {
    return {
      message: "",
      logs: [],
      status: "disconnected"
    }
  },
  methods: {
    connect() {
      this.socket = new WebSocket("ws://localhost:8080/stats");
      this.socket.onopen = () => {
        this.status = "connected";
        this.logs.push({ event: "Connected to", data: 'wss://localhost:8080'})
        

        this.socket.onmessage = ({data}) => {
          this.logs.push({ event: "Recieved message", data });
        };
      };
    },
    disconnect() {
      this.socket.close();
      this.status = "disconnected";
      this.logs = [];
    },
    sendMessage(e) {
      this.socket.send(this.message);
      this.logs.push({ event: "Sent message", data: this.message });
      this.message = "";
    }
  }
}
</script>
<style scoped>

</style>