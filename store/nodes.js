import moment from 'moment'

export const state = () => ({
  nodes: {
    updated: null,
    list: []
  }
})

export const mutations = {
  empty (state) {
    state.nodes.list = []
  },
  add (state, node) {
    state.nodes.list.push({
      address: node.address,
      ip: node.ip,
      port: node.port,
      name: node.name,
      app: node.app,
      version: node.version,
      updated: moment(node.updated).format('DD-MM-YY HH:MM:SS'),
      created: moment(node.created).format('DD-MM-YY HH:MM:SS'),
      height: node.height,
      p2p: node.p2p,
      api: node.api,
      uptime: node.uptime.toString().split(''),
      country: node.country,
      region: node.region,
      city: node.city,
      coordinates: node.coordinates
    })

    state.nodes.updated = moment()
  },
  async update (state, node) {
    const target = state.nodes.list.find(n => n.address === node.address)

    const url = 'http://' + node.ip + ':' + (+node.port + 1) + '/node/status'
    let height

    if (node.api === 1) {
      const res = await this.$axios.$get(url, {
        timeout: 3000
      })

      height = res.stateHeight
    } else {
      height = 'N/A'
    }

    target.height = height
    target.updated = moment().format('DD-MM-YY HH:MM:SS')
  },
  remove (state, node) {
    state.nodes.list.splice(state.nodes.list.indexOf(node), 1)
    state.nodes.updated = moment()
  }
}

export const getters = {
  get: (state) => {
    return state.nodes.list
  }
}
