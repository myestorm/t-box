import { createStore } from 'vuex'

import users from './modules/users'
import ipc from './modules/ipc'

export default createStore({
  modules: {
    users,
    ipc
  }
})
