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
          :loading="!top.updated"
          :loader-height="10"
        >
          <v-card-title class="secondary--text">
            <span class="mr-2 lto-distribution" />
            {{ $t('distribution.title') }}
          </v-card-title>

          <v-sheet>
            <v-card-text class="pa-0">
              <v-data-table
                v-if="top.updated"
                :headers="topTable"
                :items="top.holders"
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
                  {{ item.regular | parseNumber }}
                </template>

                <template v-slot:item.generating="{ item }">
                  {{ item.generating | parseNumber }}
                </template>

                <template v-slot:item.available="{ item }">
                  {{ item.available | parseNumber }}
                </template>

                <template v-slot:item.effective="{ item }">
                  {{ item.effective | parseNumber }}
                </template>
              </v-data-table>
            </v-card-text>
            <v-skeleton-loader
              v-if="!top.updated"
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
          :loading="!supply.updated"
          :loader-height="10"
        >
          <v-card-title class="secondary--text">
            <span class="mr-2 lto-transactions" />
            {{ $t('distribution.supply') }}
          </v-card-title>
          <v-sheet>
            <v-card-text class="pa-0">
              <v-simple-table class="secondary--text">
                <tbody>
                  <tr>
                    <th class="overline text-left grey--text">
                      {{ $t('distribution.initial_supply') }}
                    </th>
                    <th class="body-2 text-right">
                      {{ supply.stats.initial_supply | parseNumber }} LTO
                    </th>
                  </tr>
                  <tr>
                    <td class="overline text-left grey--text">
                      {{ $t('distribution.burned_supply') }}
                    </td>
                    <td class="text-right">
                      - {{ supply.stats.burned_supply | parseNumber }} LTO
                    </td>
                  </tr>
                  <tr>
                    <td class="overline text-left grey--text">
                      {{ $t('distribution.total_supply') }}
                    </td>
                    <td class="text-right">
                      {{ supply.stats.total_supply | parseNumber }} LTO
                    </td>
                  </tr>
                </tbody>
              </v-simple-table>
            </v-card-text>

            <v-skeleton-loader
              v-if="!supply.updated"
              class="mx-auto"
              type="table"
              loading
            />
          </v-sheet>
        </v-card>

        <v-card
          :loading="!supply.updated"
          :loader-height="10"
          class="mt-6"
        >
          <v-sheet>
            <v-card-text class="pa-0">
              <v-simple-table class="secondary--text">
                <tbody>
                  <tr>
                    <th class="overline text-left grey--text">
                      {{ $t('distribution.circulating_mainnet') }}
                    </th>
                    <th class="body-2 text-right">
                      {{ supply.stats.circulating_mainnet | parseNumber }} LTO
                    </th>
                  </tr>
                  <tr>
                    <td class="overline text-left grey--text">
                      {{ $t('distribution.private_supply_mainnet') }}
                    </td>
                    <td class="text-right">
                      {{ supply.stats.private_supply_mainnet | parseNumber }} LTO
                    </td>
                  </tr>
                  <tr>
                    <th class="overline text-left grey--text">
                      {{ $t('distribution.circulating_erc20') }}
                    </th>
                    <th class="body-2 text-right">
                      {{ supply.stats.circulating_erc20 | parseNumber }} LTO
                    </th>
                  </tr>
                  <tr>
                    <td class="overline text-left grey--text">
                      {{ $t('distribution.private_supply_erc20') }}
                    </td>
                    <td class="text-right">
                      {{ supply.stats.private_supply_erc20 | parseNumber }} LTO
                    </td>
                  </tr>
                </tbody>
              </v-simple-table>
            </v-card-text>

            <v-skeleton-loader
              v-if="!supply.updated"
              class="mx-auto"
              type="table"
              loading
            />
          </v-sheet>
        </v-card>

        <v-card
          :loading="!supply.updated"
          :loader-height="10"
          class="mt-6"
        >
          <v-sheet>
            <v-card-text class="pa-0">
              <v-simple-table class="secondary--text">
                <tbody>
                  <tr>
                    <th class="overline text-left grey--text">
                      {{ $t('distribution.burn_rate') }}
                    </th>
                    <th class="body-2 text-right">
                      {{ bridge.toll.burn_rate }} %
                    </th>
                  </tr>
                  <tr>
                    <td class="overline text-left grey--text">
                      {{ $t('distribution.burned_supply') }}
                    </td>
                    <td class="text-right">
                      {{ bridge.toll.burned | parseNumber }} LTO
                    </td>
                  </tr>
                </tbody>
              </v-simple-table>
            </v-card-text>

            <v-skeleton-loader
              v-if="!supply.updated"
              class="mx-auto"
              type="table"
              loading
            />
          </v-sheet>
        </v-card>

        <v-card
          :loading="!top.updated"
          :loader-height="10"
          class="mt-6"
        >
          <v-sheet>
            <v-card-text>
              <figure class="chart">
                <DoughnutChart
                  v-if="top.updated"
                  :chart-data="topChartData"
                  :chart-options="chartOptions"
                  :height="300"
                />
              </figure>
            </v-card-text>
            <v-skeleton-loader
              v-if="!top.updated"
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

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import { Component } from 'vue-property-decorator'
import { translate } from '../locales/index'
import Panel from '../components/Panel.vue'
import DoughnutChart from '../components/DoughnutChart.vue'

