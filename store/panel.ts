import moment from 'moment'
/* TODO: Typescript does not like this import. Can't find the types file. */
// import math from 'lodash/math'
import * as _ from 'lodash'

import { VueGlobalFunctions } from '../pages/types'

interface Currency {
  btc: number;
  eth: number;
  usd: number;
  eur: number;
  gbp: number;
  cad: number;
  cny: number;
}

interface CurrencyChange {
  currency: Currency;
  relative: number;
  absolute: number;
}

interface PanelState {
  panel: {
    market: {
      price: {
        change: CurrencyChange;
        currency: Currency;
      };

      capital: {
        change: CurrencyChange;
        currency: Currency;
      };

      sparkline: unknown[];

      updated: null | moment.Moment | string;
    };

    nodes: {
      active: number;
      updated: null | moment.Moment | string;
    };

    staking: {
      total: number;
      updated: null | moment.Moment | string;
    };

    burned: {
      total: number;
      updated: null | moment.Moment | string;
    };

    network: {
      height: number;
      updated: null | moment.Moment | string;
    };
  };
}

interface MarketPayload {
  market_data: {
    price_change_percentage_24h: number;
    price_change_24h: number;
    price_change_24h_in_currency: Currency;
    current_price: Currency;
    market_cap_change_24h_in_currency: Currency;
    market_cap: Currency;
    sparkline_7d: {
      price: unknown[];
    };
  };

  market_cap_change_percentage_24h: number;

  market_cap_change_24h: number;
}

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
    burned: {
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
  async fetchMarket(
    this: VueGlobalFunctions,
    { state, commit }: { state: PanelState; commit: any }
  ) {
    // Doc: https://www.coingecko.com/api/documentations/v3

    // state.state.panel.market.updated = null

    const url =
      'https://api.coingecko.com/api/v3/coins/lto-network?localization=false&tickers=true&market_data=true&community_data=false&developer_data=false&sparkline=true'
    const payload = await this.$axios.$get(url)

    commit('updateMarket', payload)
  },
  async fetch(
    this: VueGlobalFunctions,
    { state, commit }: { state: PanelState; commit: any }
  ) {
    // state.state.panel.nodes.updated = null

    const url = process.env.CACHE_API + '/stats/nodes'
    const payload = await this.$axios.$get(url)

    commit('updateNodes', payload)
  },
  async fetchStaking(
    this: VueGlobalFunctions,
    { state, commit }: { state: PanelState; commit: any }
  ) {
    // Doc: https://github.com/bbjansen/lto-cache-api

    // state.state.panel.staking.updated = null

    const url: string = process.env.CACHE_API + '/generator/staking/weekly'
    const payload = await this.$axios.$get(url)

    commit('updateStaking', payload)
  },
  async fetchBurned(
    this: VueGlobalFunctions,
    { state, commit }: { state: PanelState; commit: any }
  ) {
    // Doc: https://github.com/bbjansen/lto-cache-api

    // state.state.panel.staking.updated = null

    const url: string = process.env.CACHE_API + '/stats/burned/total'
    const payload = await this.$axios.$get(url)

    commit('updateBurned', payload)
  },
  async fetchNetwork(
    this: VueGlobalFunctions,
    { state, commit }: { state: PanelState; commit: any }
  ) {
    // Doc: https://docs.ltonetwork.com/public-node

    // state.state.panel.network.updated = null

    const url: string = process.env.LB_API + '/node/status'
    const payload = await this.$axios.$get(url)

    commit('updateNetwork', payload)
  }
}

export const mutations = {
  updateMarket(state: PanelState, payload: MarketPayload) {
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
  updateNodes(state: PanelState, payload: unknown[]) {
    state.panel.nodes.active = payload.length
    state.panel.nodes.updated = moment()
  },
  updateStaking(state: PanelState, payload: unknown[]) {
    state.panel.staking.total = _.sumBy(payload, function(o: any) {
      return o.balance
    })
    state.panel.staking.updated = moment()
  },
  updateBurned(state: PanelState, payload: number) {
    state.panel.burned.total = payload
    state.panel.burned.updated = moment()
  },
  updateNetwork(state: PanelState, payload: unknown) {
    state.panel.network.height = (payload as any).blockchainHeight
    state.panel.network.updated = moment()
  }
}

export const getters = {
  getMarket: (state: PanelState) => {
    return state.panel.market
  },
  getNodes: (state: PanelState) => {
    return state.panel.nodes
  },
  getStaking: (state: PanelState) => {
    return state.panel.staking
  },
  getBurn: (state: PanelState) => {
    return state.panel.burned
  },
  getNetwork: (state: PanelState) => {
    return state.panel.network
  }
}
