<template>
  <v-row class="mt-n12 mb-4">
    <v-col
      :cols="12"
      :sm="6"
      :md="3"
      :lg="3"
    >
      <v-card :loading="loading">
        <v-card-text class="pt-4 pb-2 pl-7 pr-7">
          <v-row>
            <v-col
              :cols="6"
              :sm="6"
              :md="6"
              :lg="6"
              class="pt-0 pb-1 pl-0 pr-0"
            >
              <v-card-subtitle v-text="$t('panel.price')" class="pa-0" />
            </v-col>
            <v-col
              :cols="6"
              :sm="6"
              :md="6"
              :lg="6"
              class="pt-0 pb-2 pl-0 pr-0 text-right"
            >
              <span v-if="market.price.change.relative > 0" class="caption green--text ma-0">
                <v-icon x-small color="green">mdi-arrow-up</v-icon>
                {{ market.price.change.relative.toLocaleString(undefined, {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 2
                }) }}
              </span>

              <span v-if="market.price.change.relative < 0" class="caption red--text ma-0">
                <v-icon x-small color="red">mdi-arrow-down</v-icon>
                {{ market.price.change.relative.toLocaleString(undefined, {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 2
                }) }}
              </span>

              <span class="caption grey--text ma-0">(24h)</span>
            </v-col>
          </v-row>

          <v-row>
            <v-col
              :cols="6"
              :sm="6"
              :md="6"
              :lg="6"
              class="pt-1 pb-0 pl-0 pr-0"
            >
              <span class="title font-weight-bold secondary--text">
                €{{ market.price.currency.eur.toLocaleString(undefined, {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 2
                }) }}
              </span>

              <p class="overline grey--text ma-0">
                (CoinGecko)
              </p>
            </v-col>
            <v-col
              :cols="6"
              :sm="6"
              :md="6"
              :lg="6"
              class="pa-0"
            >
              <v-sparkline
                :gradient="['#804BC9', 'rgba(249, 246, 252, .6)']"
                :padding="0"
                :smooth="15"
                :value="market.sparkline"
                fill
              />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col
      :cols="12"
      :sm="6"
      :md="3"
      :lg="3"
    >
      <v-card :loading="loading">
        <v-card-text class="pt-4 pb-3 pl-7 pr-7">
          <v-row>
            <v-col
              :cols="6"
              :sm="6"
              :md="6"
              :lg="6"
              class="pt-0 pb-1 pl-0 pr-0"
            >
              <v-card-subtitle v-text="$t('panel.nodes')" class="pa-0" />
            </v-col>
            <v-col
              :cols="6"
              :sm="6"
              :md="6"
              :lg="6"
              class="pt-0 pb-2 pl-0 pr-0 text-right"
            />
          </v-row>

          <v-row>
            <v-col
              :cols="6"
              :sm="6"
              :md="6"
              :lg="6"
              class="pt-1 pb-0 pl-0 pr-0"
            >
              <span class="title font-weight-bold secondary--text">
                {{ nodes.active.toLocaleString(undefined, {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0
                }) }}
              </span>

              <p class="overline grey--text ma-0">
                (LTO Services)
              </p>
            </v-col>
            <v-col
              :cols="6"
              :sm="6"
              :md="6"
              :lg="6"
              class="pa-0 d-flex align-end justify-end"
            >
              <span class="caption grey--text ma-0">{{ nodes.updated }}</span>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col
      :cols="12"
      :sm="6"
      :md="3"
      :lg="3"
    >
      <v-card :loading="loading">
        <v-card-text class="pt-4 pb-3 pl-7 pr-7">
          <v-row>
            <v-col
              :cols="6"
              :sm="6"
              :md="6"
              :lg="6"
              class="pt-0 pb-1 pl-0 pr-0"
            >
              <v-card-subtitle v-text="$t('panel.staking')" class="pa-0" />
            </v-col>
            <v-col
              :cols="6"
              :sm="6"
              :md="6"
              :lg="6"
              class="pt-0 pb-2 pl-0 pr-0 text-right"
            />
          </v-row>

          <v-row>
            <v-col
              :cols="6"
              :sm="6"
              :md="6"
              :lg="6"
              class="pt-1 pb-0 pl-0 pr-0"
            >
              <span class="title font-weight-bold secondary--text">
                {{ staking.total.toLocaleString(undefined, {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0
                }) }} LTO
              </span>

              <p class="overline grey--text ma-0">
                (LTO Services)
              </p>
            </v-col>
            <v-col
              :cols="6"
              :sm="6"
              :md="6"
              :lg="6"
              class="pa-0 d-flex align-end justify-end"
            >
              <span class="caption grey--text ma-0">{{ staking.updated }}</span>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col
      :cols="12"
      :sm="6"
      :md="3"
      :lg="3"
    >
      <v-card :loading="loading">
        <v-card-text class="pt-4 pb-3 pl-7 pr-7">
          <v-row>
            <v-col
              :cols="6"
              :sm="6"
              :md="6"
              :lg="6"
              class="pt-0 pb-1 pl-0 pr-0"
            >
              <v-card-subtitle v-text="$t('panel.height')" class="pa-0" />
            </v-col>
            <v-col
              :cols="6"
              :sm="6"
              :md="6"
              :lg="6"
              class="pt-0 pb-2 pl-0 pr-0 text-right"
            />
          </v-row>

          <v-row>
            <v-col
              :cols="6"
              :sm="6"
              :md="6"
              :lg="6"
              class="pt-1 pb-0 pl-0 pr-0"
            >
              <span class="title font-weight-bold secondary--text">
                {{ network.height.toLocaleString(undefined, {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0
                }) }}
              </span>

              <p class="overline grey--text ma-0">
                (LTO Services)
              </p>
            </v-col>
            <v-col
              :cols="6"
              :sm="6"
              :md="6"
              :lg="6"
              class="pa-0 d-flex align-end justify-end"
            >
              <span class="caption grey--text ma-0">{{ network.updated }}</span>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  components: {
  },
  data () {
    return {
      loading: true
    }
  },
  computed: {
    ...mapGetters({
      market: 'dashboard/getMarket',
      nodes: 'dashboard/getNodes',
      staking: 'dashboard/getStaking',
      network: 'dashboard/getNetwork'
    })
  },
  created () {
    this.pollMarket()
    this.pollNodes()
    this.pollStaking()
    this.pollNetwork()
  },
  mounted () {
    this.loading = false
  },
  beforeDestroy () {
    clearInterval(this.market)
    clearInterval(this.nodes)
    clearInterval(this.staking)
    clearInterval(this.network)
  },
  methods: {
    pollMarket () {
      // Fetch on render
      this.$store.dispatch('dashboard/fetchMarket')

      // Refresh every minute
      this.market = setInterval(() => {
        this.$store.dispatch('dashboard/fetchMarket')
      }, 60000)
    },
    pollNodes () {
      // Fetch on render
      this.$store.dispatch('dashboard/fetchNodes')

      // Refresh every minute
      this.nodes = setInterval(() => {
        this.$store.dispatch('dashboard/fetchNodes')
      }, 60000)
    },
    pollStaking () {
      // Fetch on render
      this.$store.dispatch('dashboard/fetchStaking')

      // Refresh every minute
      this.nodes = setInterval(() => {
        this.$store.dispatch('dashboard/fetchStaking')
      }, 60000)
    },
    pollNetwork () {
      // Fetch on render
      this.$store.dispatch('dashboard/fetchNetwork')

      // Refresh every minute
      this.nodes = setInterval(() => {
        this.$store.dispatch('dashboard/fetchNetwork')
      }, 60000)
    }
  }
}
</script>
