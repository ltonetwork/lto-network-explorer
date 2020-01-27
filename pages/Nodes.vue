<template>
  <div>
    <Panel />
    <v-row>
      <v-col>
        <v-card
          :loading="!loaded"
        >
          <v-card-title class="headline" style="color:#1a004b;">
            {{ $t('nodes.title') }}
          </v-card-title>
          <v-sheet>
            <v-card-text>
              <v-data-table
                :headers="nodesTable"
                :items="nodes"
                :sort-by="['height']"
                :sort-desc="[true]"
                :expanded.sync="expanded"
                :items-per-page="20"
                show-expand
                single-expand
                item-key="address"
              >
                <template v-slot:expanded-item="{ item }">
                  <v-simple-table
                    style="width: 100%;margin: 5px;"
                  >
                    <tbody>
                      <tr>
                        <th class="text-left">
                          Country
                        </th>
                        <td>{{ item.country }}</td>
                      </tr>
                      <tr>
                        <th class="text-left">
                          Region
                        </th>
                        <td>{{ item.region }}</td>
                      </tr>
                      <tr>
                        <th class="text-left">
                          City
                        </th>
                        <td>{{ item.city }}</td>
                      </tr>
                      <tr>
                        <th class="text-left">
                          Coordinates
                        </th>
                        <td>{{ item.coordinates }}</td>
                      </tr>
                      <tr>
                        <th class="text-left">
                          Version
                        </th>
                        <td>{{ item.version }}</td>
                      </tr>
                      <tr>
                        <th class="text-left">
                          App
                        </th>
                        <td>{{ item.app }}</td>
                      </tr>
                      <tr>
                        <th class="text-left">
                          First Seen
                        </th>
                        <td>{{ item.created }}</td>
                      </tr>
                      <tr>
                        <th class="text-left">
                          Last Seen
                        </th>
                        <td>{{ item.updated }}</td>
                      </tr>
                    </tbody>
                  </v-simple-table>
                </template>
                <template v-slot:item.name="{ item }">
                  <v-chip color="primary" outlined class="font-weight-bold">
                    {{ item.name }}
                  </v-chip>
                </template>
                <template v-slot:item.address="{ item }">
                  <v-chip color="light" outlined>
                    {{ item.address }}
                  </v-chip>
                </template>

                <template v-slot:item.height="{ item }">
                  <v-chip color="light" outlined>
                    {{ item.height }}
                  </v-chip>
                </template>

                <template v-slot:item.version="{ item }">
                  <v-chip color="" outlined>
                    {{ item.version }}
                  </v-chip>
                </template>

                <template v-slot:item.p2p="{ item }">
                  <v-chip :color="color(item.p2p)" label outlined dark>
                    {{ item.p2p }}
                  </v-chip>
                </template>

                <template v-slot:item.api="{ item }">
                  <v-chip :color="color(item.api)" label outlined dark>
                    {{ item.api }}
                  </v-chip>
                </template>

                <template v-slot:item.uptime="{ item }">
                  <span
                    v-for="(k, v) in item.uptime"
                    v-bind:key="v[k]"
                    :class="color(v) + '--text'"
                    class="d-table-cell text-center display-1 font-weight-black pb-5"
                  >.</span>
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
          text: 'API Availbility Score',
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
