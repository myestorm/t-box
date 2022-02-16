const { ipcRenderer } = window
const prefix = 'ipcMain/'

const state = () => ({
})

const getters = {}

const actions = {
  sendMessage (_, params) {
    const { channel, msg, options = {} } = params
    return new Promise((resolve, reject) => {
      ipcRenderer.invoke(prefix + channel, msg, options).then(res => {
        const code = res.code
        if (code === 0) {
          resolve(res.data)
        } else {
          reject(res.msg)
        }
      })
    })
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
