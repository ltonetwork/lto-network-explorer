import moment from 'moment'

export const state = () => ({
  holders: {
    updated: null,
    list: []
  }
})

export const mutations = {
  add (state, holder) {
    state.holders.list.push({
      address: holder.address,
      label: holder.label,
      url: holder.url,
      regular: holder.regular,
      generating: holder.generating,
      available: holder.available,
      effective: holder.effective,
      updated: moment(holder.updated).format('DD-MM-YY HH:MM:SS')
    })

    state.holders.updated = moment()
  },
  remove (state, holder) {
    state.holders.list.splice(state.holders.list.indexOf(holder), 1)
    state.holders.updated = moment()
  }
}

export const getters = {
  get: (state) => {
    return state.holders.list
  }
}
