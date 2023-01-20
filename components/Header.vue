<template>
  <div>
    <v-app-bar
      color="#17054B"
      class="white--text pt-10"
      prominent
      flat
    >
      <v-container>
        <v-row>
          <v-toolbar-title min-height="55px" style="text-transform:uppercase; font-size:1.6rem;">
            <nuxt-link :to="{ path: '/' }" class="white--text">
              <img :src="require('@/assets/logo.png')" class="mr-3" height="40" style="margin-bottom:-7px;">
              <span class="font-weight-black">LTO</span> Explorer
              <span v-if="is_testnet" class="testnet-label">TESTNET</span>
            </nuxt-link>
          </v-toolbar-title>

          <v-spacer />

          <v-toolbar-items v-for="(item, i) in menu" :key="i" class="hidden-sm-and-down">
            <v-btn
              :to="item.to"
              active-class="white--text"
              text
              style="text-transform: lowercase; color:rgba(255, 255, 255, 0.4);"
              min-height="55px"
            >
              <v-icon class="mr-2">
                {{ item.icon }}
              </v-icon>
              {{ item.title }}
            </v-btn>
          </v-toolbar-items>

          <v-toolbar-items class="hidden-sm-and-down">
            <v-btn
              :href="wallet.href"
              active-class="white--text"
              text
              style="text-transform: lowercase; color:rgba(255, 255, 255, 0.4);"
              min-height="55px"
            >
              <v-icon class="mr-2">
                {{ wallet.icon }}
              </v-icon>
              {{ wallet.title }}
              <v-icon xs-small class="mr-2">
                mdi-arrow-top-right
              </v-icon>
            </v-btn>
          </v-toolbar-items>

          <v-menu
            class="hidden-md-and-up"
            left
            bottom
            min-width="30vw"
          >
            <template v-slot:activator="{ on }">
              <v-btn
                icon
                class="white--text hidden-md-and-up"
                v-on="on"
              >
                <v-icon dark large>
                  mdi-dots-vertical
                </v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item
                v-for="(item, i) in menu"
                :key="i"
                :to="item.to"
              >
                <v-icon class="mr-2">
                  {{ item.icon }}
                </v-icon>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>

              <v-list-item
                :href="wallet.href"
              >
                <v-icon class="mr-2">
                  {{ wallet.icon }}
                </v-icon>
                <v-list-item-title>{{ wallet.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-row>
      </v-container>
    </v-app-bar>

    <v-toolbar
      :height="170"
      color="#17054B"
      class="white--text p-0"
      flat
    >
      <v-container>
        <v-row justify="center">
          <v-col
            :cols="12"
            :sm="12"
            :md="7"
          >
            <v-text-field
              id="search"
              v-model="query"
              solo-inverted
              hide-details
              single-line
              flat
              rounded
              prepend-inner-icon="mdi-magnify"
              background-color="rgba(255,255,255, 0.1)"
              color="white"
              class="search"
              clearable
              @keydown.enter="executeQuery"
            >
              <template v-slot:default="t">
                <span style="color:rgba(255,255,255, 0.4)">{{ t }}</span>
              </template>

              <template v-slot:prepend-inner>
                <v-icon style="color:rgba(255,255,255, 0.4)">
                  mdi-magnify
                </v-icon>
              </template>

              <template v-slot:label>
                <span style="color:rgba(255,255,255, 0.4)">{{ $t('search.label') }}</span>
              </template>
            </v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-toolbar>

    <v-snackbar
      v-model="alert"
      color="red"
      :top="true"
    >
      Invalid address
      <v-btn
        dark
        text
        @click="alert = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </div>
</template>
<script lang="ts">
  import Vue from 'vue'
  import { Component } from 'vue-property-decorator'
  import { translate } from '../plugins/translate'

  interface HeaderLinks {
    menu: HeaderLink[];
    wallet: HeaderLink;
  }

  interface HeaderLink {
    title: string;
    icon: string;
    to?: string;
    href?: string;
  }

  @Component({})

  export default class Header extends Vue {
    menu = [
      {
        title: translate('menu.overview'),
        icon: 'mdi-cube-outline',
        to: '/dashboard'
      },
      {
        title: translate('menu.nodes'),
        icon: 'mdi-hexagon-slice-6',
        to: '/nodes'
      },
      {
        title: translate('menu.staking'),
        icon: 'mdi-layers',
        to: '/staking'
      }
      /*
      {
        title: translate('menu.distribution'),
        icon: 'mdi-chart-donut',
        to: '/distribution'
      }
      */
    ]

    is_testnet = process.env.NETWORK_ID === 'T'

    wallet = {
      title: translate('menu.wallet'),
      icon: 'mdi-coins',
      href: process.env.WALLET_LINK!
    }

    montly_roi = 0
    yearly_roi = 0

    query: string | null = null;
    valid = false;
    url: string | null = null;
    alert = false;

    validateQuery(): void {
      // Reset
      this.valid = false

      if (this.query !== null) {
        // Block
        if (Number.isInteger(+this.query) && this.query.length <= 7) {
          this.valid = true
          this.url = '/block/' + this.query
          // Address
        } else if (this.query.length === 35) {
          this.valid = true
          this.url = '/address/' + this.query
          // Tx
        } else if (this.query.length === 44) {
          this.valid = true
          this.url = '/transaction/' + this.query
        } else if (this.query.length === 43) {
          // Script

          // TODO
          //
          // LTO Network Node does not come with the
          // functionality to look up transaction type
          // 13 (script). For now it returns an error
          // message, however, api.lto.node supports
          // type 13: eg: https://api.lto.cloud/v1/transaction/7cP2Z5PF4Y4Hy94pbBryRRkAiZq8A6p5smaygEapQxR
          //
          // Note: this is the only known type 13 tx known
          // to exist on  the LTO blockchain, hence for now
          // its ignored on grounds of common sense.

          this.valid = false

          // TODO
          //
          // Display error message
          // eslint-disable-next-line no-console
          console.error('transaction type 13 (script) not supported')
        }
      }
    }

    executeQuery(): void {
      this.validateQuery()
      if (this.valid) {
        return (this as any).$nuxt.$router.push(this.url!)
      }
      this.alert = true
    }

    calculateRIO(): void {
      //  SUM(FEE 30 days) /30  / SUM(Stake)= avarage ROI last 3

      this.montly_roi = 0
      this.yearly_roi = 0
    }
  }

</script>

<style lang="scss">
  #search {
    color: white !important;
  }

  .search {
    .theme--light.v-icon {
      color: white;
    }
  }

  .testnet-label {
    font-size: 0.5em;
    padding: 2px 5px;
    background-color: rgba(255, 255, 255, 0.2);
  }
</style>
