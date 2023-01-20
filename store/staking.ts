import moment from 'moment'

import { VueGlobalFunctions } from '../pages/types'
import communityNodes from '../data/communityNodes.json'
import otherNodes from '../data/otherNodes.json'
import testnetNodes from '../data/testnetNodes.json'

interface StakingState {
  staking: {
    generators: unknown[];
    updated: null | moment.Moment;
  };
}

export const state = () => ({
  staking: {
    generators: [],
    updated: null
  }
})

const labelMap = new Map(
  (process.env.NETWORK_ID === 'T' ? testnetNodes.nodes : [...communityNodes.nodes, ...otherNodes.nodes])
    .map((node: {address: string; name: string; sharing?: string; payoutSchedule?: string}) => [
      node.address,
      { label: node.name, payout: node.sharing ? `${node.sharing} | ${node.payoutSchedule}}` : undefined }
    ])
)

const injectLabels = (generators: { generator: string }[]) => generators.map(entry => ({
  ...entry,
  ...(labelMap.get(entry.generator) || {})
}))

export const actions = {
  async fetchGenerators(this: VueGlobalFunctions, { state, commit }: { state: StakingState; commit: any }) {
    const url: string = process.env.TOOLS_API + '/' + process.env.GENERATORS + '/json'
    const payload = await this.$axios.$get(url) as any

    commit('setGenerators', injectLabels(payload))
  }
}

export const mutations = {
  setGenerators(state: StakingState, payload: unknown[]) {
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
