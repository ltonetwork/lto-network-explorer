<template>
  <v-app-bar
    color="#17054B"
    class="white--text pt-10"
    prominent
    flat
  >
    <v-container>
      <v-row>
        <v-toolbar-title min-height="55px" class="mr-5" style="text-transform: uppercase;font-size:28px;">
          <img :src="require('@/assets/logo.png')" class="mr-3" height="40" style="margin-bottom:-7px;">
          <span class="font-weight-black">LTO</span> Explorer
        </v-toolbar-title>

        <v-spacer />

        <v-toolbar-items v-for="(item, i) in menu" :key="i" class="hidden-sm-and-down">
          <v-btn
            :to="item.to"
            class="white--text"
            text
            style="text-transform: lowercase;"
            min-height="55px"
          >
            <v-icon class="mr-2">
              {{ item.icon }}
            </v-icon>
            {{ item.title }}
            <v-icon v-if="item.external" xs-small class="mr-2">
              mdi-arrow-top-right
            </v-icon>
          </v-btn>
        </v-toolbar-items>

        <v-menu
          class="hidden-md-and-up"
          left
          bottom
        >
          <template v-slot:activator="{ on }">
            <v-btn
              v-on="on"
              icon
              class="white--text hidden-md-and-up"
            >
              <v-icon dark x-large>
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
          </v-list>
        </v-menu>
      </v-row>
    </v-container>
  </v-app-bar>
</template>
<script>

export default {
  components: {
  },
  data () {
    return {
      menu: [
        {
          title: this.$t('menu.overview'),
          icon: 'mdi-cube-outline',
          to: '/',
          external: false
        },
        {
          title: this.$t('menu.nodes'),
          icon: 'mdi-hexagon-slice-6',
          to: '/nodes',
          external: false
        },
        {
          title: this.$t('menu.staking'),
          icon: 'mdi-layers',
          to: '/staking'
        },
        {
          title: this.$t('menu.distribution'),
          icon: 'mdi-chart-donut',
          to: '/distribution',
          external: false
        },
        {
          title: this.$t('menu.wallet'),
          icon: 'mdi-coins',
          to: 'https://wallet.lto.network',
          external: true
        }
      ]
    }
  }
}
</script>