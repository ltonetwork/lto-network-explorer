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

        <v-spacer />

        <v-icon dark x-large>
          mdi-magnify
        </v-icon>

        <v-icon dark x-large>
          mdi-calculator
        </v-icon>

        <v-menu
          left
          bottom
        >
          <template v-slot:activator="{ on }">
            <v-btn
              v-on="on"
              icon
              class="white--text"
            >
              <v-icon dark x-large>
                mdi-dots-vertical
              </v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item
              v-for="(link, i) in links"
              :key="i"
              :to="link.to"
            >
              <v-icon class="mr-2">
                {{ link.icon }}
              </v-icon>
              <v-list-item-title>{{ link.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
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
