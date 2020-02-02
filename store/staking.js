import moment from 'moment'

export const state = () => ({
  staking: {
    generators: [],
    updated: null
  }
})

export const actions = {
  async fetchGenerators ({ state, commit }) {
    // Doc: https://github.com/bbjansen/lto-cache-api

    state.staking.updated = null

    const url = process.env.CACHE_API + '/generator/all/week'
    const payload = await this.$axios.$get(url)

    commit('updateGenerators', payload)
  }
}

export const mutations = {
  updateGenerators (state, payload) {
    payload.forEach((g) => {
      g.updated = moment(g.updated)
    })

    state.staking.generators = payload
    state.staking.updated = moment()
  }
}

export const getters = {
  getGenerators: (state) => {
    return state.staking
  }
}