@Component({
  head () {
    return {
      title: translate('distribution.title')
    }
  },
  components: {
    Panel,
    DoughnutChart
  },
  computed: {
    ...mapGetters({
      top: 'distribution/getTop',
      supply: 'distribution/getSupply',
      bridge: 'distribution/getBridge'
    }),
    topChartData () {
      /* Again, this.top is a timer, not an object.. */
      return {
        type: 'doughnut',
        labels: (this as any).top.holders.map((g: unknown) => (g as any).address),
        datasets: [{
          backgroundColor: 'rgba(128, 75, 201, 0.6)',
          label: '',
          data: (this as any).top.holders.map((g: unknown) => (g as any).regular)
        }]
      }
    },
    bridgeChartData () {
      return {
        type: 'doughnut',
        // labels: this.bridge.volume.map((v, i) => v[i].address),
        datasets: [{
          backgroundColor: 'rgba(128, 75, 201, 0.6)',
          label: ''
        // data: this.bridge.volume.map((v, i) => v[i].total)
        }]
      }
    }
  }
})

class Distribution extends Vue {
  chartOptions = {
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
      backgroundColor: 'rgba(23, 5, 75, 1)',
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
  }

  topTable = [
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

  topTimer: ReturnType<typeof setInterval> | undefined = undefined
  supplyTimer: ReturnType<typeof setInterval> | undefined = undefined
  bridgeTimer: ReturnType<typeof setInterval> | undefined = undefined

  created (): void {
    this.pollTop()
    this.pollSupply()
    this.pollBridge()
  }

  beforeDestroy (): void {
    if (this.topTimer) {
      clearInterval(this.topTimer)
    }

    if (this.supplyTimer) {
      clearInterval(this.supplyTimer)
    }

    if (this.bridgeTimer) {
      clearInterval(this.bridgeTimer)
    }
  }

  pollTop (): void {
    // Fetch on render
    this.$store.dispatch('distribution/fetchTop')

    // Refresh every minute
    this.topTimer = setInterval(() => {
      this.$store.dispatch('distribution/fetchTop')
    }, 60000)
  }

  pollSupply (): void {
    // Fetch on render
    this.$store.dispatch('distribution/fetchSupply')

    // Refresh every minute
    this.supplyTimer = setInterval(() => {
      this.$store.dispatch('distribution/fetchSupply')
    }, 60000)
  }

  pollBridge (): void {
    // Fetch on render
    this.$store.dispatch('distribution/fetchBridge')

    // Refresh every minute
    this.bridgeTimer = setInterval(() => {
      this.$store.dispatch('distribution/fetchBridge')
    }, 60000)
  }
}

export default Distribution
</script>
