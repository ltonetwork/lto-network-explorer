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
            <span class="mr-2 lto-block" />
            {{ $t('staking.title') }}
          </v-card-title>
          <v-sheet>
            <v-card-text class="pt-0">
              <v-data-table
                :headers="generatorsTable"
                :items="staking.generators"
                :sort-by="['share']"
                :sort-desc="[true]"
                :items-per-page="20"
                item-key="generator"
                class="secondary--text"
              >
                <template v-slot:header.payout="{ header }">
                  <span class="font-weight-regular grey--text">{{ header.text }}</span>
                </template>

                <template v-slot:header.label="{ header }">
                  <span class="font-weight-regular grey--text">{{ header.text }}</span>
                </template>

                <template v-slot:header.generator="{ header }">
                  <span class="font-weight-regular grey--text">{{ header.text }}</span>
                </template>

                <template v-slot:header.pool="{ header }">
                  <span class="font-weight-regular grey--text">{{ header.text }}</span>
                </template>

                <template v-slot:header.blocks="{ header }">
                  <span class="font-weight-regular grey--text">{{ header.text }}</span>
                </template>

                <template v-slot:header.earnings="{ header }">
                  <span class="font-weight-regular grey--text">{{ header.text }}</span>
                </template>

                <template v-slot:header.share="{ header }">
                  <span class="font-weight-regular grey--text">{{ header.text }}</span>
                </template>

                <template v-slot:item.payout="{ item }">
                  <v-tooltip right>
                    <template v-slot:activator="{ on }">
                      <v-icon :color="setColor(item.payout)" v-on="on">
                        mdi-check
                      </v-icon>
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
                  {{ item.pool | localeCurrency }}
                </template>

                <template v-slot:item.blocks="{ item }">
                  {{ item.blocks }}
                </template>

                <template v-slot:item.earnings="{ item }">
                  {{ item.earnings | localeCurrency }}
                </template>

                <template v-slot:item.share="{ item }">
                  {{ item.share | localePecentage }}%
                </template>
              </v-data-table>
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

      <v-col>
        <v-card
          :loading="loading"
          :loader-height="10"
        >
          <v-sheet>
            <v-card-text>
              <figure class="chart">
                <DoughnutChart
                  :chartData="chartDataSet"
                  :chartOptions="chartOptions"
                  :height="300"
                />
              </figure>
            </v-card-text>
            <v-skeleton-loader
              v-if="loading"
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
      loading: false,
      chartData: {
        type: 'doughnut',
        datasets: [{
          data: null,
          backgroundColor: null,
          label: null
        }],
        labels: null
      },
      chartOptions: {
        maintainAspectRatio: true,
        responsive: true,
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
          backgroundColor: 'rgba(23, 5, 75, 0.8)',
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
          text: 'Payout',
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
  computed: {
    chartDataSet () {
      return {
        type: 'doughnut',
        labels: this.staking.generators.map(g => g.generator),
        datasets: [{
          backgroundColor: 'rgba(128, 75, 201, 0.6)',
          label: '',
          data: this.staking.generators.map(g => g.share)
        }]
      }
    },
    ...mapGetters({
      staking: 'staking/getGenerators'
    })
  },
  created () {
    this.pollStaking()
  },
  mounted () {
    this.loading = false
  },
  beforeDestroy () {
    clearInterval(this.staking)
  },
  filters: {
    localeString (string) {
      return string.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      })
    },
    localeCurrency (string) {
      return string.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })
    },
    localePecentage (string) {
      return string.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })
    }
  },
  methods: {
    pollStaking () {
      // Fetch on render
      this.$store.dispatch('staking/fetchGenerators')

      // Refresh every minute
      this.staking = setInterval(() => {
        this.$store.dispatch('staking/fetchGenerators')
      }, 60000)
    },
    setColor (value) {
      if (value === 0) { return 'red' } else if (value === 1) { return 'green' } else { return 'dark' }
    }
  }
}
</script>
