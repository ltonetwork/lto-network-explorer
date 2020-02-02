<template>
  <div>
    <Panel />
    <v-row>
      <v-col
        :cols="12"
        :sm="12"
        :md="12"
        :lg="8"
      >
        <v-card
          :loading="!distribution.updated"
          :loader-height="10"
        >
          <v-card-title class="secondary--text">
            <span class="mr-2 lto-distribution" />
            {{ $t('distribution.title') }}
          </v-card-title>

          <v-sheet>
            <v-card-text class="pa-0">
              <v-data-table
                v-if="distribution.updated"
                :headers="holdersTable"
                :items="distribution.holders"
                :sort-by="['']"
                :sort-desc="[true]"
                :items-per-page="20"
                item-key="address"
                class="secondary--text"
              >
                <template v-slot:header.address="{ header }">
                  <span class="overline grey--text">{{ header.text }}</span>
                </template>

                <template v-slot:header.regular="{ header }">
                  <span class="overline grey--text">{{ header.text }}</span>
                </template>

                <template v-slot:header.generating="{ header }">
                  <span class="overline grey--text">{{ header.text }}</span>
                </template>

                <template v-slot:header.available="{ header }">
                  <span class="overline grey--text">{{ header.text }}</span>
                </template>

                <template v-slot:header.effective="{ header }">
                  <span class="overline grey--text">{{ header.text }}</span>
                </template>

                <template v-slot:item.address="{ item }">
                  <nuxt-link :to="{ path: '/address/' + item.address }" class="d-inline-block primary--text text-truncate" style="max-width: 26vh;">
                    {{ item.address }}
                  </nuxt-link>
                </template>

                <template v-slot:item.regular="{ item }">
                  {{ item.regular | localeCurrency }}
                </template>

                <template v-slot:item.generating="{ item }">
                  {{ item.generating | localeCurrency }}
                </template>

                <template v-slot:item.available="{ item }">
                  {{ item.available | localeCurrency }}
                </template>

                <template v-slot:item.effective="{ item }">
                  {{ item.effective | localeCurrency }}
                </template>
              </v-data-table>
            </v-card-text>
            <v-skeleton-loader
              v-if="!distribution.updated"
              class="mx-auto"
              type="table"
              loading
            />
          </v-sheet>
        </v-card>
      </v-col>

      <v-col
        :cols="12"
        :sm="12"
        :md="12"
        :lg="4"
      >
        <v-card
          :loading="!distribution.updated"
          :loader-height="10"
        >
          <v-sheet>
            <v-card-text>
              <figure class="chart">
                <DoughnutChart
                  v-if="distribution.updated"
                  :chartData="chartDataSet"
                  :chartOptions="chartOptions"
                  :height="300"
                />
              </figure>
            </v-card-text>
            <v-skeleton-loader
              v-if="!distribution.updated"
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
import Panel from '~/components/Panel'
import DoughnutChart from '~/components/DoughnutChart'

export default {
  head () {
    return {
      title: this.$t('distribution.title')
    }
  },
  components: {
    Panel,
    DoughnutChart
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
  data () {
    return {
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
      holdersTable: [
        {
          text: 'Address',
          align: 'left',
          value: 'address'
        },
        {
          text: 'Regular',
          align: 'center',
          value: 'regular'
        },
        {
          text: 'Generating',
          align: 'center',
          value: 'generating'
        },
        {
          text: 'Available',
          align: 'center',
          value: 'available'
        },
        {
          text: 'Effective',
          align: 'center',
          value: 'effective'
        }
      ]
    }
  },
  computed: {
    chartDataSet () {
      return {
        type: 'doughnut',
        labels: this.distribution.holders.map(g => g.address),
        datasets: [{
          backgroundColor: 'rgba(128, 75, 201, 0.6)',
          label: '',
          data: this.distribution.holders.map(g => g.regular)
        }]
      }
    },
    ...mapGetters({
      distribution: 'distribution/getDistribution'
    })
  },
  created () {
    this.pollHolders()
  },
  beforeDestroy () {
    clearInterval(this.distribution)
  },
  methods: {
    pollHolders () {
      // Fetch on render
      this.$store.dispatch('distribution/fetchHolders')

      // Refresh every minute
      this.distribution = setInterval(() => {
        this.$store.dispatch('distribution/fetchHolders')
      }, 60000)
    }
  }
}
</script>
