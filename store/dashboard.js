import moment from 'moment'
// import axios from 'axios'

export const state = () => ({
  dashboard: {
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
      updated: 0
    },
    updated: moment(),
    height: 0,
    chart: []
  }
})

export const actions = {
  async fetchMarket ({ commit }) {
    // Doc: https://www.coingecko.com/api/documentations/v3

    const url = 'https://api.coingecko.com/api/v3/coins/lto-network?localization=false&tickers=true&market_data=true&community_data=false&developer_data=false&sparkline=true'
    const payload = await this.$axios.$get(url)

    commit('updateMarket', payload)
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
      updated: moment()
    }

    state.dashboard.market = data
  },
  empty (state) {
    state.dashboard.chart = []
  },
  chart (state, data) {
    state.dashboard.chart.push({
      period: moment(data.period),
      count: +data.count
    })

    state.dashboard.updated = moment()
  }
}

export const getters = {
  getMarket: (state) => {
    return state.dashboard.market
  },
  chart: (state) => {
    return state.dashboard.chart
  }
}
