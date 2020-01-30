<template>
  <div>
    <Panel />
    <v-row>
      <v-col>
        <v-card
          :loading="!loaded"
        >
          <v-card-title class="secondary--text">
            <span class="mr-2 lto-node" />
            {{ $t('nodes.title') }}
          </v-card-title>
          <v-sheet>
            <v-card-text class="pt-0">
              <v-data-table
                :headers="nodesTable"
                :items="nodes"
                :sort-by="['height']"
                :sort-desc="[true]"
                :expanded.sync="expanded"
                :items-per-page="20"
                single-expand
                show-expand
                item-key="address"
                class="secondary--text"
              >
                >
                <template v-slot:expanded-item="{ headers, item }">
                  <td :colspan="headers.length" style="background-color:#F4F7FB;">
                    <v-simple-table style="background-color:#F4F7FB;">
                      <tbody>
                        <tr>
                          <th class="text-left grey--text" width="100px">
                            Country
                          </th>
                          <td class="secondary--text" style="border: 0px;">
                            {{ item.country }}
                          </td>
                        </tr>
                        <tr>
                          <th class="text-left grey--text" width="100px">
                            Region
                          </th>
                          <td class="secondary--text" style="border: 0px;">
                            {{ item.region }}
                          </td>
                        </tr>
                        <tr>
                          <th class="text-left grey--text" width="100px">
                            City
                          </th>
                          <td class="secondary--text" style="border: 0px;">
                            {{ item.city }}
                          </td>
                        </tr>
                        <tr>
                          <th class="text-left grey--text" width="100px">
                            Coordinates
                          </th>
                          <td class="secondary--text" style="border: 0px;">
                            {{ item.coordinates }}
                          </td>
                        </tr>
                        <tr>
                          <th class="text-left grey--text" width="100px">
                            Version
                          </th>
                          <td class="secondary--text" style="border: 0px;">
                            {{ item.version }}
                          </td>
                        </tr>
                        <tr>
                          <th class="text-left grey--text" width="100px">
                            App
                          </th>
                          <td class="secondary--text" style="border: 0px;">
                            {{ item.app }}
                          </td>
                        </tr>
                        <tr>
                          <th class="text-left grey--text" width="100px">
                            First Seen
                          </th>
                          <td class="secondary--text" style="border: 0px;">
                            {{ item.created }}
                          </td>
                        </tr>
                        <tr>
                          <th class="text-left grey--text" width="100px">
                            Last Seen
                          </th>
                          <td class="secondary--text" style="border: 0px;">
                            {{ item.updated }}
                          </td>
                        </tr>
                      </tbody>
                    </v-simple-table>
                  </td>
                </template>

                <template v-slot:header.name="{ header }">
                  <span class="font-weight-regular grey--text">{{ header.text }}</span>
                </template>

                <template v-slot:header.address="{ header }">
                  <span class="font-weight-regular grey--text">{{ header.text }}</span>
                </template>

                <template v-slot:header.height="{ header }">
                  <span class="font-weight-regular grey--text">{{ header.text }}</span>
                </template>

                <template v-slot:header.version="{ header }">
                  <span class="font-weight-regular grey--text">{{ header.text }}</span>
                </template>

                <template v-slot:header.p2p="{ header }">
                  <span class="font-weight-regular grey--text">{{ header.text }}</span>
                </template>

                <template v-slot:header.api="{ header }">
                  <span class="font-weight-regular grey--text">{{ header.text }}</span>
                </template>

                <template v-slot:header.uptime="{ header }">
                  <span class="font-weight-regular grey--text">{{ header.text }}</span>
                </template>

                <template v-slot:item.name="{ item }">
                  <span class="font-weight-bold d-inline-block text-truncate" style="max-width: 10vw;">
                    {{ item.name }}
                  </span>
                </template>

                <template v-slot:item.address="{ item }">
                  {{ item.address }}
                </template>

                <template v-slot:item.height="{ item }">
                  <span v-if="item.height">
                    {{ item.height.toLocaleString(undefined, {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0
                    }) }}
                  </span>

                  <span v-if="!item.height">
                    N/A
                  </span>
                </template>

                <template v-slot:item.version="{ item }">
                  {{ item.version }}
                </template>

                <template v-slot:item.p2p="{ item }">
                  <v-icon v-if="item.p2p" :color="color(item.p2p)">
                    mdi-check
                  </v-icon>
                  <v-icon v-if="!item.p2p" :color="color(item.p2p)">
                    mdi-close
                  </v-icon>
                </template>

                <template v-slot:item.api="{ item }">
                  <v-icon v-if="item.api" :color="color(item.api)">
                    mdi-check
                  </v-icon>
                  <v-icon v-if="!item.api" :color="color(item.api)">
                    mdi-close
                  </v-icon>
                </template>

                <template v-slot:item.uptime="{ item }">
                  <div class="pb-5">
                    <span
                      v-for="(k, v) in item.uptime"
                      v-bind:key="v[k]"
                      :class="color(v) + '--text'"
                      class="display-1 font-weight-black"
                    >.</span>
                  </div>
                </template>
              </v-data-table>

              <v-skeleton-loader
                v-if="!loaded"
                class="mx-auto"
                type="table"
                loading
              />
            </v-card-text>
          </v-sheet>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'
import Panel from '~/components/Panel'

export default {
  head () {
    return {
      title: this.$t('nodes.title')
    }
  },
  components: {
    Panel
  },
  data () {
    return {
      loaded: false,
      nodesTable: [
        {
          text: 'Name',
          align: 'left',
          value: 'name'
        },
        {
          text: 'Host:Port',
          align: 'left',
          value: 'address'
        },
        {
          text: 'Height',
          align: 'center',
          value: 'height'
        },
        {
          text: 'Version',
          align: 'center',
          value: 'version'
        },
        {
          text: 'Public P2P',
          align: 'center',
          value: 'p2p'
        },
        {
          text: 'Public API',
          align: 'center',
          value: 'api'
        },
        {
          text: 'API Uptime',
          align: 'center',
          value: 'uptime'
        }
      ],
      expanded: []
    }
  },
  computed: mapGetters({
    nodes: 'nodes/get'
  }),
  async fetch ({ $axios, store }) {
    const updated = store.state.nodes.nodes.updated
    const diff = moment().diff(moment(updated))

    // If cache expired
    if (!updated || diff > process.env.DATA_CACHE) {
      store.commit('nodes/empty')

      const nodes = await $axios.$get(process.env.NETWORK_API + '/nodes/all', {
        timeout: process.env.AXIOS_TIMEOUT
      })

      nodes.forEach((node) => {
        store.commit('nodes/add', node)
      })
    }
  },
  mounted () {
    this.loaded = true
  },
  methods: {
    color (value) {
      if (value === 0) { return 'red' } else if (value === 1) { return 'green' } else { return 'dark' }
    }
  }
}
</script>
