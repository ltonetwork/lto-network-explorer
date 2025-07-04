<template>
  <v-row class="mt-n12 mb-4">
    <v-col :cols="12" :sm="6" :md="6" :lg="6" :xl="3">
      <v-card :loading="!market.updated" height="100%">
        <v-card-text class="pt-4 pb-2 pl-7 pr-7">
          <v-row>
            <v-col
              :cols="6"
              :sm="6"
              :md="6"
              :lg="6"
              class="pt-0 pb-1 pl-0 pr-0"
            >
              <v-card-subtitle class="pa-0" v-text="$t('panel.price')" />
            </v-col>
            <v-col
              :cols="6"
              :sm="6"
              :md="6"
              :lg="6"
              class="pt-0 pb-2 pl-0 pr-0 text-right"
            >
              <span
                v-if="market.price.change.relative > 0"
                class="caption green--text ma-0"
              >
                <v-icon x-small color="green">mdi-arrow-up</v-icon>
                {{ market.price.change.relative | parseNumber }}%
              </span>

              <span
                v-if="market.price.change.relative < 0"
                class="caption red--text ma-0"
              >
                <v-icon x-small color="red">mdi-arrow-down</v-icon>
                {{ market.price.change.relative | parseNumber }}%
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
                ${{ market.price.currency.usd | parseNumber }}
              </span>

              <p class="overline grey--text ma-0 mt-2">
                (CoinGecko)
              </p>
            </v-col>
            <v-col :cols="6" :sm="6" :md="6" :lg="6" class="pa-0">
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

    <v-col :cols="12" :sm="6" :md="6" :lg="6" :xl="3">
      <v-card :loading="!nodesCount.updated" height="100%">
        <v-card-text class="pt-4 pb-3 pl-7 pr-7">
          <v-row>
            <v-col
              :cols="6"
              :sm="6"
              :md="6"
              :lg="6"
              class="pt-0 pb-1 pl-0 pr-0"
            >
              <v-card-subtitle class="pa-0" v-text="$t('panel.nodes')" />
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
                {{ nodesCount.active | parseString }}
              </span>

              <p class="overline grey--text ma-0 mt-2">
                (LTO Tools)
              </p>
            </v-col>
            <v-col
              :cols="6"
              :sm="6"
              :md="6"
              :lg="6"
              class="pa-0 d-flex align-end justify-end"
            >
              <span class="caption grey--text ma-0">
                {{ nodesCount.updated | fromNow }}
              </span>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col :cols="12" :sm="6" :md="6" :lg="6" :xl="3">
      <v-card :loading="!staking.updated" height="100%">
        <v-card-text class="pt-4 pb-3 pl-7 pr-7">
          <v-row>
            <v-col
              :cols="6"
              :sm="6"
              :md="6"
              :lg="6"
              class="pt-0 pb-1 pl-0 pr-0"
            >
              <v-card-subtitle class="pa-0" v-text="$t('panel.staking')" />
            </v-col>
            <v-col
              :cols="6"
              :sm="6"
              :md="6"
              :lg="6"
              class="pt-0 pb-2 pl-0 pr-0 text-right"
            >
              <span class="caption grey--text ma-0">(1w)</span>
            </v-col>
          </v-row>

          <v-row>
            <v-col :cols="6" :sm="6" class="pt-1 pb-0 pl-0 pr-0">
              <span class="title font-weight-bold secondary--text">
                {{ staking.total | parseNumber }}
              </span>

              <p class="overline grey--text ma-0 mt-2">
                (LTO Tools)
              </p>
            </v-col>
            <v-col
              :cols="6"
              :sm="6"
              :md="6"
              :lg="6"
              class="pa-0 d-flex align-end justify-end"
            >
              <span class="caption grey--text ma-0">
                {{ staking.updated | fromNow }}
              </span>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col :cols="12" :sm="6" :md="6" :lg="6" :xl="3">
      <v-card :loading="!burn.updated" height="100%">
        <v-card-text class="pt-4 pb-3 pl-7 pr-7">
          <v-row>
            <v-col
              :cols="6"
              :sm="6"
              :md="6"
              :lg="6"
              class="pt-0 pb-1 pl-0 pr-0"
            >
              <v-card-subtitle class="pa-0" v-text="$t('panel.burned')" />
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
            <v-col :cols="6" :sm="6" class="pt-1 pb-0 pl-0 pr-0">
              <span class="title font-weight-bold secondary--text">
                {{ burn.total | parseNumber }}
              </span>

              <p class="overline grey--text ma-0 mt-2">
                &nbsp;
              </p>
            </v-col>
            <v-col
              :cols="6"
              :sm="6"
              :md="6"
              :lg="6"
              class="pa-0 d-flex align-end justify-end"
            >
              <span class="caption grey--text ma-0">
                {{ burn.updated | fromNow }}
              </span>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
<script lang="ts">
  import Vue from 'vue'
  import { mapGetters } from 'vuex'
  import { Component } from 'vue-property-decorator'

  @Component({
    computed: {
      ...mapGetters({
        market: 'panel/getMarket',
        nodesCount: 'panel/getNodes',
        staking: 'panel/getStaking',
        burn: 'panel/getBurn',
        network: 'panel/getNetwork'
      })
    }
  })
  export default class Panel extends Vue {
    marketTimer: ReturnType<typeof setInterval> | undefined = undefined;
    nodesCountTimer: ReturnType<typeof setInterval> | undefined = undefined;
    stakingTimer: ReturnType<typeof setInterval> | undefined = undefined;
    burnedTimer: ReturnType<typeof setInterval> | undefined = undefined;
    networkTimer: ReturnType<typeof setInterval> | undefined = undefined;

    created(): void {
      this.pollMarket()
      this.pollNodes()
      this.pollStaking()
      this.pollBurned()
      this.pollNetwork()
    }

    beforeDestroy(): void {
      if (this.marketTimer) {
        clearInterval(this.marketTimer)
      }

      if (this.nodesCountTimer) {
        clearInterval(this.nodesCountTimer)
      }

      if (this.stakingTimer) {
        clearInterval(this.stakingTimer)
      }

      if (this.burnedTimer) {
        clearInterval(this.burnedTimer)
      }

      if (this.networkTimer) {
        clearInterval(this.networkTimer)
      }
    }

    pollMarket(): void {
      // Fetch on render
      this.$store.dispatch('panel/fetchMarket')

      // Refresh every minute
      this.marketTimer = setInterval(() => {
        this.$store.dispatch('panel/fetchMarket')
      }, 60000)
    }

    pollNodes(): void {
      // Fetch on render
      this.$store.dispatch('panel/fetch')

      // Refresh every minute
      this.nodesCountTimer = setInterval(() => {
        this.$store.dispatch('panel/fetch')
      }, 60000)
    }

    pollStaking(): void {
      // Fetch on render
      this.$store.dispatch('panel/fetchStaking')

      // Refresh every minute
      this.stakingTimer = setInterval(() => {
        this.$store.dispatch('panel/fetchStaking')
      }, 60000)
    }

    pollBurned(): void {
      // Fetch on render
      this.$store.dispatch('panel/fetchBurned')

      // Refresh every minute
      this.burnedTimer = setInterval(() => {
        this.$store.dispatch('panel/fetchBurned')
      }, 60000)
    }

    pollNetwork(): void {
      // Fetch on render
      this.$store.dispatch('panel/fetchNetwork')

      // Refresh every minute
      this.networkTimer = setInterval(() => {
        this.$store.dispatch('panel/fetchNetwork')
      }, 60000)
    }
  }
</script>
