<template>
  <v-app-bar
    color="#17054B"
    class="white--text"
    height="250px"
  >
    <v-container>
      <v-toolbar
        color="#17054B"
        class="white--text"
        height="250px"
        flat
      >
        <v-toolbar-title
          class="mr-5"
          style="text-transform: uppercase;font-size:28px;"
        >
          <img :src="require('@/assets/logo.png')" class="mr-3" height="40" style="margin-bottom:-7px;">
          <span class="font-weight-black">LTO</span> Explorer
        </v-toolbar-title>

        <v-toolbar-items v-for="(link, i) in links" :key="i">
          <v-btn
            :to="link.to"
            class="white--text"
            text
            style="text-transform: lowercase;"
            min-height="55px"
          >
            <v-icon class="mr-2">
              {{ link.icon }}
            </v-icon>
            {{ link.title }}
          </v-btn>
        </v-toolbar-items>

        <v-toolbar-items v-for="(ext_link, i) in ext_links" :key="i">
          <v-btn
            :href="ext_link.to"
            class="white--text"
            text
            style="text-transform: lowercase;"
            min-height="55px"
          >
            <v-icon class="mr-2">
              {{ ext_link.icon }}
            </v-icon>
            {{ ext_link.title }}
            <v-icon class="mr-1" x-small>
              mdi-arrow-top-right
            </v-icon>
          </v-btn>
        </v-toolbar-items>

        <v-spacer />

        <v-icon dark x-large class="mr-5">
          mdi-calculator
        </v-icon>

        <v-icon dark x-large>
          mdi-magnify
        </v-icon>
      </v-toolbar>
    </v-container>
  </v-app-bar>
</template>
<script>

export default {
  components: {
  },
  data () {
    return {
      links: [
        {
          title: this.$t('menu.overview'),
          icon: 'mdi-cube-outline',
          to: '/'
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
      ext_links: [
        {
          title: this.$t('menu.wallet'),
          icon: 'mdi-wallet-outline',
          to: 'https://wallet.lto.network'
        }
      ],
      panel: {
        nodes: 55,
        staked: 450000,
        price: 0.04,
        market: 5000000
      }
    }
  }
}
</script>
