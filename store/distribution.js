import moment from 'moment'

export const state = () => ({
  distribution: {
    holders: [],
    updated: null
  }
})

export const actions = {
  async fetchHolders ({ state, commit }) {
    // Doc: https://github.com/bbjansen/lto-cache-api

    // state.state.distribution.updated = null

    const url = process.env.CACHE_API + '/address/top/100'
    const payload = await this.$axios.$get(url)

    commit('updateHolders', payload)
  }
}

export const mutations = {
  updateHolders (state, payload) {
    payload.forEach((h) => {
      h.updated = moment(h.updated)
    })

    state.distribution.holders = payload
    state.distribution.updated = moment()
  }
}

export const getters = {
  getDistribution: (state) => {
    return state.distribution
  }
}
