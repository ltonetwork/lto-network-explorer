import moment from 'moment'

import { VueGlobalFunctions } from '../pages/types'

interface Bridge {
  volume: unknown[];
  toll: {
    burn_rate: number;
    burned: number;
  };
  updated: null | moment.Moment | string;
}

interface Supply {
  initial_supply: number;
  total_supply: number;
  burned_supply: number;
  circulating_mainnet: number;
  private_supply_mainnet: number;
  circulating_erc20: number;
  private_supply_erc20: number;
}

interface DistributionState {
  distribution: {
    top: {
      holders: unknown[];
      updated: null | moment.Moment | string;
    };

    bridge: {
      volume: unknown[];
      toll: {
        burn_rate: number;
        burned: number;
      };
      updated: null | moment.Moment | string;
    };

    supply: {
      stats: Supply;
      updated: null | moment.Moment | string;
    };
  };
}

export const state = () => ({
  distribution: {
    top: {
      holders: [],
      updated: null
    },
    bridge: {
      volume: [],
      toll: {
        burn_rate: 0,
        burned: 0
      },
      updated: null
    },
    supply: {
      stats: {
        initial_supply: 0,
        total_supply: 0,
        burned_supply: 0,
        circulating_mainnet: 0,
        private_supply_mainnet: 0,
        circulating_erc20: 0,
        private_supply_erc20: 0
      },
      updated: null
    }
  }
})

export const actions = {
  async fetchTop (this: VueGlobalFunctions, { state, commit }: { state: DistributionState; commit: any }) {
    // Doc: https://github.com/bbjansen/lto-cache-api

    const url: string = process.env.CACHE_API + '/address/top/100'
    const payload = await this.$axios.$get(url)

    commit('setTop', payload)
  },
  async fetchSupply (this: VueGlobalFunctions, { state, commit }: { state: DistributionState; commit: any }) {
    // Doc: https://github.com/bbjansen/lto-cache-api

    const url: string = process.env.BRIDGE_API + '/stats/token-supply'
    const payload = await this.$axios.$get(url)

    commit('setSupply', payload)
  },
  async fetchBridge (this: VueGlobalFunctions, { state, commit }: { state: DistributionState; commit: any }) {
    // Doc: https://github.com/bbjansen/lto-cache-api

    const url: string = process.env.BRIDGE_API + '/stats'
    const payload = await this.$axios.$get(url)

    commit('setBridge', payload)
  }
}

export const mutations = {
  setTop (state: DistributionState, payload: unknown[]) {
    payload.forEach((h: any) => {
      h.updated = moment(h.updated)
    })

    state.distribution.top.holders = payload
    state.distribution.top.updated = moment()
  },
  setSupply (state: DistributionState, payload: Supply) {
    state.distribution.supply.stats = payload
    state.distribution.supply.updated = moment()
  },
  setBridge (state: DistributionState, payload: any) {
    state.distribution.bridge.volume = payload.volume
    state.distribution.bridge.toll = { burn_rate: payload.burn_rate, burned: payload.burned }
    state.distribution.bridge.updated = moment()
  }
}

export const getters = {
  getTop: (state: DistributionState) => {
    return state.distribution.top
  },
  getSupply: (state: DistributionState) => {
    return state.distribution.supply
  },
  getBridge: (state: DistributionState) => {
    return state.distribution.bridge
  }
}
