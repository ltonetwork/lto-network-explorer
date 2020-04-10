import moment from 'moment'
import { VueGlobalFunctions } from '../pages/types'

interface Node {
  address: keyof typeof Node;
  ip: string;
  port: number;
  name: string;
  app: string;
  version: string;
  updated: moment.Moment;
  created: moment.Moment;
  height: number;
  p2p: number;
  api: number;
  uptime: number[];
  country: string;
  region: string;
  city: string;
  coordinates: string;
}

interface NodeState {
  nodes: {
    active: Node[];
    updated: null | moment.Moment | string;
  };
}

export const state = () => ({
  nodes: {
    active: [],
    updated: null
  }
})

export const actions = {
  async fetchNodes (this: VueGlobalFunctions, { state, commit }: { state: NodeState; commit: any }) {
    // Doc: https://github.com/bbjansen/lto-network-monitor

    const url: string = process.env.NETWORK_API + '/nodes/all'
    const payload = await this.$axios.$get(url)

    commit('setNodes', payload)
  }
}

export const mutations = {
  setNodes (state: NodeState, payload: Node[]) {
    payload.forEach((n: Node) => {
      n.updated = moment(n.updated)
      n.created = moment(n.created)
      n.uptime = n.uptime.toString().split('').map(Number)
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
