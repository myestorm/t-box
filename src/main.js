import { createApp } from 'vue'
import ArcoVue from '@arco-design/web-vue'
import App from './App.vue'
import ArcoVueIcon from '@arco-design/web-vue/es/icon'
import '@arco-design/web-vue/es/index.less'

import store from './store'
import router from './router'

const app = createApp(App)
app.use(ArcoVueIcon)
app.use(ArcoVue)
app.use(store)
app.use(router)
app.mount('#app')
