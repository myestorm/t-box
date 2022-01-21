const state = () => ({
  all: []
})

const getters = {}

const actions = {
  async getAllProducts ({ commit }) {
    commit('setProducts', products)
  }
}

const mutations = {
  setProducts (state, products) {
    state.all = products
  },

  decrementProductInventory (state, { id }) {
    const product = state.all.find(product => product.id === id)
    product.inventory--
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
