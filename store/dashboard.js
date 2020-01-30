import moment from 'moment'

export const state = () => ({
  dashboard: {
    updated: null,
    height: null,
    chart: []
  }
})

export const mutations = {
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
  chart: (state) => {
    return state.dashboard.chart
  }
}
