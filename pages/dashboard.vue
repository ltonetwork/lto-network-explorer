<template>
  <div>
    <Panel />
    <v-row>
      <v-col>
        <v-card
          :loading="loading"
          :loader-height="10"
        >
          <v-card-title class="secondary--text">
            <span class="mr-2 lto-statistics" />
            {{ $t('network.tx_stats') }}

            <v-spacer />

            <v-chip-group
              mandatory
              active-class="primary"
            >
              <v-chip
                v-for="filter in chartFilters"
                :key="filter"
                :value="filter"
                @click="filterChart()"
                label
                class="white--text transparent font-weight-thin"
              >
                {{ filter }}
              </v-chip>
            </v-chip-group>
          </v-card-title>

          <v-card-text>
            <v-sheet>
              <v-skeleton-loader
                v-if="loading"
                class="mx-auto"
                type="image"
                loading
              />
              <figure class="chart">
                <lineChart
                  :chartData="chartDataSet"
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
          :loading="loading"
          :loader-height="10"
        >
          <v-card-title class="secondary--text">
            <span class="mr-2 lto-block" />
            {{ $t('network.latest_blocks') }}
          </v-card-title>
          <v-sheet>
            <v-card-text class="pt-0">
              <v-simple-table class="secondary--text">
                <thead>
                  <tr>
                    <th class="font-weight-regular text-left grey--text">
                      {{ $t('explorer.index') }}
                    </th>
                    <th class="font-weight-regular text-left grey--text">
                      {{ $t('explorer.generator') }}
                    </th>
                    <th class="font-weight-regular text-center grey--text">
                      {{ $t('explorer.tx') }}
                    </th>
                    <th class="font-weight-regular text-right grey--text">
                      {{ $t('explorer.timestamp') }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="block in blocks.last" :key="block.height">
                    <td>
                      <nuxt-link :to="{ path: '/block/' + block.height }">
                        {{ block.height.toLocaleString(undefined, {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0
                        }) }}
                      </nuxt-link>
                    </td>
                    <td class="primary--text text-truncate" style="max-width: 10vw;">
                      <nuxt-link :to="{ path: '/address/' + block.generator }">
                        {{ block.generator }}
                      </nuxt-link>
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
                v-if="loading"
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
          :loading="loading"
          :loader-height="10"
        >
          <v-card-title class="secondary--text">
            <span class="mr-2 lto-transactions" />
            {{ $t('network.unconfirmed_tx') }}
          </v-card-title>
          <v-sheet>
            <v-card-text class="pt-0">
              <v-simple-table class="secondary--text">
                <thead>
                  <tr>
                    <th class="font-weight-regular text-left grey--text">
                      {{ $t('explorer.id') }}
                    </th>
                    <th class="font-weight-regular text-center grey--text">
                      {{ $t('explorer.sender') }}
                    </th>
                    <th class="font-weight-regular text-right grey--text">
                      {{ $t('explorer.fee') }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="tx in unconfirmed.pool" v-bind:key="tx.id">
                    <td class="text-truncate" style="max-width: 10vw;">
                      {{ tx.id }}
                    </td>
                    <td class="primary--text text-truncate" style="max-width: 10vw;">
                      <nuxt-link :to="{ path: '/address/' + tx.sender }">
                        {{ tx.sender }}
                      </nuxt-link>
                    </td>
                    <td class="text-right">
                      {{ tx.fee }}
                    </td>
                  </tr>
                </tbody>
              </v-simple-table>
            </v-card-text>

            <v-skeleton-loader
              v-if="loading"
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
import Panel from '~/components/Panel'
import LineChart from '~/components/LineChart'

export default {
  // name: 'Dashboard',
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
      loading: true,
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
            },
            scaleLabel: {
              fontFamily: 'IBM Plex Sans',
              fontColor: '#75828F',
              fontSize: 10
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
          titleFontColor: '#fff',
          titleSpacing: 0,
          titleFontSize: 12,
          titleFontStyle: 'normal',
          titleMarginBottom: 0,
          xPadding: 15,
          yPadding: 10,
          intersect: false,
          displayColors: false,
          cornerRadius: 4,
          backgroundColor: 'rgba(23, 5, 75, 0.9)',
          callbacks: {
            title (value, chart) {
              return 'Transactions: ' + value[0].yLabel.toLocaleString(undefined, {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2
              })
            },
            label (value, chart) {

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
      chartFilters: [
        'day', 'week', 'month', 'year'
      ]
    }
  },
  computed: {
    chartDataSet () {
      return {
        labels: this.chart.dataset.map(d => d.period),
        datasets: [
          {
            backgroundColor: 'rgba(249, 246, 252, .6)',
            borderColor: '#804BC9',
            borderWidth: '3',
            pointBorderWidth: '0',
            pointRotation: '45',
            spanGaps: true,
            data: this.chart.dataset.map(d => d.count)
          }
        ]
      }
    },
    ...mapGetters({
      chart: 'dashboard/getChart',
      blocks: 'dashboard/getBlocks',
      unconfirmed: 'dashboard/getUnconfirmed'
    })
  },
  created () {
    this.pollChart()
    this.pollBlocks()
    this.pollUnconfirmed()
  },
  mounted () {
    this.loading = false
  },
  beforeDestroy () {
    clearInterval(this.chart)
    clearInterval(this.blocks)
    clearInterval(this.unconfirmed)
  },
  methods: {
    pollChart () {
      // Fetch on render
      this.$store.dispatch('dashboard/fetchChart')

      // Refresh every minute
      this.chart = setInterval(() => {
        this.$store.dispatch('dashboard/fetchChart')
      }, 60000)
    },
    pollBlocks () {
      // Fetch on render
      this.$store.dispatch('dashboard/fetchBlocks')

      // Refresh every minute
      this.blocks = setInterval(() => {
        this.$store.dispatch('dashboard/fetchBlocks')
      }, 60000)
    },
    pollUnconfirmed () {
      // Fetch on render
      this.$store.dispatch('dashboard/fetchUnconfirmed')

      // Refresh every 10 seconds
      this.unconfirmed = setInterval(() => {
        this.$store.dispatch('dashboard/fetchUnconfirmed')
      }, 10000)
    },
    filterChart () {
      alert('not implemented yet')
    }
  }
}
</script>
