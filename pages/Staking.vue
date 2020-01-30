<template>
  <div>
    <Panel />
    <v-row>
      <v-col>
        <v-card
          :loading="!loaded"
          :loader-height="10"
        >
          <v-card-title class="secondary--text">
            <span class="mr-2 lto-block" />
            {{ $t('staking.title') }}
          </v-card-title>
          <v-sheet>
            <v-card-text>
              <v-data-table
                :headers="generatorsTable"
                :items="generators"
                :sort-by="['share']"
                :sort-desc="[true]"
                :items-per-page="20"
                item-key="generator"
                class="secondary--text"
              >
                <template v-slot:item.payout="{ item }">
                  <v-tooltip right>
                    <template v-slot:activator="{ on }">
                      <v-chip :color="color(item.payout)" v-on="on" outlined label dark>
                        <v-icon small>
                          mdi-check
                        </v-icon>
                      </v-chip>
                    </template>
                    <span>payout: 3%</span>
                  </v-tooltip>
                </template>

                <template v-slot:item.label="{ item }">
                  {{ item.label || 'N/A' }}
                </template>

                <template v-slot:item.generator="{ item }">
                  <nuxt-link :to="{ path: '/address/' + item.generator }" class="d-inline-block primary--text text-truncate" style="max-width: 10vw;">
                    {{ item.generator }}
                  </nuxt-link>
                </template>

                <template v-slot:item.pool="{ item }">
                  {{ item.pool.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  }) }}
                </template>

                <template v-slot:item.blocks="{ item }">
                  {{ item.blocks }}
                </template>

                <template v-slot:item.earnings="{ item }">
                  {{ item.earnings.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  }) }}
                </template>

                <template v-slot:item.share="{ item }">
                  {{ item.share.toLocaleString(undefined, {
                    minimumFractionDigits: 3,
                    maximumFractionDigits: 3
                  }) }}%
                </template>
              </v-data-table>
            </v-card-text>

            <v-skeleton-loader
              v-if="!loaded"
              class="mx-auto"
              type="table"
              loading
            />
          </v-sheet>
        </v-card>
      </v-col>

      <v-col>
        <v-card
          :loading="!loaded"
          :loader-height="10"
        >
          <v-sheet>
            <v-card-text>
              <figure class="chart">
                <DoughnutChart
                  v-if="loaded"
                  :chartData="chartData"
                  :chartOptions="chartOptions"
                  :height="300"
                />
              </figure>
            </v-card-text>
            <v-skeleton-loader
              v-if="!loaded"
              class="mx-auto"
              type="image"
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
import DoughnutChart from '~/components/DoughnutChart'
import Panel from '~/components/Panel'

export default {
  head () {
    return {
      title: this.$t('staking.title')
    }
  },
  components: {
    Panel,
    DoughnutChart
  },
  data () {
    return {
      loaded: false,
      chartData: {
        type: 'doughnut',
        datasets: [{
          data: [],
          backgroundColor: [],
          label: ''
        }],
        labels: []

      },
      chartOptions: {
        maintainAspectRatio: true,
        responsive: true,
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
          mode: 'label'
        },
        legend: {
          display: false,
          position: 'bottom'
        },
        animation: {
          duration: 1000,
          easing: 'easeOutQuint'
        }
      },
      generatorsTable: [
        {
          text: 'Payout Support',
          align: 'center',
          value: 'payout'
        },
        {
          text: 'Label',
          align: 'left',
          value: 'label'
        },
        {
          text: 'Generator',
          align: 'left',
          value: 'generator'
        },

        {
          text: 'Pool',
          align: 'center',
          value: 'pool'
        },
        {
          text: 'Forged Blocks',
          align: 'center',
          value: 'blocks'
        },
        {
          text: 'Earnings',
          align: 'center',
          value: 'earnings'
        },
        {
          text: 'Share',
          align: 'center',
          value: 'share'
        }
      ]
    }
  },
  computed: mapGetters({
    generators: 'generators/get'
  }),
  async fetch ({ $axios, store }) {
    const updated = store.state.generators.generators.updated
    const diff = moment().diff(moment(updated))

    // If cache expired
    if (!updated || diff > process.env.DATA_CACHE) {
      store.commit('generators/empty')

      const generators = await $axios.$get(process.env.CACHE_API + '/generator/all/week', {
        timeout: process.env.AXIOS_TIMEOUT
      })

      generators.forEach((generator) => {
        store.commit('generators/add', generator)
      })
    }
  },
  mounted () {
    this.loadChart()
  },
  methods: {
    loadChart () {
      this.generators.forEach((generator) => {
        this.chartData.labels.push(generator.generator)
        this.chartData.datasets[0].data.push(generator.share)

        const r = Math.random()
        const s = 180
        const color = 'rgba(126, 12,' + Math.round(r * s) + ',' + r.toFixed(1) + ')'
        this.chartData.datasets[0].backgroundColor.push(color)
      })

      this.loaded = true
    },
    color (value) {
      if (value === 0) { return 'red' } else if (value === 1) { return 'green' } else { return 'dark' }
    }
  }
}
</script>
