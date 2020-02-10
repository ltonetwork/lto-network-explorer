import moment from 'moment'

export const state = () => ({
  nodes: {
    active: [],
    updated: null
  }
})

export const actions = {
  async fetchNodes ({ state, commit }) {
    // Doc: https://github.com/bbjansen/lto-network-monitor

    // state.state.nodes.updated = null

    const url: string = 'https://network.lto.cloud/v1/nodes/all'
    const payload = await this.$axios.$get(url)

    commit('updateNodes', payload)
  }
}

export const mutations = {
  updateNodes (state, payload) {
    payload.forEach((n) => {
      n.updated = moment(n.updated)
      n.created = moment(n.created)
      n.uptime = n.uptime.toString().split('')
    })

    state.nodes.active = payload
    state.nodes.updated = moment()
  }
}

export const getters = {
  getNodes: (state) => {
    return state.nodes
  }
}
