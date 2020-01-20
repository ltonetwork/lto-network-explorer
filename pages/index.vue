<template>
  <div>
    <v-row>
      <v-col>
        <v-card
          :loading="!chartLoaded"
          ::loader-height="10"
        >
          <v-card-title class="headline" style="color:#1a004b;">
            {{ $t('network.tx_stats') }}
          </v-card-title>
          <v-card-text>
            <figure class="chart">
              <lineChart
                v-if="chartLoaded"
                :chartData="chartData"
                :chartOptions="chartOptions"
              />
            </figure>
          </v-card-text>
          <v-card-actions />
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-card
          :loading="!blocksLoaded"
          ::loader-height="10"
        >
          <v-card-title class="headline" style="color:#1a004b;">
            {{ $t('network.latest_blocks') }}
          </v-card-title>
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
          </v-card-text>
          <v-card-actions />
        </v-card>
      </v-col>

      <v-col>
        <v-card
          :loading="!txLoaded"
          ::loader-height="10"
        >
          <v-card-title class="headline" style="color:#1a004b;">
            {{ $t('network.unconfirmed_tx') }}
          </v-card-title>
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
                    {{ tx.fee / 10000000 }}
                  </td>
                </tr>
              </tbody>
            </v-simple-table>
          </v-card-text>
          <v-card-actions />
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import moment from 'moment'
import LineChart from '~/components/LineChart'

export default {
  head () {
    return {
      title: this.$t('network.title')
    }
  },
  components: {
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
              return moment(value.xLabel).format('DD-MM-YYYY')
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
  watchQuery: true,
  async asyncData ({ $axios }) {
    const res = await $axios.$get(process.env.LB_API + '/blocks/height', {
      timeout: process.env.AXIOS_TIMEOUT
    })

    const networkHeight = parseInt(res.height)

    return {
      networkHeight
    }
  },
  mounted () {
    this.loadChart()
    this.latestBlocksData()
    this.unconfirmedTx()
  },
  methods: {
    async loadChart () {
      const res = await this.$axios.$get(process.env.CACHE_API + '/stats/transaction/week')

      this.chartData.labels = res.map(l => moment(l.period))
      this.chartData.datasets[0].data = res.map(d => d.count)
      this.chartLoaded = true
    },
    async latestBlocksData () {
      const start = +this.networkHeight - process.env.LATEST_BLOCKS
      const end = +this.networkHeight

      const blocks = await this.$axios.$get(process.env.LB_API + '/blocks/headers/seq/' + start + '/' + end)

      blocks.reverse().forEach((block) => {
        block.timestamp = moment(block.timestamp).fromNow()
      })

      this.latestBlocks = blocks || []
      this.blocksLoaded = true
    },
    async unconfirmedTx () {
      const txs = await this.$axios.$get(process.env.LB_API + '/transactions/unconfirmed')

      this.unconfirmedTxs = txs || []
      this.txLoaded = true
    }
  }
}
</script>
