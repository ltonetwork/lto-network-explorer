import moment from 'moment'

export const state = () => ({
  distribution: {
    top: {
      holders: [],
      updated: null
    },
    bridge: {
      volume: [],
      toll: {
        burn_rate: 0,
        burned: 0
      },
      updated: null
    },
    supply: {
      stats: {
        initial_supply: 0,
        total_supply: 0,
        burned_supply: 0,
        circulating_mainnet: 0,
        private_supply_mainnet: 0,
        circulating_erc20: 0,
        private_supply_erc20: 0
      },
      updated: null
    }
  }
})

export const actions = {
  async fetchTop ({ state, commit }) {
    // Doc: https://github.com/bbjansen/lto-cache-api

    const url = process.env.CACHE_API + '/address/top/100'
    const payload = await this.$axios.$get(url)

    commit('updateTop', payload)
  },
  async fetchSupply ({ state, commit }) {
    // Doc: https://github.com/bbjansen/lto-cache-api

    const url = process.env.BRIDGE_API + '/stats/token-supply'
    const payload = await this.$axios.$get(url)

    commit('updateSupply', payload)
  },
  async fetchBridge ({ state, commit }) {
    // Doc: https://github.com/bbjansen/lto-cache-api

    const url = process.env.BRIDGE_API + '/stats'
    const payload = await this.$axios.$get(url)

    commit('updateBridge', payload)
  }
}

export const mutations = {
  updateTop (state, payload) {
    payload.forEach((h) => {
      h.updated = moment(h.updated)
    })

    state.distribution.top.holders = payload
    state.distribution.top.updated = moment()
  },
  updateSupply (state, payload) {
    state.distribution.supply.stats = payload
    state.distribution.supply.updated = moment()
  },
  updateBridge (state, payload) {
    state.distribution.bridge.volume = payload.volume
    state.distribution.bridge.toll = { burn_rate: payload.burn_rate, burned: payload.burned }
    state.distribution.bridge.updated = moment()
  }
}

export const getters = {
  getTop: (state) => {
    return state.distribution.top
  },
  getSupply: (state) => {
    return state.distribution.supply
  },
  getBridge: (state) => {
    return state.distribution.bridge
  }
}
