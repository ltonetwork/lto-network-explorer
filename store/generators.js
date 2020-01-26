import moment from 'moment'

export const state = () => ({
  generators: {
    updated: null,
    list: []
  }
})

export const mutations = {
  empty (state) {
    state.generators.list = []
  },
  add (state, generator) {
    state.generators.list.push({
      generator: generator.generator,
      label: generator.label,
      url: generator.url,
      payout: 1,
      pool: generator.pool,
      blocks: generator.blocks,
      earnings: generator.earnings,
      share: generator.share,
      updated: moment(generator.updated).format('DD-MM-YY HH:MM:SS')
    })

    state.generators.updated = moment()
  },
  remove (state, generator) {
    state.generators.list.splice(state.generators.list.indexOf(generator), 1)
    state.generators.updated = moment()
  }
}

export const getters = {
  get: (state) => {
    return state.generators.list
  }
}
