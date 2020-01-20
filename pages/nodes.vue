<template>
  <div>
    <v-row>
      <v-col>
        <v-card
          :loading="!nodesLoaded"
        >
          <v-card-title class="headline" style="color:#1a004b;">
            {{ $t('nodes.title') }}
          </v-card-title>
          <v-card-text>
            <v-data-table
              :headers="nodesTableHeader"
              :items="allNodes"
              :sort-by="['height']"
              :sort-desc="[false]"
              :expanded.sync="expanded"
              :items-per-page="100"
              show-expand
              single-expand
              item-key="address"
              calculate-widths
              dense
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
                <v-chip color="light" class="font-weight-bold">
                  {{ item.name }}
                </v-chip>
              </template>
              <template v-slot:item.address="{ item }">
                <v-chip color="light">
                  {{ item.address }}
                </v-chip>
              </template>

              <template v-slot:item.height="{ item }">
                <v-chip color="light">
                  {{ item.height }}
                </v-chip>
              </template>

              <template v-slot:item.p2p="{ item }">
                <v-chip :color="determineColor(item.p2p)" dark>
                  {{ item.p2p }}
                </v-chip>
              </template>

              <template v-slot:item.api="{ item }">
                <v-chip :color="determineColor(item.api)" dark>
                  {{ item.api }}
                </v-chip>
              </template>

              <template v-slot:item.uptime="{ item }">
                <span
                  v-for="(k, v) in item.uptime"
                  v-bind:key="v[k]"
                  :class="determineColor(v) + '--text'"
                  class="d-table-cell display-1 font-weight-black pb-5"
                >.</span>
              </template>
            </v-data-table>
          </v-card-text>
          <v-card-actions />
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import moment from 'moment'
import https from 'https'

export default {
  head () {
    return {
      title: this.$t('nodes.title')
    }
  },
  components: {
  },
  data () {
    return {
      nodesLoaded: false,
      allNodes: [],
      nodesTableHeader: [
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
          text: 'Node Height',
          align: 'center',
          value: 'height'
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
      expanded: [],
      nodeHeight: 'N/A'
    }
  },
  async mounted () {
    await this.getNodes()

    // use veu store to save block heights
    this.allNodes.forEach(async (node) => {
      if (node.api === 1) {
        node.height = await this.getNodeHeight(node.ip, +node.port + 1)
      } else {
        node.height = 'N/A'
      }
    })
  },
  methods: {
    async getNodes () {
      const res = await this.$axios.$get(process.env.NETWORK_API + '/nodes/all', {
        timeout: process.env.AXIOS_TIMEOUT
      })

      res.forEach((node) => {
        node.updated = moment(node.updated).format('DD-MM-YY HH:MM:SS')
        node.created = moment(node.created).format('DD-MM-YY HH:MM:SS')
        node.uptime = node.uptime.toString().split('')
      })

      this.allNodes = res
      this.nodesLoaded = true
    },
    async getNodeHeight (host, port) {
      try {
        const res = await this.$axios.$get('http://' + host + ':' + port + '/node/status', {
          timeout: 3000,
          httpsAgent: new https.Agent({
            rejectUnauthorized: false
          })
        })

        return res.stateHeight
      } catch {
        return 'N/A'
      }
    },
    determineColor (value) {
      if (value === 0) { return 'red' } else if (value === 1) { return 'green' } else { return 'dark' }
    }
  }
}
</script>
