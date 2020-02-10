import moment from 'moment'

import { VueGlobalFunctions } from '../pages/types'

interface Node {
  updated: moment.Moment;
  created: moment.Moment;
  uptime: string[];
}

interface NodeState {
  nodes: {
    active: Node[];
    updated: null | moment.Moment | string;
  }
}

export const state = () => ({
  nodes: {
    active: [],
    updated: null
  }
})

export const actions = {
  async fetchNodes (this: VueGlobalFunctions, { state, commit }: { state: NodeState, commit: any }) {
    // Doc: https://github.com/bbjansen/lto-network-monitor

    // state.state.nodes.updated = null

    const url: string = 'https://network.lto.cloud/v1/nodes/all'
    const payload = await this.$axios.$get(url)

    commit('updateNodes', payload)
  }
}

export const mutations = {
  updateNodes (state: NodeState, payload: Node[]) {
    payload.forEach((n: Node) => {
      n.updated = moment(n.updated)
      n.created = moment(n.created)
      n.uptime = n.uptime.toString().split('')
    })

    state.nodes.active = payload
    state.nodes.updated = moment()
  }
}

export const getters = {
  getNodes: (state: NodeState) => {
    return state.nodes
  }
}
