<template>
  <div>
    <v-row>
      <v-col>
        <v-card
          :loading="!loaded"
          :loader-height="10"
        >
          <v-card-title class="headline" style="color:#1a004b;">
            {{ $t('staking.title') }}
          </v-card-title>
          <v-sheet>
            <v-card-text>
              <v-data-table
                :headers="generatorsTableHeader"
                :items="generators"
                :sort-by="['share']"
                :sort-desc="[true]"
                :items-per-page="20"
                item-key="generator"
              >
                <template v-slot:item.label="{ item }">
                  <v-chip color="light" outlined class="font-weight-bold">
                    {{ item.label || 'N/A' }}
                  </v-chip>
                </template>

                <template v-slot:item.generator="{ item }">
                  <v-chip color="primary" outlined>
                    <a :href="'/address/' + item.generator">{{ item.generator }}</a>
                  </v-chip>
                </template>

                <template v-slot:item.payout="{ item }">
                  <v-chip :color="determineColor(item.payout)" dark>
                    {{ item.payout }}
                  </v-chip>
                </template>

                <template v-slot:item.pool="{ item }">
                  <v-chip color="light" outlined>
                    {{ item.pool.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    }) }} LTO
                  </v-chip>
                </template>

                <template v-slot:item.blocks="{ item }">
                  <v-chip color="light" outlined>
                    {{ item.blocks }}
                  </v-chip>
                </template>

                <template v-slot:item.earnings="{ item }">
                  <v-chip color="light" outlined>
                    {{ item.earnings.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    }) }} LTO
                  </v-chip>
                </template>

                <template v-slot:item.share="{ item }">
                  <v-chip color="light" outlined>
                    {{ item.share.toLocaleString(undefined, {
                      minimumFractionDigits: 3,
                      maximumFractionDigits: 3
                    }) }}%
                  </v-chip>
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
          <v-card-title class="headline" style="color:#1a004b;">
            {{ $t('staking.stats') }}
          </v-card-title>
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
              :v-if="!loaded"
              class="mx-auto"
              type="image"
              loading
            />

            <v-sheet />
          </v-sheet>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import DoughnutChart from '~/components/DoughnutChart'

export default {
  head () {
    return {
      title: this.$t('staking.title')
    }
  },
  components: {
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
      generatorsTableHeader: [
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
          text: 'Payout Support',
          align: 'center',
          value: 'payout'
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
  async fetch ({ $axios, store, params }) {
    const generators = await $axios.$get(process.env.CACHE_API + '/generator/all/week', {
      timeout: process.env.AXIOS_TIMEOUT
    })

    generators.forEach((generator) => {
      store.commit('generators/add', generator)
    })
  },
  mounted () {
    this.loadChart(this.generators)
  },
  methods: {
    loadChart (data) {
      data.forEach((generator) => {
        this.chartData.labels.push(generator.generator)
        this.chartData.datasets[0].data.push(generator.share)

        const r = Math.random()
        const s = 180
        const color = 'rgba(126, 12,' + Math.round(r * s) + ',' + r.toFixed(1) + ')'
        this.chartData.datasets[0].backgroundColor.push(color)
      })

      this.loaded = true
    },
    determineColor (value) {
      if (value === 0) { return 'red' } else if (value === 1) { return 'green' } else { return 'dark' }
    }
  }
}
</script>
