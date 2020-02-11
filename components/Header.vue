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

              <v-list-item @click="calculator = true">
                <v-icon class="mr-2">
                  mdi-calculator
                </v-icon>
                <v-list-item-title>{{ $t('calculator.title') }}</v-list-item-title>
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
            :md="8"
            :lg="6"
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
              @focus="focus"
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

          <v-col
            :cols="0"
            :sm="0"
            :md="2"
            :lg="2"
          >
            <v-btn
              class="hidden-sm-and-down"
              color="rgba(255,255,255,0.1)"
              rounded
              outlined
              large
              @click.stop="calculator = true"
            >
              {{ $t('calculator.title') }}
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-toolbar>

    <v-dialog
      v-model="calculator"
      max-width="600"
    >
      <v-card>
        <v-card-title class="headline font-weight-bold secondary--text">
          <span class="mr-2 lto-calculator" />
          {{ $t('calculator.modal_title') }}

          <v-spacer />

          <v-btn
            color="grey"
            text
            class="mr-n6 mt-n3"
            @click.native="calculator = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-row class="text-center">
            <v-col
              :cols="6"
              :sm="6"
              :md="6"
              :xl="6"
            >
              <v-form
                ref="form"
              >
                <v-text-field
                  :hint="$t('calculator.active_leases')"
                  :value="10000"
                  persistent-hint
                  single-line
                  color="secondary"
                  type="number"
                />
                <v-text-field
                  :hint="$t('calculator.total_tx')"
                  :value="100000"
                  persistent-hint
                  single-line
                  color="secondary"
                  type="number"
                />
                <v-text-field
                  :hint="$t('calculator.total_fees')"
                  :value="15000"
                  disabled
                  persistent-hint
                  single-line
                  color="secondary"
                  type="number"
                />
              </v-form>
            </v-col>
            <v-col
              :cols="6"
              :sm="6"
              :md="6"
              :xl="6"
            >
              <v-form
                ref="form"
              >
                <v-text-field
                  :hint="$t('calculator.leasing')"
                  :value="0"
                  persistent-hint
                  single-line
                  color="secondary"
                  type="number"
                />
              </v-form>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions class="secondary white--text">
          <v-spacer />
          <span class="overline grey--text mr-5">{{ $t('calculator.roi_monthly') }}</span>
          <span class="body-1">{{ montly_roi }} %</span>

          <v-spacer />

          <span class="overline grey--text mr-5">{{ $t('calculator.roi_yearly') }}</span>
          <span class="body-1">{{ yearly_roi }} %</span>

          <v-spacer />

          <v-btn
            href="https://blog.ltonetwork.com/staking-and-leasing-lto-network-node-guide/"
            color="primary"
            text
          >
            <v-icon class="pa-0" small>
              mdi-help-circle
            </v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Component, Watch } from 'vue-property-decorator'
import { translate } from '../locales/index'

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

class Header extends Vue {
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
    },
    {
      title: translate('menu.distribution'),
      icon: 'mdi-chart-donut',
      to: '/distribution'
    }
  ]

  wallet = {
    title: translate('menu.wallet'),
    icon: 'mdi-coins',
    href: 'https://wallet.lto.network/'
  }

  calculator = false

  montly_roi = 0
  yearly_roi = 0

  query: string | null = null;
  valid = false;
  url: string | null = null;

  @Watch('query')
  onQueryChanged (): void {
    this.validateQuery()
  }

  focus (e: number): void {
    // console.log(e)
  }

  validateQuery (): void {
    // Reset
    this.valid = false

    if (this.query !== null) {
      // Block
      if (Number.isInteger(+this.query) && this.query.length <= 6) {
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
        console.error('transaction type 13 (script) not supported')
      }
    }
  }

  executeQuery (): void {
    if (this.valid) {
      (this as any).$nuxt.$router.push(this.url!)
    }
  }
}

export default Header
</script>
