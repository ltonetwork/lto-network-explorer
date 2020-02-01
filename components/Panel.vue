<template>
  <v-row class="mt-n12 mb-4">
    <v-col
      :cols="12"
      :sm="6"
      :md="3"
      :lg="3"
    >
      <v-card>
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
                :height="110"
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
  </v-row>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  components: {
  },
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters({
      market: 'dashboard/getMarket'
    })
  },
  created () {
    this.pollMarket()
  },
  beforeDestroy () {
    clearInterval(this.market)
  },
  methods: {
    pollMarket () {
      this.$store.dispatch('dashboard/fetchMarket')
      this.market = setInterval(() => {
        this.$store.dispatch('dashboard/fetchMarket')
      }, 60000)
    }
  }
}
</script>
