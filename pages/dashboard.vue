<template>
  <div>
    <Panel />
    <v-row>
      <v-col>
        <v-card
          :loading="!chart.updated"
          :loader-height="10"
        >
          <v-card-title class="secondary--text">
            <span class="mr-2 lto-statistics" />
            {{ $t('network.tx_stats') }}

            <v-spacer />

            <v-chip-group
              v-model="selectedFilter"
              mandatory
              active-class="primary"
              :value="chart.filter"
            >
              <v-chip
                v-for="filter in chartFilters"
                :key="filter"
                :value="filter"
                label
                class="white--text transparent font-weight-thin overline"
              >
                {{ filter }}
              </v-chip>
            </v-chip-group>
          </v-card-title>

          <v-card-text class="pa-5">
            <v-sheet>
              <v-skeleton-loader
                v-if="!chart.updated"
                class="mx-auto"
                type="image"
                loading
              />
              <figure class="chart">
                <lineChart
                  v-if="chart.updated"
                  :chart-data="chartDataSet"
                  :chart-options="chartOptions"
                />
              </figure>
            </v-sheet>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-card
          :loading="!blocks.updated"
          :loader-height="10"
        >
          <v-card-title class="secondary--text">
            <span class="mr-2 lto-block" />
            {{ $t('network.latest_blocks') }}
          </v-card-title>
          <v-sheet>
            <v-card-text class="pa-0">
              <v-simple-table class="secondary--text">
                <thead>
                  <tr>
                    <th class="overline text-left grey--text">
                      {{ $t('explorer.index') }}
                    </th>
                    <th class="overline text-left grey--text">
                      {{ $t('explorer.generator') }}
                    </th>
                    <th class="overline text-center grey--text">
                      {{ $t('explorer.tx') }}
                    </th>
                    <th class="overline text-right grey--text">
                      {{ $t('explorer.timestamp') }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="block in blocks.last" :key="block.height">
                    <td>
                      <nuxt-link :to="{ path: '/block/' + block.height }">
                        {{ block.height | parseString }}
                      </nuxt-link>
                    </td>
                    <td class="primary--text text-truncate" style="max-width: 26vh;">
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
                v-if="!blocks.updated"
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
          :loading="!unconfirmed.updated"
          :loader-height="10"
        >
          <v-card-title class="secondary--text">
            <span class="mr-2 lto-transactions" />
            {{ $t('network.unconfirmed_tx') }}
          </v-card-title>
          <v-sheet>
            <v-card-text class="pa-0">
              <v-simple-table class="secondary--text">
                <thead>
                  <tr>
                    <th class="overline text-left grey--text">
                      {{ $t('explorer.id') }}
                    </th>
                    <th class="overline text-center grey--text">
                      {{ $t('explorer.sender') }}
                    </th>
                    <th class="overline text-right grey--text">
                      {{ $t('explorer.fee') }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="tx in unconfirmed.pool" :key="tx.id">
                    <td class="text-truncate" style="max-width: 26vh;">
                      {{ tx.id }}
                    </td>
                    <td class="primary--text text-truncate" style="max-width: 26vh;">
                      <nuxt-link :to="{ path: '/address/' + tx.sender }">
                        {{ tx.sender }}
                      </nuxt-link>
                    </td>
                    <td class="text-right">
                      {{ tx.fee | parseAtomic | parseNumber }}
                    </td>
                  </tr>
                </tbody>
              </v-simple-table>
            </v-card-text>

            <v-skeleton-loader
              v-if="!unconfirmed.updated"
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

<script lang="ts">

import Vue from 'vue'
import { ChartData, ChartType, ChartTooltipItem } from 'chart.js'

import { mapGetters } from 'vuex'
import { Component, Watch } from 'vue-property-decorator'
import moment from 'moment'
import Panel from '../components/Panel.vue'
import LineChart from '../components/LineChart.vue'
import { translate } from '../plugins/translate'

interface DataSet {
  backgroundColor: string;
  borderColor: string;
  borderWidth: string;
  pointBorderWidth: string;
  pointRotation: string;
  spanGaps: boolean;
  data: any;
}

interface ChartDataSet {
  labels: any[];
  datasets: DataSet[];
}

@Component({
  // name: 'Dashboard',
  head () {
    return {
      title: translate('network.title')
    }
  },
  components: {
    Panel,
    LineChart
  },
  computed: {
    chartDataSet (): ChartData {
      return {
        labels: (this as any).chart.dataset.map((d: any) => (d as any).date),
        datasets: [{
          backgroundColor: 'rgba(249, 246, 252, .6)',
          borderColor: '#804BC9',
          data: (this as any).chart.dataset.map((d: any) => (d as any).transactions)
        }]
      }
    },
    ...mapGetters({
      chart: 'dashboard/getChart',
      blocks: 'dashboard/getBlocks',
      unconfirmed: 'dashboard/getUnconfirmed'
    })
  }
})

class Dashboard extends Vue {
  filters = {
    type: 'week',
    start: moment().subtract(7, 'day').format('YYYY-MM-DD'),
    end: moment().format('YYYY-MM-DD'),
    granularity: 'day'
  }

  selectedFilter = null

  chartData = {
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
  }

  chartOptions = {
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
        callback (value: any): string {
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
          callback (value: any): string {
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
      cornerRadius: 6,
      backgroundColor: 'rgba(23, 5, 75, 1)',
      mode: 'label',
      callbacks: {
        title (value: ChartTooltipItem[]): string {
          return 'Transactions: ' + (value[0].yLabel as string | number).toLocaleString(undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
          })
        },
        label (value: ChartTooltipItem[]): string {
          return ''
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
  }

  chartFilters = [
    'week', 'month', 'year'
  ]

  @Watch('selectedFilter')
  filterChanged (): void {
    if (this.selectedFilter === 'week') {
      this.filters = {
        type: 'week',
        start: moment().subtract(1, 'week').format('YYYY-MM-DD'),
        end: moment().format('YYYY-MM-DD'),
        granularity: 'day'
      }

      this.$store.dispatch('dashboard/fetchChart', this.filters)
    } else if (this.selectedFilter === 'month') {
      this.filters = {
        type: 'month',
        start: moment().subtract(1, 'month').format('YYYY-MM-DD'),
        end: moment().format('YYYY-MM-DD'),
        granularity: 'day'
      }

      this.$store.dispatch('dashboard/fetchChart', this.filters)
    } else if (this.selectedFilter === 'year') {
      this.filters = {
        type: 'year',
        start: moment().subtract(1, 'year').format('YYYY-MM-DD'),
        end: moment().format('YYYY-MM-DD'),
        granularity: 'day'
      }

      this.$store.dispatch('dashboard/fetchChart', this.filters)
    }
  }

  chartTimer: ReturnType<typeof setInterval> | undefined = undefined;
  blocksTimer: ReturnType<typeof setInterval> | undefined = undefined;
  unconfirmedTimer: ReturnType<typeof setInterval> | undefined = undefined;

  created (): void {
    this.pollChart()
    this.pollBlocks()
    this.pollUnconfirmed()
  }

  beforeDestroy (): void {
    if (this.chartTimer) {
      clearInterval(this.chartTimer)
    }

    if (this.blocksTimer) {
      clearInterval(this.blocksTimer)
    }

    if (this.unconfirmedTimer) {
      clearInterval(this.unconfirmedTimer)
    }
  }

  pollChart (): void {
    // Fetch on render
    this.$store.dispatch('dashboard/fetchChart', this.filters)

    // Refresh every minute
    this.chartTimer = setInterval(() => {
      this.$store.dispatch('dashboard/fetchChart', this.filters)
    }, 60000)
  }

  pollBlocks (): void {
    // Fetch on render
    this.$store.dispatch('dashboard/fetchBlocks')

    // Refresh every minute
    this.blocksTimer = setInterval(() => {
      this.$store.dispatch('dashboard/fetchBlocks')
    }, 10000)
  }

  pollUnconfirmed (): void {
    // Fetch on render
    this.$store.dispatch('dashboard/fetchUnconfirmed')

    // Refresh every 10 seconds
    this.unconfirmedTimer = setInterval(() => {
      this.$store.dispatch('dashboard/fetchUnconfirmed')
    }, 5000)
  }

  filterChart (): void {
    alert(this.selectedFilter)
  }
}

export default Dashboard
</script>
