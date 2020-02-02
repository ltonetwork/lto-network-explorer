import moment from 'moment'
import math from 'lodash/math'

export const state = () => ({
  panel: {
    market: {
      price: {
        change: {
          relative: 0,
          absolute: 0,
          currency: {
            btc: 0,
            eth: 0,
            usd: 0,
            eur: 0,
            gbp: 0,
            cad: 0,
            cny: 0
          }
        },
        currency: {
          btc: 0,
          eth: 0,
          usd: 0,
          eur: 0,
          gbp: 0,
          cad: 0,
          cny: 0
        }
      },
      capital: {
        change: {
          relative: 0,
          absolute: 0,
          currency: {
            btc: 0,
            eth: 0,
            usd: 0,
            eur: 0,
            gbp: 0,
            cad: 0,
            cny: 0
          }
        },
        currency: {
          btc: 0,
          eth: 0,
          usd: 0,
          eur: 0,
          gbp: 0,
          cad: 0,
          cny: 0
        }
      },
      sparkline: [],
      updated: null
    },
    nodes: {
      active: 0,
      updated: null
    },
    staking: {
      total: 0,
      updated: null
    },
    network: {
      height: 0,
      updated: null
    }
  }
})

export const actions = {
  async fetchMarket ({ commit }) {
    // Doc: https://www.coingecko.com/api/documentations/v3

    state.market.updated = null

    const url = 'https://api.coingecko.com/api/v3/coins/lto-network?localization=false&tickers=true&market_data=true&community_data=false&developer_data=false&sparkline=true'
    const payload = await this.$axios.$get(url)

    commit('updateMarket', payload)
  },
  async fetchNodes ({ commit }) {
    // Doc: https://github.com/bbjansen/lto-network-monitor

    state.nodes.updated = null

    const url = 'https://network.lto.cloud/v1/nodes/all'
    const payload = await this.$axios.$get(url)

    commit('updateNodes', payload)
  },
  async fetchStaking ({ commit }) {
    // Doc: https://github.com/bbjansen/lto-cache-api

    state.staking.updated = null

    const url = process.env.CACHE_API + '/generator/all/week'
    const payload = await this.$axios.$get(url)

    commit('updateStaking', payload)
  },
  async fetchNetwork ({ commit }) {
    // Doc: https://docs.ltonetwork.com/public-node

    state.network.updated = null

    const url = process.env.LB_API + '/node/status'
    const payload = await this.$axios.$get(url)

    commit('updateNetwork', payload)
  }
}

export const mutations = {
  updateMarket (state, payload) {
    const data = {
      price: {
        change: {
          relative: payload.market_data.price_change_percentage_24h,
          absolute: payload.market_data.price_change_24h,
          currency: {
            btc: payload.market_data.price_change_24h_in_currency.btc,
            eth: payload.market_data.price_change_24h_in_currency.eth,
            usd: payload.market_data.price_change_24h_in_currency.usd,
            eur: payload.market_data.price_change_24h_in_currency.eur,
            gbp: payload.market_data.price_change_24h_in_currency.gbp,
            cad: payload.market_data.price_change_24h_in_currency.cad,
            cny: payload.market_data.price_change_24h_in_currency.cny
          }
        },
        currency: {
          btc: payload.market_data.current_price.btc,
          eth: payload.market_data.current_price.eth,
          usd: payload.market_data.current_price.usd,
          eur: payload.market_data.current_price.eur,
          gbp: payload.market_data.current_price.gbp,
          cad: payload.market_data.current_price.cad,
          cny: payload.market_data.current_price.cny
        }
      },
      capital: {
        change: {
          relative: payload.market_cap_change_percentage_24h,
          absolute: payload.market_cap_change_24h,
          currency: {
            btc: payload.market_data.market_cap_change_24h_in_currency.btc,
            eth: payload.market_data.market_cap_change_24h_in_currency.eth,
            usd: payload.market_data.market_cap_change_24h_in_currency.usd,
            eur: payload.market_data.market_cap_change_24h_in_currency.eur,
            gbp: payload.market_data.market_cap_change_24h_in_currency.gbp,
            cad: payload.market_data.market_cap_change_24h_in_currency.cad,
            cny: payload.market_data.market_cap_change_24h_in_currency.cny
          }
        },
        currency: {
          btc: payload.market_data.market_cap.btc,
          eth: payload.market_data.market_cap.eth,
          usd: payload.market_data.market_cap.usd,
          eur: payload.market_data.market_cap.eur,
          gbp: payload.market_data.market_cap.gbp,
          cad: payload.market_data.market_cap.cad,
          cny: payload.market_data.market_cap.cny
        }
      },
      sparkline: payload.market_data.sparkline_7d.price,
      updated: moment().fromNow()
    }

    state.panel.market = data
  },
  updateNodes (state, payload) {
    state.panel.nodes.active = payload.length
    state.panel.nodes.updated = moment()
  },
  updateStaking (state, payload) {
    state.panel.staking.total = math.sumBy(payload, function (o) { return o.pool })
    state.panel.staking.updated = moment()
  },
  updateNetwork (state, payload) {
    state.panel.network.height = payload.blockchainHeight
    state.panel.network.updated = moment()
  }
}

export const getters = {
  getMarket: (state) => {
    return state.panel.market
  },
  getNodes: (state) => {
    return state.panel.nodes
  },
  getStaking: (state) => {
    return state.panel.staking
  },
  getNetwork: (state) => {
    return state.panel.network
  }
}
