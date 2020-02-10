import moment from 'moment'
import '@nuxtjs/axios'

import { Transaction, Block, VueGlobalFunctions } from '../pages/types'

interface DashboardState {
  dashboard: {
    chart: { 
      dataset: unknown[];
      updated: null | moment.Moment;
    };

    blocks: {
      last: Block[];
      updated: null | moment.Moment;
    }

    unconfirmed: {
      pool: Transaction[];
      updated: null | moment.Moment;
    }
  }
}

export const state = () => ({
  dashboard: {
    chart: {
      dataset: [],
      updated: null
    },
    blocks: {
      last: [],
      updated: null
    },
    unconfirmed: {
      pool: [],
      updated: null
    }
  }
})

export const actions = {
  async fetchChart (this: VueGlobalFunctions, { state, commit }: { state: DashboardState, commit: any }) {
    // Doc: https://github.com/bbjansen/lto-cache-api

    // state.dashboard.chart.updated = null

    const url: string = process.env.CACHE_API + '/stats/transaction/week'
    const payload = await this.$axios.$get(url)

    commit('updateChart', payload)
  },
  async fetchBlocks (this: VueGlobalFunctions, { state, commit }: { state: DashboardState, commit: any }) {
    // Doc: https://docs.ltonetwork.com/public-node

    // state.dashboard.blocks.updated = null

    const res: any = await this.$axios.$get(process.env.LB_API + '/node/status')
    const end: number = +res.blockchainHeight
    const start: number = end - Number(process.env.LATEST_BLOCKS) + 1

    const url: string = process.env.LB_API + '/blocks/headers/seq/' + start + '/' + end
    const payload = await this.$axios.$get(url)

    commit('updateBlocks', payload)
  },
  async fetchUnconfirmed (this: VueGlobalFunctions, { state, commit }: { state: DashboardState, commit: any }) {
    // Doc: https://docs.ltonetwork.com/public-node

    // state.dashboard.unconfirmed.updated = null

    const url: string = process.env.LB_API + '/transactions/unconfirmed'
    const payload = await this.$axios.$get(url)

    commit('updateUnconfirmed', payload)
  }
}

export const mutations = {
  updateChart (state: DashboardState, payload: unknown[]) {
    payload.forEach((d: any) => {
      d.period = moment(d.period)
    })

    state.dashboard.chart.dataset = payload
    state.dashboard.chart.updated = moment()
  },
  updateBlocks (state: DashboardState, payload: Block[]) {
    payload.forEach((b) => {
      b.timestamp = moment(b.timestamp).fromNow()
    })

    state.dashboard.blocks.last = payload.reverse()
    state.dashboard.blocks.updated = moment()
  },
  updateUnconfirmed (state: DashboardState, payload: Transaction[]) {
    state.dashboard.unconfirmed.pool = payload
    state.dashboard.unconfirmed.updated = moment()
  }
}

export const getters = {
  getChart: (state: DashboardState) => {
    return state.dashboard.chart
  },
  getBlocks: (state: DashboardState) => {
    return state.dashboard.blocks
  },
  getUnconfirmed: (state: DashboardState) => {
    return state.dashboard.unconfirmed
  }
}
