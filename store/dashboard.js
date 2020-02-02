import moment from 'moment'

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
  async fetchChart ({ state, commit }) {
    // Doc: https://github.com/bbjansen/lto-cache-api

    state.dashboard.chart.updated = null

    const url = process.env.CACHE_API + '/stats/transaction/week'
    const payload = await this.$axios.$get(url)

    commit('updateChart', payload)
  },
  async fetchBlocks ({ state, commit }) {
    // Doc: https://docs.ltonetwork.com/public-node

    state.dashboard.blocks.updated = null

    const res = await this.$axios.$get(process.env.LB_API + '/node/status')
    const end = +res.blockchainHeight
    const start = end - process.env.LATEST_BLOCKS + 1

    const url = process.env.LB_API + '/blocks/headers/seq/' + start + '/' + end
    const payload = await this.$axios.$get(url)

    commit('updateBlocks', payload)
  },
  async fetchUnconfirmed ({ state, commit }) {
    // Doc: https://docs.ltonetwork.com/public-node

    state.dashboard.unconfirmed.updated = null

    const url = process.env.LB_API + '/transactions/unconfirmed'
    const payload = await this.$axios.$get(url)

    commit('updateUnconfirmed', payload)
  }
}

export const mutations = {
  updateChart (state, payload) {
    payload.forEach((d) => {
      d.period = moment(d.period)
    })

    state.dashboard.chart.dataset = payload
    state.dashboard.chart.updated = moment()
  },
  updateBlocks (state, payload) {
    payload.forEach((b) => {
      b.timestamp = moment(b.timestamp).fromNow()
    })

    state.dashboard.blocks.last = payload.reverse()
    state.dashboard.blocks.updated = moment()
  },
  updateUnconfirmed (state, payload) {
    payload.forEach((tx) => {
      tx.fee = (+tx.fee / process.env.ATOMIC).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })
    })

    state.dashboard.unconfirmed.pool = payload
    state.dashboard.unconfirmed.updated = moment()
  }
}

export const getters = {
  getChart: (state) => {
    return state.dashboard.chart
  },
  getBlocks: (state) => {
    return state.dashboard.blocks
  },
  getUnconfirmed: (state) => {
    return state.dashboard.unconfirmed
  }
}
