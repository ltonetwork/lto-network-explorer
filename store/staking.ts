import moment from 'moment'

import { VueGlobalFunctions } from '../pages/types'

interface StakingState {
  staking: {
    generators: unknown[];
    updated: null | moment.Moment;
  }
}

export const state = () => ({
  staking: {
    generators: [],
    updated: null
  }
})

export const actions = {
  async fetchGenerators (this: VueGlobalFunctions, { state, commit }: { state: StakingState, commit: any }) {
    // Doc: https://github.com/bbjansen/lto-cache-api

    const url: string = process.env.CACHE_API + '/generator/all/week'
    const payload = await this.$axios.$get(url)

    commit('setGenerators', payload)
  }
}

export const mutations = {
  setGenerators (state: StakingState, payload: unknown[]) {
    payload.forEach((g: any) => {
      g.updated = moment(g.updated)
    })

    state.staking.generators = payload
    state.staking.updated = moment()
  }
}

export const getters = {
  getGenerators: (state: StakingState) => {
    return state.staking
  }
}
