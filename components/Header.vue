<template>
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
              v-on="on"
              icon
              class="white--text hidden-md-and-up"
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

            <v-list-item @click.stop="calculator = true">
              <v-icon class="mr-2">
                mdi-calculator
              </v-icon>
              <v-list-item-title>{{ $t('calculator.title') }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-row>
    </v-container>

    <v-row justify="center">
      <v-dialog
        v-model="calculator"
        max-width="600"
      >
        <v-card>
          <v-card-title class="headline font-weight-bold secondary--text">
            <span class="mr-2 lto-calculator" />
            {{ $t('calculator.modal_title') }}
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
                  v-model="valid"
                  :lazy-validation="lazy"
                >
                  <v-select
                    v-model="select"
                    :items="['items']"
                    :hint="$t('calculator.active_leases')"
                    item-text="state"
                    item-value="abbr"
                    label="test"
                    persistent-hint
                    return-object
                    single-line
                  />
                  <v-select
                    v-model="select"
                    :items="['items']"
                    :hint="$t('calculator.total_tx')"
                    item-text="state"
                    item-value="abbr"
                    label="test"
                    persistent-hint
                    return-object
                    single-line
                  />
                  <v-select
                    v-model="select"
                    :items="['items']"
                    :hint="$t('calculator.total_fees')"
                    item-text="state"
                    item-value="abbr"
                    label="test"
                    persistent-hint
                    return-object
                    single-line
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
                  v-model="valid"
                  :lazy-validation="lazy"
                >
                  <v-select
                    v-model="select"
                    :items="['items']"
                    :hint="$t('calculator.leasing')"
                    item-text="state"
                    item-value="abbr"
                    label="test"
                    persistent-hint
                    return-object
                    single-line
                  />
                </v-form>
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-actions class="secondary">
            {{ $t('calculator.roi_monthly') }}

            <v-spacer />

            {{ $t('calculator.roi_yearly') }}

            <v-spacer />

            <v-btn
              href="https://blog.ltonetwork.com/staking-and-leasing-lto-network-node-guide/"
              color="primary"
              outlined
            >
              {{ $t('calculator.info') }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-app-bar>
</template>
<script>

export default {
  components: {
  },
  data () {
    return {
      calculator: true,
      menu: [
        {
          title: this.$t('menu.overview'),
          icon: 'mdi-cube-outline',
          to: '/dashboard'
        },
        {
          title: this.$t('menu.nodes'),
          icon: 'mdi-hexagon-slice-6',
          to: '/nodes'
        },
        {
          title: this.$t('menu.staking'),
          icon: 'mdi-layers',
          to: '/staking'
        },
        {
          title: this.$t('menu.distribution'),
          icon: 'mdi-chart-donut',
          to: '/distribution'
        }
      ],
      wallet: {
        title: this.$t('menu.wallet'),
        icon: 'mdi-coins',
        href: 'https://wallet.lto.network/'
      }
    }
  },
  methods: {
  }
}
</script>
