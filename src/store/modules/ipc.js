const { ipcRenderer } = window
const prefix = 'ipcMain/'

const state = () => ({
})

const getters = {}

const actions = {
  sendMessage (_, params) {
    const { channel, msg, options = {} } = params
    return ipcRenderer.invoke(prefix + channel, msg, options)
  }
}

const mutations = {
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
