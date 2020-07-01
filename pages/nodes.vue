<template>
  <div>
    <Panel />
    <v-row>
      <v-col>
        <v-card
          :loading="!nodes.updated"
          :loader-height="10"
        >
          <v-card-title class="secondary--text">
            <span class="mr-2 lto-node" />
            {{ $t('nodes.title') }}
          </v-card-title>
          <v-sheet>
            <v-card-text class="pa-0">
              <v-data-table
                v-if="nodes.updated"
                :headers="headers"
                :items="nodes.active"
                :sort-by="['height']"
                :sort-desc="[true]"
                :expanded.sync="expanded"
                :items-per-page="10"
                :footer-props="{'items-per-page-options': [10, 50, 100, -1]}"
                single-expand
                show-expand
                item-key="address"
                class="secondary--text"
              >
                >
                <template v-slot:expanded-item="{ headers, item }">
                  <td :colspan="headers.length" style="background-setColor:#F4F7FB;">
                    <v-simple-table style="background-setColor:#F4F7FB;">
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
                            {{ item.created | fromNow }}
                          </td>
                        </tr>
                        <tr>
                          <th class="text-left grey--text" width="100px">
                            Last Seen
                          </th>
                          <td class="secondary--text" style="border: 0px;">
                            {{ item.updated | fromNow }}
                          </td>
                        </tr>
                      </tbody>
                    </v-simple-table>
                  </td>
                </template>

                <template v-slot:header.name="{ header }">
                  <span class="overline grey--text">{{ header.text }}</span>
                </template>

                <template v-slot:header.address="{ header }">
                  <span class="overline grey--text">{{ header.text }}</span>
                </template>

                <template v-slot:header.height="{ header }">
                  <span class="overline grey--text">{{ header.text }}</span>
                </template>

                <template v-slot:header.version="{ header }">
                  <span class="overline grey--text">{{ header.text }}</span>
                </template>

                <template v-slot:header.p2p="{ header }">
                  <span class="overline grey--text">{{ header.text }}</span>
                </template>

                <template v-slot:header.api="{ header }">
                  <span class="overline grey--text">{{ header.text }}</span>
                </template>

                <template v-slot:header.uptime="{ header }">
                  <span class="overline grey--text">{{ header.text }}</span>
                </template>

                <template v-slot:item.name="{ item }">
                  <span class="font-weight-bold d-inline-block">
                    {{ item.name | truncateString }}
                  </span>
                </template>

                <template v-slot:item.address="{ item }">
                  {{ item.address }}
                </template>

                <template v-slot:item.height="{ item }">
                  <span v-if="item.height">
                    {{ item.height | parseString }}
                  </span>

                  <span v-if="!item.height">
                    N/A
                  </span>
                </template>

                <template v-slot:item.version="{ item }">
                  {{ item.version }}
                </template>

                <template v-slot:item.p2p="{ item }">
                  <v-icon v-if="item.p2p" :color="setColor(item.p2p)">
                    mdi-check
                  </v-icon>
                  <v-icon v-if="!item.p2p" :color="setColor(item.p2p)">
                    mdi-close
                  </v-icon>
                </template>

                <template v-slot:item.api="{ item }">
                  <v-icon v-if="item.api" :color="setColor(item.api)">
                    mdi-check
                  </v-icon>
                  <v-icon v-if="!item.api" :color="setColor(item.api)">
                    mdi-close
                  </v-icon>
                </template>

                <template v-slot:item.uptime="{ item }">
                  <div class="pb-5">
                    <span
                      v-for="(k, v) in item.uptime"
                      :key="v[k]"
                      :class="setColor(k) + '--text'"
                      class="display-1 font-weight-black"
                    >.</span>
                  </div>
                </template>
              </v-data-table>

              <v-skeleton-loader
                v-if="!nodes.updated"
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

<script lang="ts">
  import Vue from 'vue'
  import { mapGetters } from 'vuex'
  import { Component } from 'vue-property-decorator'
  import { translate } from '../plugins/translate'
  import Panel from '../components/Panel.vue'

  @Component({
    head() {
      return {
        title: translate('nodes.title')
      }
    },
    components: {
      Panel
    },
    computed: mapGetters({
      nodes: 'nodes/getNodes'
    })
  })

  class Nodes extends Vue {
    headers = [
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
    ]

    expanded = []

    nodesTimer: ReturnType<typeof setInterval> | undefined = undefined;

    created(): void {
      this.pollNodes()
    }

    beforeDestroy(): void {
      if (this.nodesTimer) {
        clearInterval(this.nodesTimer)
      }
    }

    pollNodes(): void {
      // Fetch on render
      this.$store.dispatch('nodes/fetchNodes')

      // Refresh every minute
      this.nodesTimer = setInterval(() => {
        this.$store.dispatch('nodes/fetchNodes')
      }, 60000)
    }

    setColor(value: number): string {
      if (value === 0) {
        return 'red'
      } else if (value === 1) {
        return 'green'
      } else {
        return 'dark'
      }
    }
  }

  export default Nodes
</script>
