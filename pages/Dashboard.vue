<template>
  <div>
    <Panel />
    <v-row>
      <v-col>
        <v-card
          :loading="!chartLoaded"
          :loader-height="10"
        >
          <v-card-title class="headline" style="color:#1a004b;">
            {{ $t('network.tx_stats') }}
          </v-card-title>
          <v-card-text>
            <v-sheet>
              <v-skeleton-loader
                v-if="!chartLoaded"
                class="mx-auto"
                type="image"
                loading
              />
              <figure class="chart">
                <lineChart
                  v-if="chartLoaded"
                  :chartData="chartData"
                  :chartOptions="chartOptions"
                />
              </figure>
            </v-sheet>
          </v-card-text>
          <v-card-actions />
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-card
          :loading="!blocksLoaded"
          :loader-height="10"
        >
          <v-card-title class="headline" style="color:#1a004b;">
            {{ $t('network.latest_blocks') }}
          </v-card-title>
          <v-sheet>
            <v-card-text>
              <v-simple-table v-if="blocksLoaded">
                <thead>
                  <tr>
                    <th class="text-left">
                      {{ $t('explorer.index') }}
                    </th>
                    <th class="text-left">
                      {{ $t('explorer.generator') }}
                    </th>
                    <th class="text-center">
                      {{ $t('explorer.tx') }}
                    </th>
                    <th class="text-right">
                      {{ $t('explorer.timestamp') }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="block in latestBlocks" :key="block.height">
                    <td><a :href="'block/' + block.height">{{ block.height }}</a></td>
                    <td>
                      <a :href="'/address/' + block.generator">{{ block.generator }}</a>
                    </td>
                    <td class="text-center">
                      {{ block.transactionCount }}
                    </td>
                    <td class="text-right">
                      {{ block.timestamp }}
                    </td>
                  </tr>
                </tbody>
              </v-simple-table>

              <v-skeleton-loader
                v-if="!blocksLoaded"
                class="mx-auto"
                type="table"
                loading
              />
            </v-card-text>
          </v-sheet>
        </v-card>
      </v-col>

      <v-col>
        <v-card
          :loading="!txLoaded"
          :loader-height="10"
        >
          <v-card-title class="headline" style="color:#1a004b;">
            {{ $t('network.unconfirmed_tx') }}
          </v-card-title>
          <v-sheet>
            <v-card-text>
              <v-simple-table v-if="txLoaded">
                <thead>
                  <tr>
                    <th class="text-left">
                      {{ $t('explorer.id') }}
                    </th>
                    <th class="text-center">
                      {{ $t('explorer.sender') }}
                    </th>
                    <th class="text-right">
                      {{ $t('explorer.fee') }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="tx in unconfirmedTxs" :key="tx.id">
                    <td>{{ tx.id }}</td>
                    <td class="text-center">
                      <a :href="'/address/' + tx.sender">{{ tx.sender }}</a>
                    </td>
                    <td class="text-right">
                      {{ tx.fee }}
                    </td>
                  </tr>
                </tbody>
              </v-simple-table>
            </v-card-text>

            <v-skeleton-loader
              v-if="!txLoaded"
              class="mx-auto"
              type="table"
              loading
            />
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
import LineChart from '~/components/LineChart'

export default {
  head () {
    return {
      title: this.$t('network.title')
    }
  },
  components: {
    Panel,
    LineChart
  },
  data () {
    return {
      networkHeight: 0,
      chartLoaded: false,
      blocksLoaded: false,
      txLoaded: false,
      chartData: {
        labels: null,
        datasets: [
          {
            backgroundColor: 'rgba(249, 246, 252, .6)',
            borderColor: '#804BC9',
            borderWidth: '3',
            pointBorderWidth: '0',
            pointRotation: '45',
            spanGaps: true,
            data: null
          }
        ]
      },
      chartOptions: {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          xAxes: [{
            id: 'x-axis',
            type: 'time',
            ticks: {
              autoSkip: true,
              maxRotation: 45
            },
            time: {
              unit: 'day'
            },
            callback (value, chart) {
              return value
            },
            distribution: 'series',
            gridLines: {
              display: true
            }
          }],
          yAxes: [{
            id: 'y-axis',
            type: 'linear',
            ticks: {
              display: true,
              beginAtZero: false,
              callback (value, chart) {
                return value.toLocaleString(undefined, {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 2
                })
              }
            },
            gridLines: {
              display: true,
              drawBorder: false
            }
          }]
        },
        tooltips: {
          bodyFontColor: '#1f1f1f',
          bodySpacing: 5,
          bodyFontSize: 15,
          bodyFontStyle: 'normal',
          titleFontColor: '#1f1f1f',
          titleSpacing: 5,
          titleFontSize: 17,
          titleMarginBottom: 10,
          titleFontStyle: 'bold',
          xPadding: 15,
          yPadding: 15,
          intersect: false,
          displayColors: false,
          cornerRadius: 0,
          backgroundColor: 'rgba(255,255,255,0.9)',
          callbacks: {
            title (value, chart) {
              return value[0].yLabel.toLocaleString(undefined, {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2
              })
            },
            label (value, chart) {
              return moment(value.xLabel).format('YYYY-MM-DD')
            }
          }
        },
        legend: {
          display: false
        },
        animation: {
          duration: 1000,
          easing: 'easeOutQuint'
        }
      },
      latestBlocks: [],
      unconfirmedTxs: []
    }
  },
  computed: mapGetters({
    height: 'dashboard/height',
    chart: 'dashboard/chart'
  }),
  async fetch ({ $axios, store }) {
    const updated = store.state.dashboard.dashboard.updated
    const diff = moment().diff(moment(updated))

    // If cache expired
    if (!updated || diff > process.env.DATA_CACHE) {
      store.commit('dashboard/empty')

      // Get height
      const network = await $axios.$get(process.env.LB_API + '/node/status', {
        timeout: process.env.AXIOS_TIMEOUT
      })

      store.commit('dashboard/height', parseInt(network.blockchainHeight))

      // Get Tx Data
      const dataset = await $axios.$get(process.env.CACHE_API + '/stats/transaction/week', {
        timeout: process.env.AXIOS_TIMEOUT
      })

      dataset.forEach((data) => {
        store.commit('dashboard/chart', data)
      })
    }
  },

  mounted () {
    this.loadChart()
    this.latestBlocksData()
    this.unconfirmedTx()
  },
  methods: {
    loadChart () {
      this.chartData.labels = this.chart.map(l => moment(l.period))
      this.chartData.datasets[0].data = this.chart.map(d => d.count)
      this.chartLoaded = true
    },
    async latestBlocksData () {
      const start = this.height - process.env.LATEST_BLOCKS
      const end = this.height

      const blocks = await this.$axios.$get(process.env.LB_API + '/blocks/headers/seq/' + start + '/' + end, {
        timeout: process.env.AXIOS_TIMEOUT
      })

      blocks.reverse().forEach((block) => {
        block.timestamp = moment(block.timestamp).fromNow()
      })

      this.latestBlocks = blocks || []
      this.blocksLoaded = true
    },
    async unconfirmedTx () {
      const txs = await this.$axios.$get(process.env.LB_API + '/transactions/unconfirmed', {
        timeout: process.env.AXIOS_TIMEOUT
      })
      txs.forEach((tx) => {
        tx.fee = (+tx.fee / process.env.ATOMIC).toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        })
      })

      this.unconfirmedTxs = txs || []
      this.txLoaded = true
    }
  }
}
</script>
