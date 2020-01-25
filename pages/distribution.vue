<template>
  <div>
    <v-row>
      <v-col>
        <v-card
          :loading="!loaded"
          :loader-height="10"
        >
          <v-card-title class="headline" style="color:#1a004b;">
            {{ $t('distribution.title') }}
          </v-card-title>

          <v-sheet>
            <v-card-text>
              <v-data-table
                :headers="holdersTable"
                :items="holders"
                :sort-by="['']"
                :sort-desc="[true]"
                :items-per-page="20"
                no-data-text=""
                item-key="address"
                calculate-widths
              >
                <template v-slot:item.address="{ item }">
                  <a :href="'/address/' + item.address">{{ item.address }}</a>
                </template>

                <template v-slot:item.regular="{ item }">
                  <v-chip color="light">
                    {{ item.regular.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    }) }} LTO
                  </v-chip>
                </template>

                <template v-slot:item.generating="{ item }">
                  <v-chip color="light">
                    {{ item.generating.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    }) }} LTO
                  </v-chip>
                </template>

                <template v-slot:item.available="{ item }">
                  <v-chip color="light">
                    {{ item.available.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    }) }} LTO
                  </v-chip>
                </template>

                <template v-slot:item.effective="{ item }">
                  <v-chip color="light">
                    {{ item.effective.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    }) }} LTO
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
            {{ $t('distribution.stats') }}
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
import DoughnutChart from '~/components/DoughnutChart'

export default {
  head () {
    return {
      title: this.$t('distribution.title')
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
  computed: mapGetters({
    holders: 'holders/get'
  }),
  async fetch ({ $axios, store, params }) {
    const holders = await $axios.$get(process.env.CACHE_API + '/address/top/100', {
      timeout: process.env.AXIOS_TIMEOUT
    })

    holders.forEach((holder) => {
      store.commit('holders/add', holder)
    })
  },
  mounted () {
    this.loadChart()
  },
  methods: {
    loadChart () {
      this.holders.forEach((address) => {
        this.chartData.labels.push(address.address)
        this.chartData.datasets[0].data.push(address.effective)

        const r = Math.random()
        const s = 180
        const color = 'rgba(126, 12,' + Math.round(r * s) + ',' + r.toFixed(1) + ')'
        this.chartData.datasets[0].backgroundColor.push(color)
      })

      this.loaded = true
    }
  }
}
</script>