<template>
  <v-app-bar
    :height="300"
    color="#17054B"
    class="white--text"
  >
    <v-container>
      <v-row>
        <v-toolbar-title min-height="55px" class="mr-5" style="text-transform: uppercase;font-size:28px;">
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
      </v-row>

      <v-row justify="center">
        <v-col cols="6">
          <v-text-field
            solo-inverted
            hide-details
            flat
            rounded
            label="Search for a transaction ID, address or block"
            prepend-inner-icon="mdi-magnify"
            background-color="#44297d"
            color="#6e5f8e"
          />
        </v-col>

        <v-col cols="2">
          <v-btn
            outlined
            rounded
            color="#44297d"
            height="50"
          >
            Calculator
          </v-btn>
        </v-col>
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
      ]
    }
  }
}
</script>
