import moment from 'moment'

export const state = () => ({
  dashboard: {
    chart: {
      dataset: [],
      updated: moment().fromNow()
    },
    blocks: {
      last: [],
      updated: moment().fromNow()
    },
    unconfirmed: {
      pool: [],
      updated: moment().fromNow()
    }
  }
})

export const actions = {
  async fetchChart ({ commit }) {
    // Doc: https://github.com/bbjansen/lto-cache-api

    const url = process.env.CACHE_API + '/stats/transaction/week'
    const payload = await this.$axios.$get(url)

    commit('updateChart', payload)
  },
  async fetchBlocks ({ rootState, commit }) {
    // Doc: https://docs.ltonetwork.com/public-node

    const res = await this.$axios.$get(process.env.LB_API + '/node/status')
    const end = +res.blockchainHeight
    const start = end - process.env.LATEST_BLOCKS + 1

    const url = process.env.LB_API + '/blocks/headers/seq/' + start + '/' + end
    const payload = await this.$axios.$get(url)

    commit('updateBlocks', payload)
  },
  async fetchUnconfirmed ({ commit }) {
    // Doc: https://docs.ltonetwork.com/public-node

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
    state.dashboard.blocks.updated = moment().fromNow()
  },
  updateUnconfirmed (state, payload) {
    payload.forEach((tx) => {
      tx.fee = (+tx.fee / process.env.ATOMIC).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })
    })

    state.dashboard.unconfirmed.pool = payload
    state.dashboard.unconfirmed.updated = moment().fromNow()
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
