<template>
  <v-app-bar
    app
    height="250px"
    max-height="250px"
    tile
    flat
    color="#17054B"
  >
    <v-container>
      <v-row justify="center">
        <v-col>
          <v-toolbar
            floating
            color="#17054B"
            flat
            class="white--text"
          >
            <img :src="require('@/assets/logo.png')" class="mr-3" height="40">
            <v-toolbar-title
              class="mr-5"
            >
              <span class="font-weight-black">LTO</span> Explorer
            </v-toolbar-title>

            <v-toolbar-items
              v-for="(link, i) in links"
              :key="i"
            >
              <v-btn
                :to="link.to"
                class="white--text"
                text
                small
                style="text-transform: lowercase;"
              >
                <v-icon class="mr-2">
                  {{ link.icon }}
                </v-icon>

                {{ link.title }}
              </v-btn>
            </v-toolbar-items>

            <v-toolbar-items
              v-for="(ext_link, i) in ext_links"
              :key="i"
            >
              <v-btn
                :href="ext_link.to"
                class="white--text"
                text
                small
                style="text-transform: lowercase;"
              >
                {{ ext_link.title }}
                <v-icon class="mr-1" x-small>
                  {{ ext_link.icon }}
                </v-icon>
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="6" md="6">
          <v-text-field
            solo-inverted
            hide-details
            flat
            rounded
            label="Search for a transaction ID, address or block"
            prepend-inner-icon="mdi-magnify"
            background-color="#30195d"
            color="#6e5f8e"
          />
        </v-col>

        <v-col cols="2" md="2">
          <v-btn
            outlined
            rounded
            flat
            color="#30195d"
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
  data () {
    return {
      links: [
        {
          title: this.$t('menu.overview'),
          icon: 'mdi-cube-outline',
          to: '/overview'
        },
        {
          title: this.$t('menu.nodes'),
          icon: 'mdi-layers',
          to: '/nodes'
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
          icon: 'mdi-arrow-top-right',
          to: 'https://wallet.lto.network'
        }
      ]
    }
  },
  computed: {
    locales () {
      return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale)
    }
  }
}
</script>
