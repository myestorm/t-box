<template>
  <h1>{{ msg }}</h1>

  {{ receiveMessage }}

  <a-space>
    <a-button type="primary" @click="count++">count is: {{ count }}</a-button>
    <a-button type="primary" @click="sendMessage">通讯</a-button>
  </a-space>
  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>

</template>
<script>
import { ref } from 'vue'

const { ipcRenderer } = window

export default {
  props: {
    msg: {
      type: String,
      default: 'Angle'
    }
  },
  setup () {
    const count = ref(0)
    const receiveMessage = ref('')
    ipcRenderer.on('receiveMessage', (event, args)=>{
      receiveMessage.value = args
    })
    return {
      count,
      receiveMessage,
      sendMessage () {
        ipcRenderer.send('sendMessage', '我是渲染进程')
      }
    }
  }
}
</script>
<style scoped>
a {
  color: #42b983;
}
</style>
