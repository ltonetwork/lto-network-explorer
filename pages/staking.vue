<template>
  <div>
    <v-row>
      <v-col>
        <v-card
          :loading="!generatorsLoaded"
          :loader-height="10"
        >
          <v-card-title class="headline" style="color:#1a004b;">
            {{ $t('staking.title') }}
          </v-card-title>
          <v-card-text>
            <v-data-table
              :headers="generatorsTableHeader"
              :items="allGenerators"
              :sort-by="['share']"
              :sort-desc="[true]"
              :items-per-page="100"
              item-key="generator"
              calculate-widths
            >
              <template v-slot:item.label="{ item }">
                <v-chip color="light" class="font-weight-bold">
                  {{ item.label || 'N/A' }}
                </v-chip>
              </template>

              <template v-slot:item.generator="{ item }">
                <a :href="'/address/' + item.generator">{{ item.generator }}</a>
              </template>

              <template v-slot:item.payout="{ item }">
                <v-chip :color="determineColor(item.payout)" dark>
                  {{ item.payout }}
                </v-chip>
              </template>

              <template v-slot:item.pool="{ item }">
                <v-chip color="light">
                  {{ item.pool.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  }) }} LTO
                </v-chip>
              </template>

              <template v-slot:item.blocks="{ item }">
                <v-chip color="light">
                  {{ item.blocks }}
                </v-chip>
              </template>

              <template v-slot:item.earnings="{ item }">
                <v-chip color="light">
                  {{ item.earnings.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  }) }} LTO
                </v-chip>
              </template>

              <template v-slot:item.share="{ item }">
                <v-chip color="light">
                  {{ item.share.toLocaleString(undefined, {
                    minimumFractionDigits: 3,
                    maximumFractionDigits: 3
                  }) }}%
                </v-chip>
              </template>
            </v-data-table>
          </v-card-text>
          <v-card-actions />
        </v-card>
      </v-col>

      <v-col>
        <v-card
          :loading="!chartLoaded"
          :loader-height="10"
        >
          <v-card-title class="headline" style="color:#1a004b;">
            {{ $t('staking.stats') }}
          </v-card-title>
          <v-card-text>
            <figure class="chart">
              <DoughnutChart
                v-if="chartLoaded"
                :chartData="chartData"
                :chartOptions="chartOptions"
                :height="300"
              />
            </figure>
          </v-card-text>
          <v-card-actions />
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
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
      chartLoaded: false,
      generatorsLoaded: false,
      allGenerators: [],
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
  async mounted () {
    await this.getGenerators()
    await this.loadChart()
  },
  methods: {
    async getGenerators () {
      let res
      try {
        res = await this.$axios.$get(process.env.CACHE_API + '/generator/all/week', {
          timeout: process.env.AXIOS_TIMEOUT
        })
      } catch (err) {
        console.error(err)
        res = []
      }

      res.forEach((r) => {
        r.payout = 1
      })

      this.allGenerators = res
      this.generatorsLoaded = true
    },
    loadChart () {
      this.allGenerators.forEach((generator) => {
        this.chartData.labels.push(generator.generator)
        this.chartData.datasets[0].data.push(generator.share)

        const r = Math.random()
        const s = 180
        const color = 'rgba(126, 12,' + Math.round(r * s) + ',' + r.toFixed(1) + ')'
        this.chartData.datasets[0].backgroundColor.push(color)
      })

      this.chartLoaded = true
    },
    determineColor (value) {
      if (value === 0) { return 'red' } else if (value === 1) { return 'green' } else { return 'dark' }
    }
  }
}
</script>
