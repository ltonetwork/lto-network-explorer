import moment from 'moment'
import { VueGlobalFunctions } from '../pages/types'

interface Transaction {
}

interface Pagination {
  descending: boolean;
  page: number;
  rowsPerPage: number;
  sortBy: string;
  totalItems: number;
  rowsPerPageItems: number[]
}

interface TransactionsState {
  transactions: {
    pagination: Pagination,
    items: Transaction[]
    updated: null | moment.Moment | string;
  }
}

export const state = () => ({
  transactions: {
    pagination: {
      descending: true,
      page: 1,
      rowsPerPage: 25,
      sortBy: 'timestamp',
      totalItems: 0,
      rowsPerPageItems: [1, 10, 25, 50, 100]
    },
    items: []
  }
})

export const actions = {
  async fetchTransactions (this: VueGlobalFunctions, { state, commit }: { state: TransactionsState; commit: any }, address: string) {
    // Doc: https://stats.lto.network/api-docs/

    return new Promise((resolve) => {
      setTimeout(async() => {

        const url: string = process.env.LB_API + '/transactions/address/' + address + '/limit/100'
        const payload = await this.$axios.$get(url)

        const data = {
          items: payload,
          address
        }

        commit('setTransactions', data)
        resolve()
      }, 1000)
    })
  }
}

export const mutations = {
  setTransactions (state: TransactionsState, payload: any,) {
    let items = payload.items[0]
    const address = payload.address
    if (items.length >= 1) {
      items.forEach((tx: any) => {
        if (tx.sender === address) {
          tx.label = 'out'
        } else if (tx.recipient === address) {
          tx.label = 'in'
        } else {
          tx.label = 'out' // Mass Tx
        }
      })
    }

    const { sortBy, descending, page, rowsPerPage } = state.transactions.pagination

    if (sortBy) {
      items = items.sort((a: any, b: any) => {
        const sortA = a[sortBy]
        const sortB = b[sortBy]

        if (descending) {
          if (sortA < sortB) return 1
          if (sortA > sortB) return -1
          return 0
        } else {
          if (sortA < sortB) return -1
          if (sortA > sortB) return 1
          return 0
        }
      })
    }

    if (rowsPerPage > 0) {
      items = items.slice((page - 1) * rowsPerPage, page * rowsPerPage)
    }

    state.transactions.items = items
    state.transactions.pagination.totalItems = payload.length
  },
  setPagination (state: TransactionsState, payload: any) {
    state.transactions.pagination = payload
    state.transactions.updated = moment()
  }
}

export const getters = {
  getTransactions: (state: TransactionsState) => {
    return state.transactions
  },
  getPagination: (state: TransactionsState) => {
    return state.transactions.pagination
  }
}
