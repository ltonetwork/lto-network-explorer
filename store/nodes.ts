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
  async fetchNodes(this: VueGlobalFunctions, { state, commit }: { state: NodeState; commit: any }) {
    const url: string = process.env.TOOLS_API + '/nodes/json'
    const payload = await this.$axios.$get(url)

    commit('setNodes', payload)
  }
}

export const mutations = {
  setNodes(state: NodeState, payload: Node[]) {
    payload.forEach((n: Node) => {
      /*
      n.updated = moment(n.updated)
      n.created = moment(n.created)
      n.uptime = n.uptime.toString().split('').map(Number)
      */
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
