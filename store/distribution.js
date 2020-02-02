import moment from 'moment'

export const state = () => ({
  distribution: {
    holders: [],
    updated: moment()
  }
})

export const actions = {
  async fetchHolders ({ commit }) {
    // Doc: https://github.com/bbjansen/lto-cache-api

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
  getHolders: (state) => {
    return state.distribution.holders
  }
}
