<template>
  <div>
    <v-row>
      <v-col
        sm="12"
        md="12"
        lg="12"
      >
        <v-card>
          <v-card-title class="headline" style="color:#1a004b;">
            {{ $t('home.tx_stats') }}
          </v-card-title>
          <v-card-text>
            <div class="chart">
              <lineChart :data="chartData" :options="chartOptions" />
            </div>
          </v-card-text>
          <v-card-actions />
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col
        sm="6"
        md="6"
        lg="6"
      >
        <v-card>
          <v-card-title class="headline" style="color:#1a004b;">
            {{ $t('home.latest_blocks') }}
          </v-card-title>
          <v-card-text>
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">
                      {{ $t('explorer.index') }}
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
                  <tr v-for="block in getBlocks" :key="block.index">
                    <td><a :href="'block/' + block.index">{{ block.index }}</a></td>
                    <td class="text-center">
                      {{ block.count }}
                    </td>
                    <td class="text-right">
                      {{ block.timestamp }}
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card-text>
          <v-card-actions />
        </v-card>
      </v-col>

      <v-col
        sm="6"
        md="6"
        lg="6"
      >
        <v-card>
          <v-card-title class="headline" style="color:#1a004b;">
            {{ $t('home.unconfirmed_tx') }}
          </v-card-title>
          <v-card-text>
            <v-simple-table>
              <template v-slot:default>
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
                  <tr v-for="tx in getUnconfirmedTx" :key="tx.id">
                    <td>
                      <a :href="'/transaction/' + tx.id">{{ tx.id }}</a>
                    </td>
                    <td class="text-center">
                      <a :href="'/address/' + tx.sender">{{ tx.sender }}</a>
                    </td>
                    <td class="text-right">
                      {{ tx.fee / 10000000 }}
                    </td>
                  </tr>
                </tbody>
              </template>
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
  components: {
    LineChart
  },
  data () {
    return {
      chartData: [],
      chartOptions: [],
      getBlocks: [],
      getUnconfirmedTx: []
    }
  },
  watchQuery: true,
  async asyncData ({ $axios }) {
    // Get chart data
    const getTx = await $axios.$get(process.env.CACHE_URL + '/stats/transaction/week')

    // Get latest blocks
    const getBlocks = await $axios.$get(process.env.CACHE_URL + '/block/last/5')

    getBlocks.forEach((block) => {
      block.timestamp = moment(block.timestamp).format('DD-MM-YY HH:MM:SS')
    })

    // Get unconfirmed tx
    const getUnconfirmedTx = await $axios.$get('https://node.lto.cloud/transactions/unconfirmed')

    // Truncate
    getUnconfirmedTx.forEach((tx) => {
      tx.id = tx.id.substring(0, 12) + '...'
      tx.sender = tx.sender.substring(0, 12) + '...'
    })

    return {
      chartData: {
        labels: getTx.map(data => moment(data.period)),
        datasets: [
          {
            backgroundColor: 'rgba(249, 246, 252, .6)',
            borderColor: '#804BC9',
            borderWidth: '3',
            pointBorderWidth: '0',
            pointRotation: '45',
            spanGaps: true,
            data: getTx.map(data => data.count)
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
                  maximumFractionDigits: 10
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
          bodyFontSize: 13,
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
                maximumFractionDigits: 10
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
      getBlocks,
      getUnconfirmedTx
    }
  },
  mounted () {
  }
}
</script>
