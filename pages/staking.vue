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
          :loading="!staking.updated"
          :loader-height="10"
        >
          <v-card-title class="secondary--text">
            <span class="mr-2 lto-block" />
            {{ $t('staking.title') }}
          </v-card-title>
          <v-sheet>
            <v-card-text class="pa-0">
              <v-data-table
                v-if="staking.updated"
                :headers="headers"
                :items="staking.generators"
                :sort-by="['share']"
                :sort-desc="[true]"
                :items-per-page="20"
                item-key="generator"
                class="secondary--text"
              >
                <template v-slot:header.payout="{ header }">
                  <span class="overline grey--text">{{ header.text }}</span>
                </template>

                <template v-slot:header.label="{ header }">
                  <span class="overline grey--text">{{ header.text }}</span>
                </template>

                <template v-slot:header.generator="{ header }">
                  <span class="overline grey--text">{{ header.text }}</span>
                </template>

                <template v-slot:header.pool="{ header }">
                  <span class="overline grey--text">{{ header.text }}</span>
                </template>

                <template v-slot:header.blocks="{ header }">
                  <span class="overline grey--text">{{ header.text }}</span>
                </template>

                <template v-slot:header.earnings="{ header }">
                  <span class="overline grey--text">{{ header.text }}</span>
                </template>

                <template v-slot:header.share="{ header }">
                  <span class="overline grey--text">{{ header.text }}</span>
                </template>

                <template v-slot:item.payout="{ item }">
                  <v-tooltip right>
                    <template v-slot:activator="{ on }">
                      <v-icon v-if="item.payout" color="green" v-on="on">
                        mdi-check
                      </v-icon>
                    </template>
                    <span>payout: {{ item.payout }}</span>
                  </v-tooltip>
                </template>

                <template v-slot:item.label="{ item }">
                  {{ item.label }}
                </template>

                <template v-slot:item.generator="{ item }">
                  <nuxt-link :to="{ path: '/address/' + item.generator }" class="d-inline-block primary--text">
                    {{ item.generator | truncateString }}
                  </nuxt-link>
                </template>

                <template v-slot:item.pool="{ item }">
                  {{ item.pool | parseNumber }}
                </template>

                <template v-slot:item.blocks="{ item }">
                  {{ item.blocks | parseString }}
                </template>

                <template v-slot:item.earnings="{ item }">
                  {{ item.earnings | parseNumber }}
                </template>

                <template v-slot:item.share="{ item }">
                  {{ item.share | parseNumber }}%
                </template>
              </v-data-table>
            </v-card-text>

            <v-skeleton-loader
              v-if="!staking.updated"
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
          :loading="!staking.updated"
          :loader-height="10"
        >
          <v-sheet>
            <v-card-text>
              <figure class="chart">
                <DoughnutChart
                  v-if="staking.updated"
                  :chart-data="chartDataSet"
                  :chart-options="chartOptions"
                  :height="300"
                />
              </figure>
            </v-card-text>
            <v-skeleton-loader
              v-if="!staking.updated"
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
  import { ChartData, ChartType } from 'chart.js'
  import { mapGetters } from 'vuex'
  import { Component } from 'vue-property-decorator'
  import { translate } from '../plugins/translate'
  import DoughnutChart from '../components/DoughnutChart.vue'
  import Panel from '../components/Panel.vue'

  @Component({
    head() {
      return {
        title: translate('staking.title')
      }
    },
    components: {
      Panel,
      DoughnutChart
    },
    computed: {
      chartDataSet(): ChartData & { type: ChartType } {
        return {
          type: 'doughnut',
          labels: (this as any).staking.generators.map(
            (g: any) => g.label ? `${g.generator} | ${g.label}` : g.generator
          ),
          datasets: [{
            backgroundColor: 'rgba(128, 75, 201, 0.6)',
            label: '',
            data: (this as any).staking.generators.map((g: unknown) => (g as any).share)
          }]
        }
      },
      ...mapGetters({
        staking: 'staking/getGenerators'
      })
    }
  })

  class Staking extends Vue {
    chartData = {
      type: 'doughnut',
      datasets: [{
        data: null,
        backgroundColor: null,
        label: null
      }],
      labels: null
    }

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

    headers = [
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
        text: 'Forged Blocks',
        align: 'center',
        value: 'blocks'
      },
      {
        text: 'Share',
        align: 'center',
        value: 'share'
      }
    ]

    stakingTimer: ReturnType<typeof setInterval> | undefined = undefined;

    created(): void {
      this.pollStaking()
    }

    beforeDestroy(): void {
      if (this.stakingTimer) {
        clearInterval(this.stakingTimer)
      }
    }

    pollStaking(): void {
      // Fetch on render
      this.$store.dispatch('staking/fetchGenerators')

      // Refresh every minute
      this.stakingTimer = setInterval(() => {
        this.$store.dispatch('staking/fetchGenerators')
      }, 60000)
    }

    setColor(value: number): string {
      if (value === 0) {
        return 'red'
      } else if (value === 1) {
        return 'green'
      } else {
        return 'dark'
      }
    }
  }

  export default Staking
</script>
