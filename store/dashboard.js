import moment from 'moment'

export const state = () => ({
  dashboard: {
    updated: null,
    height: null,
    chart: []
  }
})

export const mutations = {
  height (state, height) {
    state.dashboard.height = +height
    state.dashboard.updated = moment()
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
  height: (state) => {
    return state.dashboard.height
  },
  chart: (state) => {
    return state.dashboard.chart
  }
}
