// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  data: {
    message: '',
    logs: [],
    status: 'disconnected'
  },
  methods: {
    connect () {
      this.socket = new WebSocket('wss://echo.websocket.org')
      this.socket.onopen = () => {
        this.status = 'connected'
        this.logs.push({event: 'Connected to', data: 'wss://echo.websocket.org'})
        this.socket.onmessage = ({data}) => {
          this.logs.push({ event: 'Recieved message', data })
        }
      }
    },
    disconnect () {
      this.socket.close()
      this.status = 'disconnected'
      this.logs = []
    },
    sendMessage (e) {
      this.socket.send(this.message)
      this.logs.push({ event: 'Sent message', data: this.message })
      this.message = ''
    }
  }
})
