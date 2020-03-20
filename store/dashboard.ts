import moment from 'moment'
import '@nuxtjs/axios'

import {Block, Transaction, VueGlobalFunctions} from '../pages/types'

interface DashboardState {
  dashboard: {
    chart: {
      filter: string;
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

interface Chart {
  date: moment.Moment;
  transactions: number;
}

export const state = () => ({
  dashboard: {
    chart: {
      filter: 'week',
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
  async fetchChart(this: VueGlobalFunctions, {state, commit}: { state: DashboardState, commit: any }, filters: any) {
    // Doc: https://stats.lto.network/api-docs/

    commit('resetUpdated')

    const url: string = process.env.STATS_API + '/transactions?startdate=' + filters.start + '&enddate=' + filters.end + '&granularity=' + filters.granularity
    const payload = await this.$axios.$get(url)

    commit('setFilter', filters.type)
    commit('setChart', payload)
  },
  async fetchBlocks(this: VueGlobalFunctions, {state, commit}: { state: DashboardState, commit: any }) {

    // Doc: https://docs.ltonetwork.com/public-node
    const res: any = await this.$axios.$get(process.env.LB_API + '/node/status')
    const end: number = +res.blockchainHeight
    const start: number = end - Number(process.env.LATEST_BLOCKS) + 1

    const url: string = process.env.LB_API + '/blocks/headers/seq/' + start + '/' + end
    const payload = await this.$axios.$get(url)

    commit('setBlocks', payload)
  },
  async fetchUnconfirmed(this: VueGlobalFunctions, {state, commit}: { state: DashboardState, commit: any }) {
    // Doc: https://docs.ltonetwork.com/public-node

    const url: string = process.env.LB_API + '/transactions/unconfirmed'
    const payload = await this.$axios.$get(url)

    commit('setUnconfirmed', payload)
  }
}

export const mutations = {
  resetUpdated(state: DashboardState) {
    state.dashboard.chart.updated = null
  },
  setFilter(state: DashboardState, filter: string) {
    state.dashboard.chart.filter = filter
  },
  setChart(state: DashboardState, payload: Chart[]) {

    payload.forEach((d: Chart) => {
      d.date = moment(d.date)
    })

    state.dashboard.chart.dataset = payload
    state.dashboard.chart.updated = moment()
  },
  setBlocks(state: DashboardState, payload: Block[]) {
    payload.map((b) => {
      b.timestamp = moment(b.timestamp).format('HH:mm:ss')
    })

    state.dashboard.blocks.last = payload.reverse()
    state.dashboard.blocks.updated = moment()
  },
  setUnconfirmed(state: DashboardState, payload: Transaction[]) {
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
